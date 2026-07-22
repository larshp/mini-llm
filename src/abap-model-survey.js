import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { env, pipeline } from "@huggingface/transformers";
import { downloadProgress } from "./progress.js";

const projectRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

// Expected memory is a conservative q4 estimate in MB for this script's short
// prompt and output limit. Actual usage varies by platform and ONNX Runtime.
const models = [
  {
    id: "onnx-community/granite-4.0-350m-ONNX-web",
    released: "2025-10-28",
    parameters: 340_000_000,
    expectedMemoryMb: { min: 800, max: 1_100 },
  },
  {
    id: "onnx-community/LFM2-350M-ONNX",
    released: "2025-07-10",
    parameters: 350_000_000,
    expectedMemoryMb: { min: 500, max: 750 },
  },
  {
    id: "onnx-community/LFM2.5-350M-ONNX",
    released: "2026-03-31",
    parameters: 350_000_000,
    expectedMemoryMb: { min: 500, max: 750 },
  },
  {
    id: "onnx-community/MobileLLM-R1-360M-ONNX",
    released: "2025-09-12",
    parameters: 359_000_000,
    expectedMemoryMb: { min: 900, max: 1_250 },
  },
  {
    id: "HuggingFaceTB/SmolLM2-360M-Instruct",
    released: "2024-11-02",
    parameters: 360_000_000,
    expectedMemoryMb: { min: 600, max: 850 },
  },
  {
    id: "onnx-community/Qwen2.5-0.5B-Instruct",
    released: "2024-09-19",
    parameters: 494_000_000,
    expectedMemoryMb: { min: 1_050, max: 1_400 },
  },
  {
    id: "onnx-community/Qwen2.5-Coder-0.5B-Instruct",
    released: "2024-11-12",
    parameters: 494_000_000,
    expectedMemoryMb: { min: 1_150, max: 1_550 },
  },
  {
    id: "onnx-community/Apertus-v1.1-0.5B-Instruct-ONNX",
    released: "2026-05-29",
    parameters: 564_000_000,
    expectedMemoryMb: { min: 800, max: 1_150 },
  },
  /* skip, this one fails with some template issues
  {
    id: "onnx-community/Qwen3-0.6B-Instruct-ONNX",
    released: "2025-04-29",
    parameters: 600_000_000,
    expectedMemoryMb: { min: 1_300, max: 1_750 },
  },
  */
  {
    id: "onnx-community/LFM2-700M-ONNX",
    released: "2025-07-10",
    parameters: 742_000_000,
    expectedMemoryMb: { min: 800, max: 1_100 },
  },
  {
    id: "onnx-community/MobileLLM-R1-950M-ONNX",
    released: "2025-09-12",
    parameters: 949_000_000,
    expectedMemoryMb: { min: 1_700, max: 2_250 },
  },
  {
    id: "onnx-community/gemma-3-1b-it-ONNX",
    released: "2025-03-12",
    parameters: 1_000_000_000,
    expectedMemoryMb: { min: 1_150, max: 1_550 },
  },
  /* skip this one, it fails
  {
    id: "shreyask/Maincoder-1B-ONNX-web",
    released: "2025-12-30",
    parameters: 1_000_000_000,
    expectedMemoryMb: { min: 2_000, max: 2_700 },
  },
  */
  {
    id: "onnx-community/TinyLlama-1.1B-Chat-v1.0-ONNX",
    released: "2023-12-31",
    parameters: 1_100_000_000,
    expectedMemoryMb: { min: 1_200, max: 1_600 },
  },
  {
    id: "onnx-community/LFM2-1.2B-ONNX",
    released: "2025-07-10",
    parameters: 1_200_000_000,
    expectedMemoryMb: { min: 1_200, max: 1_700 },
  },
  {
    id: "onnx-community/Llama-3.2-1B-Instruct-ONNX",
    released: "2024-09-25",
    parameters: 1_230_000_000,
    expectedMemoryMb: { min: 2_100, max: 2_750 },
  },
  {
    id: "onnx-community/deepseek-coder-1.3b-instruct-ONNX",
    released: "2023-11-02",
    parameters: 1_300_000_000,
    expectedMemoryMb: { min: 1_400, max: 1_850 },
  },
  {
    id: "onnx-community/granite-4.0-1b-ONNX-web",
    released: "2025-10-28",
    parameters: 1_500_000_000,
    expectedMemoryMb: { min: 2_400, max: 3_200 },
  },
  {
    id: "onnx-community/DeepSeek-R1-Distill-Qwen-1.5B-ONNX",
    released: "2025-01-20",
    parameters: 1_500_000_000,
    expectedMemoryMb: { min: 2_400, max: 2_950 },
  },
  /* skip this one, it fails
  {
    id: "onnx-community/DeepCoder-1.5B-Preview-ONNX",
    released: "2025-04-07",
    parameters: 1_540_000_000,
    expectedMemoryMb: { min: 2_500, max: 3_200 },
  },
  */
  /* skip this one, it fails downloading
  {
    id: "onnx-community/OpenReasoning-Nemotron-1.5B-ONNX",
    released: "2025-07-16",
    parameters: 1_540_000_000,
    expectedMemoryMb: { min: 2_400, max: 3_100 },
  },
  */
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
  /* skip this one, it fails
  {
    id: "onnx-community/Qwen2.5-Math-1.5B-Instruct",
    released: "2024-09-19",
    parameters: 1_540_000_000,
    expectedMemoryMb: { min: 2_200, max: 2_900 },
  },
  */
  {
    id: "onnx-community/TinySwallow-1.5B-Instruct-ONNX",
    released: "2025-01-30",
    parameters: 1_540_000_000,
    expectedMemoryMb: { min: 2_250, max: 2_950 },
  },
  {
    id: "HuggingFaceTB/SmolLM2-1.7B-Instruct",
    released: "2024-11-02",
    parameters: 1_700_000_000,
    expectedMemoryMb: { min: 1_750, max: 2_300 },
  },
  {
    id: "onnx-community/Falcon3-1B-Instruct",
    released: "2024-12-17",
    parameters: 1_700_000_000,
    expectedMemoryMb: { min: 2_400, max: 2_950 },
  },
  {
    id: "onnx-community/Bonsai-1.7B-ONNX",
    released: "2026-03",
    parameters: 1_700_000_000,
    expectedMemoryMb: { min: 1_600, max: 2_300 },
  },
  {
    id: "onnx-community/Qwen3-1.7B-ONNX",
    released: "2025-04-29",
    parameters: 1_700_000_000,
    expectedMemoryMb: { min: 2_700, max: 3_600 },
  },
  /* skip this one, it fails
  {
    id: "onnx-community/ZR1-1.5B-ONNX",
    released: "2025-04-07",
    parameters: 1_777_088_000,
    expectedMemoryMb: { min: 2_500, max: 3_200 },
  },
  */
  {
    id: "HuggingFaceTB/SmolLM3-3B-ONNX",
    released: "2025-07-08",
    parameters: 3_000_000_000,
    expectedMemoryMb: { min: 3_500, max: 4_500 },
  },
  {
    id: "onnx-community/Qwen2.5-Coder-3B-Instruct",
    released: "2024-11-12",
    parameters: 3_090_000_000,
    expectedMemoryMb: { min: 3_900, max: 4_900 },
  },
  {
    id: "onnx-community/Phi-3-mini-4k-instruct-ONNX",
    released: "2024-06",
    parameters: 3_800_000_000,
    expectedMemoryMb: { min: 3_400, max: 4_500 },
  },
  {
    id: "onnx-community/Phi-4-mini-instruct-ONNX",
    released: "2025-02",
    parameters: 3_800_000_000,
    expectedMemoryMb: { min: 3_500, max: 4_700 },
  },
  {
    id: "onnx-community/Qwen3-4B-Instruct-2507-ONNX",
    released: "2025-08-05",
    parameters: 4_022_468_096,
    expectedMemoryMb: { min: 4_800, max: 5_900 },
  },
];

