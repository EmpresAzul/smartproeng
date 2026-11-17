import { describe, expect, it } from "vitest";
import type { TrpcContext } from "./_core/context";
import { appRouter } from "./routers";

function createContext(role: "user" | "admin" = "user"): TrpcContext {
  return {
    user: {
      id: 7,
      openId: "test-user",
      email: "visitor@example.com",
      name: "Pessoa de teste",
      loginMethod: "manus",
      role,
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: { protocol: "https", headers: {}, ip: "127.0.0.1", socket: { remoteAddress: "127.0.0.1" } } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

const payload = {
  name: "Pessoa de teste",
  email: "visitor@example.com",
  phone: "",
  organization: "",
  city: "Cuiabá",
  service: "Gestão de projetos",
  message: "Solicito contato para conversar sobre um projeto de engenharia.",
  consent: true as const,
  website: "filled-by-a-bot",
};

describe("Smart ProEng public contact and admin boundary", () => {
  it("acknowledges the honeypot without persisting spam", async () => {
    const caller = appRouter.createCaller(createContext());
    await expect(caller.contact.submit(payload)).resolves.toEqual({ received: true });
  });

  it("denies inbox access to an authenticated non-admin user", async () => {
    const caller = appRouter.createCaller(createContext("user"));
    await expect(caller.admin.listMessages()).rejects.toMatchObject({ code: "FORBIDDEN" });
  });
});
