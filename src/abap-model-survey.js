import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { env, pipeline } from "@huggingface/transformers";
import { downloadProgress } from "./progress.js";

const projectRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

// Expected memory is a conservative q4 estimate in MB for this script's short
// prompt and 256-token output. Actual usage varies by platform and ONNX Runtime.
const models = [
  {
    id: "HuggingFaceTB/SmolLM2-360M-Instruct",
    released: "2024-11-02",
    parameters: 360_000_000,
    expectedMemoryMb: { min: 600, max: 850 },
  },
  {
    id: "onnx-community/LFM2-700M-ONNX",
    released: "2025-07-10",
    parameters: 742_489_344,
    expectedMemoryMb: { min: 800, max: 1_100 },
  },
  {
    id: "onnx-community/Qwen2.5-0.5B-Instruct",
    released: "2024-09-19",
    parameters: 494_000_000,
    expectedMemoryMb: { min: 1_050, max: 1_400 },
  },
  {
    id: "onnx-community/gemma-3-1b-it-ONNX",
    released: "2025-03-12",
    parameters: 1_000_000_000,
    expectedMemoryMb: { min: 1_150, max: 1_550 },
  },
  {
    id: "onnx-community/Qwen2.5-Coder-0.5B-Instruct",
    released: "2024-11-12",
    parameters: 494_000_000,
    expectedMemoryMb: { min: 1_150, max: 1_550 },
  },
  {
    id: "onnx-community/TinyLlama-1.1B-Chat-v1.0-ONNX",
    released: "2023-12-31",
    parameters: 1_100_000_000,
    expectedMemoryMb: { min: 1_200, max: 1_600 },
  },
  {
    id: "onnx-community/Qwen3-0.6B-Instruct-ONNX",
    released: "2025-04-29",
    parameters: 600_000_000,
    expectedMemoryMb: { min: 1_300, max: 1_750 },
  },
  {
    id: "onnx-community/deepseek-coder-1.3b-instruct-ONNX",
    released: "2023-11-02",
    parameters: 1_300_000_000,
    expectedMemoryMb: { min: 1_400, max: 1_850 },
  },
  {
    id: "HuggingFaceTB/SmolLM2-1.7B-Instruct",
    released: "2024-11-02",
    parameters: 1_700_000_000,
    expectedMemoryMb: { min: 1_750, max: 2_300 },
  },
  {
    id: "onnx-community/Llama-3.2-1B-Instruct-ONNX",
    released: "2024-09-25",
    parameters: 1_230_000_000,
    expectedMemoryMb: { min: 2_100, max: 2_750 },
  },
  {
    id: "onnx-community/Qwen2.5-1.5B-Instruct",
    released: "2024-09-19",
    parameters: 1_540_000_000,
    expectedMemoryMb: { min: 2_200, max: 2_900 },
  },
  {
    id: "onnx-community/Qwen2.5-Coder-1.5B-Instruct",
    released: "2024-09-19",
    parameters: 1_540_000_000,
    expectedMemoryMb: { min: 2_200, max: 2_900 },
  },
];

const outputPath = path.join(projectRoot, "abap-hello-world-results.md");
const modelsDir = path.join(projectRoot, "models");
const prompt =
  "Write a minimal Hello World program in ABAP. Return only the complete program.";

env.cacheDir = modelsDir;

function assistantReply(output) {
  const generated = output[0]?.generated_text;
  const last = Array.isArray(generated) ? generated.at(-1) : generated;
  return typeof last === "string" ? last : (last?.content ?? "");
}

function formatParameters(parameters) {
  const billions = parameters >= 1_000_000_000;
  const divisor = billions ? 1_000_000_000 : 1_000_000;
  return `${Number((parameters / divisor).toFixed(2))}${billions ? "B" : "M"}`;
}

function formatMemory({ min, max }) {
  return `${min.toLocaleString("en-US")}–${max.toLocaleString("en-US")} MB`;
}

function reportMarkdown(results) {
  const completed = results.filter(({ error }) => !error).length;
  const rows = results
    .map(
      ({ id, released, parameters, expectedMemoryMb, error }) =>
        `| \`${id}\` | ${released} | ${formatParameters(parameters)} | ${formatMemory(expectedMemoryMb)} | ${error ? "Failed" : "Completed"} |`,
    )
    .join("\n");
  const answers = results
    .map(({ id, answer, error }) => {
      const body = error
        ? `Generation failed: \`${String(error).replaceAll("`", "'")}\``
        : answer.trim() || "_(The model returned an empty answer.)_";
      return `## ${id}\n\n${body}`;
    })
    .join("\n\n");

  return `# ABAP Hello World model results

- Prompt: ${prompt}
- Model precision: q4
- Expected memory: estimated range for this short prompt and 256-token limit
- Completed: ${completed}/${models.length}

| Model | Released | Parameters | Expected memory | Status |
| --- | --- | ---: | ---: | --- |
${rows}

${answers}
`;
}

async function saveReport(results) {
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, reportMarkdown(results), "utf8");
}

async function main() {
  if (process.argv.includes("--help") || process.argv.includes("-h")) {
    console.log(`Usage: npm run abap-model-survey

Pull and run every q4 model defined in this script, then write their answers to
an ABAP Hello World prompt to ./abap-hello-world-results.md.`);
    return;
  }

  console.error(
    `Running all ${models.length} built-in q4 models sequentially.`,
  );
  console.error(`Results will be written to ${outputPath}\n`);

  const results = [];
  for (const [index, model] of models.entries()) {
    console.error(
      `[${index + 1}/${models.length}] Pulling and loading ${model.id}`,
    );
    let generator;
    try {
      generator = await pipeline("text-generation", model.id, {
        dtype: "q4",
        progress_callback: downloadProgress,
      });
      console.error(`Running ${model.id}`);
      const output = await generator(
        [
          {
            role: "system",
            content:
              "You are an expert ABAP developer. Be concise and technically correct.",
          },
          { role: "user", content: prompt },
        ],
        {
          max_new_tokens: 256,
          do_sample: false,
          repetition_penalty: 1.05,
        },
      );
      results.push({ ...model, answer: assistantReply(output) });
    } catch (error) {
      console.error(`Failed: ${error?.message ?? error}`);
      results.push({ ...model, error: error?.message ?? String(error) });
    } finally {
      try {
        await generator?.dispose();
      } catch (error) {
        console.error(
          `Could not release ${model.id}: ${error?.message ?? error}`,
        );
      }
      await saveReport(results);
    }
    console.error("");
  }

  const failures = results.filter(({ error }) => error).length;
  console.error(`Report written to ${outputPath}`);
  if (failures > 0) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error?.stack ?? error);
  process.exitCode = 1;
});
