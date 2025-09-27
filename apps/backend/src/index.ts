import { createServer } from "node:http";
import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { cors } from "@elysiajs/cors";
import { registerRoutes } from "./http/routes.js";

const app = new Elysia().use(cors());

// 1) Register routes FIRST
registerRoutes(app);

// 2) Then mount Swagger so it picks up the routes
app.use(swagger({
  path: "/docs",
  documentation: {
    info: {
      title: "Windows Explorer API",
      version: "1.0.0",
      description: "Backend API for folder explorer"
    },
    tags: [
      { name: "system", description: "System" },
      { name: "folders", description: "Folders" },
      { name: "files", description: "Files" }
    ]
  }
}));

// WebStandard → Node bridge
const handler = app.fetch;
const PORT = Number(process.env.PORT ?? 3001);

const server = createServer(async (req, res) => {
  try {
    const url = `http://${req.headers.host}${req.url}`;
    const request = new Request(url, {
      method: req.method,
      headers: req.headers as unknown as HeadersInit,
      body: req.method && !["GET", "HEAD"].includes(req.method) ? (req as any) : undefined,
      duplex: "half",
    } as RequestInit & { duplex?: "half" });

    const response = await handler(request);
    res.statusCode = response.status;
    response.headers.forEach((v, k) => res.setHeader(k, v));
    const ab = await response.arrayBuffer();
    res.end(Buffer.from(ab));
  } catch (e: any) {
    res.statusCode = 500;
    res.setHeader("content-type", "application/json");
    res.end(JSON.stringify({ error: "Internal Server Error", detail: String(e?.message ?? e) }));
  }
});

server.listen(PORT, () => {
  console.log(`🦊 Elysia running at http://localhost:${PORT}`);
  console.log(`📚 Swagger docs at http://localhost:${PORT}/docs`);
});
