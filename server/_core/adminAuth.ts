import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { parse as parseCookies } from "cookie";
import type { Request } from "express";

export const ADMIN_SESSION_COOKIE = "smartproeng_admin_session";
export const ADMIN_SESSION_TTL_MS = 8 * 60 * 60 * 1000;
const PASSWORD_SALT = "smartproeng-admin-auth-v1";
const MAX_SECRET_LENGTH = 16 * 1024;

type AdminSessionPayload = {
  version: 1;
  subject: "smartproeng-admin";
  origin: string;
  issuedAt: number;
  expiresAt: number;
  nonce: string;
};

export type AdminSession = Pick<AdminSessionPayload, "origin" | "expiresAt">;

let cachedSecret: string | undefined;
let cachedKey: Buffer | null = null;

function signingKey(secret = process.env.SMARTPROENG_ADMIN_PASSWORD): Buffer | null {
  const value = typeof secret === "string" ? secret : "";
  if (value !== cachedSecret) {
    cachedSecret = value;
    cachedKey = value.length >= 16 && value.length <= MAX_SECRET_LENGTH
      ? scryptSync(value, PASSWORD_SALT, 32)
      : null;
  }
  return cachedKey;
}

export function isAdminPasswordConfigured(): boolean {
  return signingKey() !== null;
}

export function isSafeBrowserOrigin(origin: string): boolean {
  try {
    const parsed = new URL(origin);
    const localHttp = parsed.protocol === "http:" && ["localhost", "127.0.0.1", "[::1]"].includes(parsed.hostname);
    return parsed.origin === origin && !parsed.username && !parsed.password && !parsed.search && !parsed.hash && (parsed.protocol === "https:" || localHttp);
  } catch {
    return false;
  }
}

export function verifyAdminCredentials(
  email: string,
  password: string,
  expectedEmail: string,
  secret?: string,
): boolean {
  const key = signingKey(secret);
  if (!key || typeof password !== "string" || password.length < 16 || password.length > MAX_SECRET_LENGTH) return false;
  if (email.trim().toLowerCase() !== expectedEmail.trim().toLowerCase()) return false;
  const candidateKey = scryptSync(password, PASSWORD_SALT, 32);
  return candidateKey.length === key.length && timingSafeEqual(candidateKey, key);
}

export function createAdminSessionToken(
  origin: string,
  secret?: string,
  now = Date.now(),
): string | null {
  const key = signingKey(secret);
  if (!key || !isSafeBrowserOrigin(origin)) return null;
  const payload: AdminSessionPayload = {
    version: 1,
    subject: "smartproeng-admin",
    origin,
    issuedAt: now,
    expiresAt: now + ADMIN_SESSION_TTL_MS,
    nonce: randomBytes(18).toString("base64url"),
  };
  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = createHmac("sha256", key).update(encoded).digest("base64url");
  return `${encoded}.${signature}`;
}

export function verifyAdminSessionToken(
  token: string,
  secret?: string,
  now = Date.now(),
): AdminSession | null {
  const key = signingKey(secret);
  if (!key || typeof token !== "string" || token.length > 4096) return null;
  const parts = token.split(".");
  if (parts.length !== 2 || !parts[0] || !parts[1]) return null;

  try {
    const expected = createHmac("sha256", key).update(parts[0]).digest();
    const supplied = Buffer.from(parts[1], "base64url");
    if (supplied.length !== expected.length || !timingSafeEqual(supplied, expected)) return null;
    const payload = JSON.parse(Buffer.from(parts[0], "base64url").toString("utf8")) as Partial<AdminSessionPayload>;
    if (
      payload.version !== 1 ||
      payload.subject !== "smartproeng-admin" ||
      typeof payload.origin !== "string" ||
      !isSafeBrowserOrigin(payload.origin) ||
      typeof payload.issuedAt !== "number" ||
      typeof payload.expiresAt !== "number" ||
      typeof payload.nonce !== "string" ||
      payload.nonce.length < 20 ||
      payload.issuedAt > now + 60_000 ||
      payload.expiresAt <= now ||
      payload.expiresAt <= payload.issuedAt ||
      payload.expiresAt - payload.issuedAt > ADMIN_SESSION_TTL_MS
    ) return null;
    return { origin: payload.origin, expiresAt: payload.expiresAt };
  } catch {
    return null;
  }
}

export function readAdminSession(request: Request): AdminSession | null {
  const header = request.headers.cookie;
  if (!header) return null;
  try {
    const token = parseCookies(header)[ADMIN_SESSION_COOKIE];
    return token ? verifyAdminSessionToken(token) : null;
  } catch {
    return null;
  }
}
