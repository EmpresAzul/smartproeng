import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const viteOutput = path.join(root, "dist", "public");
const vercelPublic = path.join(root, "public");

if (!fs.existsSync(path.join(viteOutput, "index.html"))) {
  throw new Error("Vite build is missing dist/public/index.html");
}

fs.rmSync(vercelPublic, { recursive: true, force: true });
fs.cpSync(viteOutput, vercelPublic, { recursive: true });

// Express renders route-specific HTML from dist/public/index.html. Keeping a root index
// in Vercel's static directory would bypass the Express function and its SEO snapshot.
fs.rmSync(path.join(vercelPublic, "index.html"), { force: true });
// These are runtime endpoints/platform helper files; the Express app owns the config endpoint.
fs.rmSync(path.join(vercelPublic, "api", "client-config.js"), { force: true });
fs.rmSync(path.join(vercelPublic, "__manus__"), { recursive: true, force: true });
fs.rmSync(path.join(vercelPublic, "manus-routes.json"), { force: true });
console.log("Prepared Vercel assets; Express owns HTML routes and runtime client config.");
