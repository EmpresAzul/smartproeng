import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { publicClientScript } from "./publicConfig";

export function createApp(app = express()) {
  app.disable("x-powered-by");
  app.set("trust proxy", 1);
  app.use((_req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
    next();
  });
  app.use(express.json({ limit: "64kb" }));
  app.use(express.urlencoded({ limit: "16kb", extended: false }));
  app.get("/api/health", (_req, res) => res.json({ status: "ok" }));
  app.get("/api/client-config.js", (_req, res) => {
    res.set("Cache-Control", "no-store").type("application/javascript").send(publicClientScript());
  });
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    }),
  );
  return app;
}
