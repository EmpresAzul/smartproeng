import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { COMPANY, ENGINEER } from "../../shared/siteContent";
import type { User } from "../../drizzle/schema";
import { readAdminSession } from "./adminAuth";

export type TrpcContext = {
  req: CreateExpressContextOptions["req"];
  res: CreateExpressContextOptions["res"];
  user: User | null;
  sessionOrigin: string | null;
};

export async function createContext(
  opts: CreateExpressContextOptions,
): Promise<TrpcContext> {
  const session = readAdminSession(opts.req);
  const now = new Date();
  const user: User | null = session ? {
    id: 1,
    openId: "smartproeng-admin",
    email: COMPANY.email,
    name: `Eng. ${ENGINEER.name}`,
    loginMethod: "password",
    role: "admin",
    createdAt: now,
    updatedAt: now,
    lastSignedIn: now,
  } : null;

  return {
    req: opts.req,
    res: opts.res,
    user,
    sessionOrigin: session?.origin ?? null,
  };
}
