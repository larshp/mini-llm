import process from "node:process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

const num = (value, fallback) => {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
};

export const config = {
  // Hugging Face model id (must be an ONNX repo that Transformers.js can load).
  // Default: Qwen2.5-0.5B-Instruct — tiny, fast, and comfortably under 4 GB.
  // See README for other options that still fit in 4 GB.
  modelId: process.env.MODEL_ID ?? "onnx-community/Qwen2.5-0.5B-Instruct",

  // Weight quantization / precision. One of:
  //   "q4" (default), "q4f16", "q8", "int8", "uint8", "bnb4", "fp16", "fp32".
  // Lower precision = less RAM and faster load, at some quality cost.
  dtype: process.env.MODEL_DTYPE ?? "q4",

  // Where downloaded models are cached (first run downloads here, then runs offline).
  modelsDir: process.env.MODELS_DIR ?? path.join(projectRoot, "models"),

  // Assistant behaviour.
  systemPrompt:
    process.env.SYSTEM_PROMPT ??
    "You are a helpful, concise assistant running locally on the user's machine.",

  // Sampling.
  maxTokens: num(process.env.MAX_TOKENS, 512),
  temperature: num(process.env.TEMPERATURE, 0.7),
  topP: num(process.env.TOP_P, 0.9),
  repetitionPenalty: num(process.env.REPETITION_PENALTY, 1.1),

  // HTTP server (npm run serve).
  host: process.env.HOST ?? "127.0.0.1",
  port: num(process.env.PORT, 8080),
};
