import "dotenv/config";
import { createServer } from "node:http";
import { createApp } from "./app";
import { serveStatic } from "./static";

process.env.NODE_ENV ??= "production";
const app = createApp();
serveStatic(app);

const port = Number(process.env.PORT || "3000");
if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error("Invalid PORT");
const server = createServer(app);
server.on("error", (error) => {
  console.error("Server failed:", error.message);
  process.exit(1);
});
server.listen(port, "0.0.0.0", () => console.log(`Server listening on port ${port}`));
