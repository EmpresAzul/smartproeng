import "dotenv/config";
import express from "express";
import { createApp } from "./server/_core/app";
import { serveStatic } from "./server/_core/static";

process.env.NODE_ENV ??= "production";
const app = createApp(express());
serveStatic(app);

export default app;
