import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import { ADMIN_SESSION_COOKIE } from "./_core/adminAuth";
import type { TrpcContext } from "./_core/context";

type CookieCall = { name: string; options: Record<string, unknown> };

function createAuthContext(): { ctx: TrpcContext; clearedCookies: CookieCall[] } {
  const clearedCookies: CookieCall[] = [];
  const now = new Date();
  const ctx: TrpcContext = {
    user: {
      id: 1,
      openId: "smartproeng-admin",
      email: "smartproengbr@gmail.com",
      name: "Eng. Tiago Arré",
      loginMethod: "password",
      role: "admin",
      createdAt: now,
      updatedAt: now,
      lastSignedIn: now,
    },
    sessionOrigin: "https://smartproeng.example",
    req: {
      protocol: "https",
      headers: {},
      get: (name: string) => name.toLowerCase() === "origin" ? "https://smartproeng.example" : undefined,
    } as TrpcContext["req"],
    res: {
      clearCookie: (name: string, options: Record<string, unknown>) => clearedCookies.push({ name, options }),
    } as TrpcContext["res"],
  };
  return { ctx, clearedCookies };
}

describe("auth.logout", () => {
  it("clears the application-owned secure session cookie", async () => {
    const { ctx, clearedCookies } = createAuthContext();
    const caller = appRouter.createCaller(ctx);
    await expect(caller.auth.logout()).resolves.toEqual({ success: true });
    expect(clearedCookies).toHaveLength(1);
    expect(clearedCookies[0]?.name).toBe(ADMIN_SESSION_COOKIE);
    expect(clearedCookies[0]?.options).toMatchObject({ maxAge: -1, secure: true, sameSite: "none", httpOnly: true, path: "/" });
  });

  it("rejects logout from a different origin", async () => {
    const { ctx } = createAuthContext();
    ctx.req.get = (name: string) => name.toLowerCase() === "origin" ? "https://attacker.example" : undefined;
    const caller = appRouter.createCaller(ctx);
    await expect(caller.auth.logout()).rejects.toMatchObject({ code: "FORBIDDEN" });
  });
});
