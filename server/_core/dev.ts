import "dotenv/config";
import { createServer } from "node:http";
import { createApp } from "./app";
import { setupVite } from "./vite";

process.env.NODE_ENV ??= "development";
const app = createApp();
const server = createServer(app);

async function startDevelopmentServer() {
  await setupVite(app, server);
  const port = Number(process.env.PORT || "3000");
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error("Invalid PORT");
  server.on("error", (error) => {
    console.error("Development server failed:", error.message);
    process.exit(1);
  });
  server.listen(port, "0.0.0.0", () => console.log(`Development server listening on port ${port}`));
}

startDevelopmentServer().catch((error) => {
  console.error(error);
  process.exit(1);
});
