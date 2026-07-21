import readline from "node:readline/promises";
import { stdin, stdout } from "node:process";
import { getGenerator, generate } from "./llm.js";
import { downloadProgress } from "./progress.js";
import { config } from "./config.js";

async function main() {
  console.error(`Loading ${config.modelId} (dtype=${config.dtype})…`);
  console.error("First run downloads the model to ./models; later runs are offline.\n");

  const generator = await getGenerator({ progress_callback: downloadProgress });

  console.error("\nReady. Commands: /reset (clear history), /exit (quit).\n");

  const messages = [{ role: "system", content: config.systemPrompt }];
  const rl = readline.createInterface({ input: stdin, output: stdout });

  try {
    while (true) {
      const input = (await rl.question("you › ")).trim();
      if (!input) continue;
      if (input === "/exit" || input === "/quit") break;
      if (input === "/reset") {
        messages.length = 1; // keep the system prompt
        console.log("(history cleared)\n");
        continue;
      }

      messages.push({ role: "user", content: input });
      stdout.write("bot › ");
      const reply = await generate({
        generator,
        messages,
        onToken: (token) => stdout.write(token),
      });
      messages.push({ role: "assistant", content: reply });
      stdout.write("\n\n");
    }
  } finally {
    rl.close();
  }
}

main().catch((err) => {
  console.error("\n" + (err?.stack ?? err));
  process.exit(1);
});
