import express, { type Express } from "express";
import fs from "fs";
import { type Server } from "http";
import { nanoid } from "nanoid";
import path from "path";
import { createServer as createViteServer } from "vite";
import viteConfig from "../../vite.config";
import { createRouteDocument } from "./seo";

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    // Keep the file-serving limits of vite.config.ts; only the options above differ here.
    server: { ...viteConfig.server, ...serverOptions },
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "../..",
        "client",
        "index.html"
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      const document = createRouteDocument(page, new URL(url, "http://localhost").pathname);
      if (new URL(url, "http://localhost").pathname === "/admgerencia" || document.status === 404) {
        res.setHeader("X-Robots-Tag", "noindex, nofollow");
        res.setHeader("Cache-Control", "private, no-store");
      }
      res.status(document.status).set({ "Content-Type": "text/html; charset=utf-8" }).end(document.html);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  const distPath =
    process.env.NODE_ENV === "development"
      ? path.resolve(import.meta.dirname, "../..", "dist", "public")
      : path.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    console.error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }

  app.use(express.static(distPath, { index: false }));
  const template = fs.readFileSync(path.resolve(distPath, "index.html"), "utf-8");

  // Public pages receive route-specific HTML for crawlers. Admin and unknown
  // paths never expose inbox data and are marked noindex at both HTTP and HTML.
  app.use("*", (req, res, next) => {
    if (req.method !== "GET" && req.method !== "HEAD") return next();
    // `req.path` is relative to a wildcard mount in Express and can collapse
    // to `/`; use originalUrl so direct production requests retain their route.
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
