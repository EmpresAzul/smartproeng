import type { Express } from "express";
import fs from "node:fs";
import type { Server } from "node:http";
import { nanoid } from "nanoid";
import path from "node:path";
import { createServer as createViteServer } from "vite";
import viteConfig from "../../vite.config";
import { createRouteDocument } from "./seo";
import { injectPublicClientConfig } from "./publicConfig";

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };
  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    server: { ...viteConfig.server, ...serverOptions },
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path.resolve(process.cwd(), "client", "index.html");
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = injectPublicClientConfig(template);
      template = template.replace(
        'src="/src/main.tsx"',
        `src="/src/main.tsx?v=${nanoid()}"`,
      );
      const page = await vite.transformIndexHtml(url, template);
      const pathname = new URL(url, "http://localhost").pathname;
      const document = createRouteDocument(page, pathname);
      if (pathname === "/admgerencia" || document.status === 404) {
        res.setHeader("X-Robots-Tag", "noindex, nofollow");
        res.setHeader("Cache-Control", "private, no-store");
      }
      res.status(document.status).set({ "Content-Type": "text/html; charset=utf-8" }).end(document.html);
    } catch (error) {
      vite.ssrFixStacktrace(error as Error);
      next(error);
    }
  });
}