const outputPath = path.join(projectRoot, "abap-hello-world-results.md");
const modelsDir = path.join(projectRoot, "models");
const maxNewTokens = 512;
const prompt =
  "Write a minimal Hello World program in ABAP. Return only the complete program.";

env.cacheDir = modelsDir;

function assistantReply(output) {
  const generated = output[0]?.generated_text;
  const last = Array.isArray(generated) ? generated.at(-1) : generated;
  return typeof last === "string" ? last : (last?.content ?? "");
}

function closeUnterminatedCodeFence(answer) {
  const fenceCount = answer.match(/```/g)?.length ?? 0;
  return fenceCount === 1 ? `${answer.trimEnd()}\n\`\`\`` : answer;
}

function formatParameters(parameters) {
  const billions = parameters >= 1_000_000_000;
  const divisor = billions ? 1_000_000_000 : 1_000_000;
  return `${Number((parameters / divisor).toFixed(2))}${billions ? "B" : "M"}`;
}

function formatMemory({ min, max }) {
  return `${min.toLocaleString("en-US")}–${max.toLocaleString("en-US")} MB`;
}

function formatRuntime(runtimeMs) {
  if (runtimeMs === undefined) return "—";
  return `${Math.ceil(runtimeMs / 1_000)} s`;
}

function reportMarkdown(results) {
  const completed = results.filter(({ error }) => !error).length;
  const rows = results
    .map(
      ({ id, released, parameters, expectedMemoryMb, runtimeMs, error }) =>
        `| \`${id}\` | ${released} | ${formatParameters(parameters)} | ${formatMemory(expectedMemoryMb)} | ${formatRuntime(runtimeMs)} | ${error ? "Failed" : "Completed"} |`,
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
- Expected memory: estimated range for this short prompt and ${maxNewTokens}-token limit
- Completed: ${completed}/${models.length}

| Model | Released | Parameters | Expected memory | Generation runtime | Status |
| --- | --- | ---: | ---: | ---: | --- |
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

  if (typeof globalThis.gc !== "function") {
    throw new Error(
      "Garbage collection is unavailable; run Node.js with --expose-gc",
    );
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
    let generationStartedAt;
    try {
      generator = await pipeline("text-generation", model.id, {
        dtype: "q4",
        progress_callback: downloadProgress,
      });
      console.error(`Running ${model.id}`);
      generationStartedAt = performance.now();
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
          max_new_tokens: maxNewTokens,
          do_sample: false,
          repetition_penalty: 1.05,
        },
      );
      const runtimeMs = performance.now() - generationStartedAt;
      results.push({
        ...model,
        runtimeMs,
        answer: closeUnterminatedCodeFence(assistantReply(output)),
      });
    } catch (error) {
      console.error(`Failed: ${error?.message ?? error}`);
      const runtimeMs =
        generationStartedAt === undefined
          ? undefined
          : performance.now() - generationStartedAt;
      results.push({
        ...model,
        runtimeMs,
        error: error?.message ?? String(error),
      });
    } finally {
      try {
        await generator?.dispose();
      } catch (error) {
        console.error(
          `Could not release ${model.id}: ${error?.message ?? error}`,
        );
      }
      generator = undefined;
      globalThis.gc();
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
