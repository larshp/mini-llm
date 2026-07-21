import http from "node:http";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getGenerator, generate } from "./llm.js";
import { downloadProgress } from "./progress.js";
import { config } from "./config.js";

const projectRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const indexHtml = readFileSync(path.join(projectRoot, "public", "index.html"), "utf8");

// --- Load the model once, up front -----------------------------------------
console.error(`Loading ${config.modelId} (dtype=${config.dtype})…`);
const generator = await getGenerator({ progress_callback: downloadProgress });
console.error("Model ready.");

// Single shared conversation for this local, single-user server.
let messages = [{ role: "system", content: config.systemPrompt }];

// Serialize generation: one model, one request at a time.
let queue = Promise.resolve();
function withLock(task) {
  const result = queue.then(task, task);
  queue = result.then(
    () => {},
    () => {},
  );
  return result;
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (c) => chunks.push(c));
    req.on("end", () => {
      const raw = Buffer.concat(chunks).toString("utf8");
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch (err) {
        reject(err);
      }
    });
    req.on("error", reject);
  });
}

const json = (res, status, body) => {
  res.writeHead(status, { "content-type": "application/json" });
  res.end(JSON.stringify(body));
};

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);

    if (req.method === "GET" && url.pathname === "/") {
      res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
      return void res.end(indexHtml);
    }

    if (req.method === "GET" && url.pathname === "/health") {
      return void json(res, 200, { ok: true, model: config.modelId, dtype: config.dtype });
    }

    if (req.method === "POST" && url.pathname === "/api/reset") {
      messages = [{ role: "system", content: config.systemPrompt }];
      return void json(res, 200, { ok: true });
    }

    if (req.method === "POST" && url.pathname === "/api/chat") {
      const body = await readJson(req);
      const message = String(body?.message ?? "").trim();
      if (!message) return void json(res, 400, { error: "message is required" });

      res.writeHead(200, {
        "content-type": "text/event-stream",
        "cache-control": "no-cache",
        connection: "keep-alive",
      });

      await withLock(async () => {
        messages.push({ role: "user", content: message });
        const reply = await generate({
          generator,
          messages,
          onToken: (token) => res.write(`data: ${JSON.stringify({ token })}\n\n`),
        });
        messages.push({ role: "assistant", content: reply });
        res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
      });

      return void res.end();
    }

    json(res, 404, { error: "not found" });
  } catch (err) {
    console.error(err);
    if (!res.headersSent) json(res, 500, { error: String(err?.message ?? err) });
    else res.end();
  }
});

server.listen(config.port, config.host, () => {
  console.error(`\nmini-llm server → http://${config.host}:${config.port}`);
});
