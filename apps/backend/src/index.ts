import { createServer } from "node:http";
import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { cors } from "@elysiajs/cors";

const app = new Elysia()
  .use(cors())
  .use(
    swagger({
      documentation: {
        info: {
          title: "Windows Explorer API",
          version: "1.0.0",
          description: "Backend API for folder explorer",
        },
        tags: [{ name: "system", description: "System endpoints" }],
      },
      path: "/docs",
    })
  )
  .get("/", () => ({ ok: true, msg: "Hello from Elysia + TS (WebStandard via Node http)" }), {
    detail: { tags: ["system"] },
  })
  .get("/api/v1/health", () => ({ status: "ok" }), {
    detail: { tags: ["system"] },
  });


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

    // Write status & headers
    res.statusCode = response.status;
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    // Write body
    const arrayBuffer = await response.arrayBuffer();
    res.end(Buffer.from(arrayBuffer));
  } catch (err: any) {
    res.statusCode = 500;
    res.setHeader("content-type", "application/json");
    res.end(JSON.stringify({ error: "Internal Server Error", detail: String(err?.message ?? err) }));
  }
});

server.listen(PORT, () => {
  console.log(`🦊 Elysia (WebStandard) bridged via Node http`);
  console.log(`🔈 Listening at http://localhost:${PORT}`);
  console.log(`📚 Swagger docs at http://localhost:${PORT}/docs`);
});
