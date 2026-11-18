import { spawnSync } from "node:child_process";
import { builtinModules, createRequire } from "node:module";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(import.meta.url);
const bundlePath = path.join(root, "dist", "index.js");
const publicPath = path.join(root, "dist", "public");
const packageManifest = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
const expectedAssets = [
  "assets/site/home-city-hero.webp",
  "assets/site/about-fieldwork.webp",
  "assets/site/portfolio-bridge.webp",
  "assets/site/contact-project-review.webp",
  "brand/smartproeng-lockup-dark.jpg",
];

for (const relativePath of [bundlePath, path.join(publicPath, "index.html"), ...expectedAssets.map((asset) => path.join(publicPath, asset))]) {
  if (!fs.existsSync(relativePath)) throw new Error(`Missing deploy file: ${path.relative(root, relativePath)}`);
}

function installedVersion(packageName) {
  let directory = path.dirname(fs.realpathSync(require.resolve(packageName)));
  while (directory !== path.dirname(directory)) {
    const manifestPath = path.join(directory, "package.json");
    if (fs.existsSync(manifestPath)) {
      const installed = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
      if (installed.name === packageName) return installed.version;
    }
    directory = path.dirname(directory);
  }
  throw new Error(`Could not determine installed version of runtime package ${packageName}`);
}

const bundle = fs.readFileSync(bundlePath, "utf8");
const builtinSet = new Set(builtinModules.flatMap((name) => [name, name.replace(/^node:/, "")]));
const dependencyNames = new Set();
for (const match of bundle.matchAll(/(?:\bfrom\s+|\bimport\s*)["']([^"']+)["']/g)) {
  const specifier = match[1];
  if (specifier.startsWith(".") || specifier.startsWith("node:") || builtinSet.has(specifier)) continue;
  const rootName = specifier.startsWith("@") ? specifier.split("/").slice(0, 2).join("/") : specifier.split("/")[0];
  if (!packageManifest.dependencies?.[rootName]) {
    throw new Error(`Runtime package ${rootName} is not listed under dependencies in package.json`);
  }
  dependencyNames.add(rootName);
}
// Drizzle's MySQL driver loads mysql2 dynamically, so it is a runtime dependency even if
// the bundled JavaScript only contains an import of drizzle-orm/mysql2.
dependencyNames.add("mysql2");

const runtimeDependencies = Object.fromEntries(
  [...dependencyNames].sort().map((name) => [name, installedVersion(name)]),
);
const runtimeManifest = {
  name: packageManifest.name,
  version: packageManifest.version,
  private: true,
  type: "module",
  engines: { node: "22.x" },
  scripts: { start: "node app.js" },
  dependencies: runtimeDependencies,
};

const staging = fs.mkdtempSync(path.join(os.tmpdir(), "smartproeng-napoleon-"));
const archivePath = path.join(root, "napoleon.zip");
try {
  fs.copyFileSync(path.join(root, "app.js"), path.join(staging, "app.js"));
  fs.writeFileSync(path.join(staging, "package.json"), `${JSON.stringify(runtimeManifest, null, 2)}\n`);
  const lock = spawnSync("npm", ["install", "--package-lock-only", "--ignore-scripts", "--no-audit", "--no-fund"], { cwd: staging, stdio: "inherit" });
  if (lock.error) throw lock.error;
  if (lock.status !== 0) throw new Error(`npm lock generation failed with status ${lock.status}`);
  fs.rmSync(path.join(staging, "node_modules"), { recursive: true, force: true });
  fs.cpSync(path.join(root, "dist"), path.join(staging, "dist"), { recursive: true });
  fs.rmSync(path.join(staging, "dist", "public", "__manus__"), { recursive: true, force: true });
  fs.rmSync(path.join(staging, "dist", "public", "manus-routes.json"), { force: true });
  fs.rmSync(path.join(staging, "dist", "public", "api", "client-config.js"), { force: true });
  fs.mkdirSync(path.join(staging, "drizzle"), { recursive: true });
  for (const migration of ["0000_initial_users.sql", "0001_mute_mantis.sql"]) {
    fs.copyFileSync(path.join(root, "drizzle", migration), path.join(staging, "drizzle", migration));
  }
  fs.copyFileSync(path.join(root, "docs", "NAPOLEON.md"), path.join(staging, "README-NAPOLEON.md"));
  fs.copyFileSync(path.join(root, "docs", "DEPLOYMENT.md"), path.join(staging, "DEPLOYMENT.md"));
  fs.mkdirSync(path.join(staging, "tmp"), { recursive: true });
  fs.writeFileSync(path.join(staging, "tmp", ".keep"), "");

  fs.rmSync(archivePath, { force: true });
  const result = spawnSync("zip", ["-q", "-r", archivePath, "."], { cwd: staging, stdio: "inherit" });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`zip failed with status ${result.status}`);
  console.log(`Created ${path.relative(root, archivePath)} (${Object.keys(runtimeDependencies).length} pinned production packages; package-lock included; no node_modules or secrets).`);
} finally {
  fs.rmSync(staging, { recursive: true, force: true });
}
