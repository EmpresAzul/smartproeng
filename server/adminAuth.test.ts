import { afterEach, describe, expect, it, vi } from "vitest";
import { ADMIN_SESSION_TTL_MS, createAdminSessionToken, isAdminPasswordConfigured, isSafeBrowserOrigin, verifyAdminCredentials, verifyAdminSessionToken } from "./_core/adminAuth";

afterEach(() => vi.unstubAllEnvs());

const testPassword = "smartproeng-test-password-DO-NOT-DEPLOY";

describe("Smart ProEng administrator authentication", () => {
  it("accepts only a long configured password for the authorized email", () => {
    vi.stubEnv("SMARTPROENG_ADMIN_PASSWORD", testPassword);
    expect(isAdminPasswordConfigured()).toBe(true);
    expect(verifyAdminCredentials("SMARTPROENGBR@gmail.com", testPassword, "smartproengbr@gmail.com")).toBe(true);
    expect(verifyAdminCredentials("other@example.com", testPassword, "smartproengbr@gmail.com")).toBe(false);
    expect(verifyAdminCredentials("smartproengbr@gmail.com", "short", "smartproengbr@gmail.com")).toBe(false);
  });

  it("fails closed without a valid configured password", () => {
    vi.stubEnv("SMARTPROENG_ADMIN_PASSWORD", "too-short");
    expect(isAdminPasswordConfigured()).toBe(false);
    expect(verifyAdminCredentials("smartproengbr@gmail.com", "too-short", "smartproengbr@gmail.com")).toBe(false);
  });

  it("permits HTTPS browser origins and local development only", () => {
    expect(isSafeBrowserOrigin("https://smartproeng.example")).toBe(true);
    expect(isSafeBrowserOrigin("http://localhost:3000")).toBe(true);
    expect(isSafeBrowserOrigin("http://attacker.example")).toBe(false);
    expect(isSafeBrowserOrigin("https://smartproeng.example/path")).toBe(false);
    expect(isSafeBrowserOrigin("null")).toBe(false);
  });

  it("signs a short-lived session bound to the origin and rejects tampering/expiry", () => {
    vi.stubEnv("SMARTPROENG_ADMIN_PASSWORD", testPassword);
    const now = 1_800_000_000_000;
    const token = createAdminSessionToken("https://smartproeng.example", undefined, now);
    expect(token).toBeTruthy();
    expect(verifyAdminSessionToken(token!, undefined, now)).toEqual({ origin: "https://smartproeng.example", expiresAt: now + ADMIN_SESSION_TTL_MS });
    expect(verifyAdminSessionToken(`${token}x`, undefined, now)).toBeNull();
    expect(verifyAdminSessionToken(token!, undefined, now + ADMIN_SESSION_TTL_MS + 1)).toBeNull();
    expect(createAdminSessionToken("http://attacker.example", undefined, now)).toBeNull();
  });
});
