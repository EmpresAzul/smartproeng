import { afterEach, describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import { ADMIN_SESSION_COOKIE, ADMIN_SESSION_TTL_MS, verifyAdminSessionToken } from "./_core/adminAuth";
import type { TrpcContext } from "./_core/context";

const testPassword = "smartproeng-test-password-DO-NOT-DEPLOY";
const authorizedEmail = "smartproengbr@gmail.com";
const origin = "https://smartproeng.example";
let nextIp = 20;

afterEach(() => vi.unstubAllEnvs());

function createLoginContext(requestOrigin = origin) {
  const cookies: Array<{ name: string; value: string; options: Record<string, unknown> }> = [];
  const responseHeaders: Record<string, string> = {};
  const ctx: TrpcContext = {
    user: null,
    sessionOrigin: null,
    req: {
      protocol: "https",
      headers: {},
      ip: `192.0.2.${nextIp++}`,
      socket: { remoteAddress: `192.0.2.${nextIp++}` },
      get: (name: string) => name.toLowerCase() === "origin" ? requestOrigin : undefined,
    } as TrpcContext["req"],
    res: {
      cookie: (name: string, value: string, options: Record<string, unknown>) => { cookies.push({ name, value, options }); },
      setHeader: (name: string, value: string) => { responseHeaders[name] = value; },
    } as unknown as TrpcContext["res"],
  };
  return { ctx, cookies, responseHeaders };
}

describe("auth.login", () => {
  it("sets only a short-lived application-owned session cookie for valid credentials", async () => {
    vi.stubEnv("SMARTPROENG_ADMIN_PASSWORD", testPassword);
    const { ctx, cookies, responseHeaders } = createLoginContext();
    const caller = appRouter.createCaller(ctx);
    await expect(caller.auth.login({ email: authorizedEmail.toUpperCase(), password: testPassword })).resolves.toEqual({ success: true });
    expect(cookies).toHaveLength(1);
    expect(cookies[0]?.name).toBe(ADMIN_SESSION_COOKIE);
    expect(cookies[0]?.options).toMatchObject({ httpOnly: true, secure: true, sameSite: "none", path: "/", maxAge: ADMIN_SESSION_TTL_MS });
    expect(responseHeaders["Cache-Control"]).toBe("no-store");
    expect(verifyAdminSessionToken(cookies[0]!.value)).toMatchObject({ origin });
  });

  it("rejects invalid credentials without issuing a session", async () => {
    vi.stubEnv("SMARTPROENG_ADMIN_PASSWORD", testPassword);
    const { ctx, cookies } = createLoginContext();
    const caller = appRouter.createCaller(ctx);
    await expect(caller.auth.login({ email: authorizedEmail, password: "wrong-password-that-is-long-enough" })).rejects.toMatchObject({ code: "UNAUTHORIZED" });
    expect(cookies).toHaveLength(0);
  });

  it("rejects non-HTTPS and attacker-controlled origins before issuing a session", async () => {
    vi.stubEnv("SMARTPROENG_ADMIN_PASSWORD", testPassword);
    const { ctx, cookies } = createLoginContext("http://attacker.example");
    const caller = appRouter.createCaller(ctx);
    await expect(caller.auth.login({ email: authorizedEmail, password: testPassword })).rejects.toMatchObject({ code: "UNAUTHORIZED" });
    expect(cookies).toHaveLength(0);
  });
});
