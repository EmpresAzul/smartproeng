import { afterEach, describe, expect, it, vi } from "vitest";
import { publicClientConfig, publicClientScript } from "./_core/publicConfig";
import { getSessionCookieOptions } from "./_core/cookies";
import { sdk } from "./_core/sdk";
import { listLLMModels } from "./_core/llm";
import { generateImage } from "./_core/imageGeneration";
import { ADMIN_SESSION_COOKIE } from "./_core/adminAuth";

afterEach(() => { vi.unstubAllEnvs(); vi.unstubAllGlobals(); });

describe("Smart ProEng runtime integration", () => {
  it("exposes only the public values needed by the optional map", () => {
    const env = {
      MANUS_PROJECT_ID: "project-test",
      MANUS_API_KEY: "server-only-test",
      MANUS_JWT_SECRET: "signing-only-test",
      DATABASE_URL: "db-only-test",
      MANUS_API_BROWSER_KEY: "public-browser-test",
      MANUS_API_URL: "https://api.example",
      MANUS_ANALYTICS_ENDPOINT: "https://analytics.example",
      MANUS_ANALYTICS_WEBSITE_ID: "site-test",
    } as NodeJS.ProcessEnv;
    expect(publicClientConfig(env)).toEqual({ apiUrl: "https://api.example", apiBrowserKey: "public-browser-test" });
    const script = publicClientScript(env);
    for (const value of [env.MANUS_API_KEY, env.MANUS_JWT_SECRET, env.DATABASE_URL, env.MANUS_PROJECT_ID, env.MANUS_ANALYTICS_ENDPOINT]) {
      expect(script).not.toContain(value);
    }
    expect(script).not.toContain("oauthPortalUrl");
    expect(script).toContain("__SMARTPROENG_CONFIG__");
    const globals: Record<string, unknown> = {};
    new Function("window", "document", script)(globals, {});
    expect(globals.__SMARTPROENG_CONFIG__).toEqual({ apiUrl: "https://api.example", apiBrowserKey: "public-browser-test" });
  });

  it("does not guess a production API when the project environment is absent", async () => {
    vi.stubEnv("MANUS_API_URL", ""); vi.stubEnv("MANUS_API_KEY", "test-only");
    const request = vi.fn(); vi.stubGlobal("fetch", request);
    await expect(listLLMModels()).rejects.toThrow("MANUS_API_URL");
    expect(request).not.toHaveBeenCalled();
  });

  it("persists URL-only image results through current managed storage", async () => {
    vi.stubEnv("MANUS_API_URL", "https://api.example"); vi.stubEnv("MANUS_API_KEY", "test-only");
    const request = vi.fn()
      .mockResolvedValueOnce(new Response(JSON.stringify({ image: { url: "https://image.example/result.png", mimeType: "image/png" } })))
      .mockResolvedValueOnce(new Response(new Uint8Array([1, 2, 3])))
      .mockResolvedValueOnce(new Response(JSON.stringify({ url: "https://upload.example/object" })))
      .mockResolvedValueOnce(new Response(""));
    vi.stubGlobal("fetch", request);
    const image = await generateImage({ prompt: "test", originalImages: [] });
    expect(image.url).toMatch(/^\/manus-storage\/generated\//);
    expect(request).toHaveBeenCalledTimes(4);
    expect(JSON.parse(request.mock.calls[0][1].body)).toHaveProperty("originalImages");
  });

  it("uses a distinct secure admin cookie behind the HTTPS Preview proxy", () => {
    expect(ADMIN_SESSION_COOKIE).toBe("smartproeng_admin_session");
    expect(ADMIN_SESSION_COOKIE).not.toBe("app_session_id");
    expect(getSessionCookieOptions({ protocol: "http", headers: {} } as never)).toMatchObject({ secure: true, httpOnly: true, sameSite: "none" });
  });

  it("binds signed platform helper sessions to this project and accepts an empty display name", async () => {
    vi.stubEnv("MANUS_PROJECT_ID", "project-test");
    vi.stubEnv("MANUS_JWT_SECRET", "unit-test-signing-key-never-deployed");
    const token = await sdk.signSession({ openId: "user-test", appId: "project-test", name: "" });
    expect(await sdk.verifySession(token)).toMatchObject({ openId: "user-test" });
    vi.stubEnv("MANUS_PROJECT_ID", "different-project");
    expect(await sdk.verifySession(token)).toBeNull();
  });
});
