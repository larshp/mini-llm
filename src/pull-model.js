import process from "node:process";
import { getGenerator } from "./llm.js";
import { downloadProgress } from "./progress.js";
import { config } from "./config.js";

// Pre-download the model so later `chat`/`serve` runs start instantly and offline.
console.error(`Downloading ${config.modelId} (dtype=${config.dtype})`);
console.error(`  → ${config.modelsDir}\n`);

await getGenerator({ progress_callback: downloadProgress });

console.error("\nModel cached locally. You can now run `npm run chat` or `npm run serve`.");
process.exit(0);
