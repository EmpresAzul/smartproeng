import express, { type Express } from "express";
import fs from "node:fs";
import path from "node:path";
import { createRouteDocument } from "./seo";
import { injectPublicClientConfig } from "./publicConfig";

export function serveStatic(app: Express) {
  const distPath = path.resolve(process.cwd(), "dist", "public");
  const indexPath = path.join(distPath, "index.html");
  if (!fs.existsSync(indexPath)) {
    throw new Error(`Could not find the build directory: ${indexPath}; build the client first`);
  }

  app.use(express.static(distPath, { index: false }));
  const template = injectPublicClientConfig(fs.readFileSync(indexPath, "utf-8"));

  // Render a crawler-visible route snapshot while the browser loads the React application.
  app.use("*", (req, res, next) => {
    if (req.method !== "GET" && req.method !== "HEAD") return next();
    const pathname = new URL(req.originalUrl, "http://localhost").pathname;
    const document = createRouteDocument(template, pathname);
    if (pathname === "/admgerencia" || document.status === 404) {
      res.setHeader("X-Robots-Tag", "noindex, nofollow");
      res.setHeader("Cache-Control", "private, no-store");
    }
    res.status(document.status).type("html").send(document.html);
  });
  app.use((req, res) => res.status(404).json({ error: "Not found" }));
}
