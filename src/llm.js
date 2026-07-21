import { pipeline, TextStreamer, env } from "@huggingface/transformers";
import { config } from "./config.js";

// Cache downloaded models inside the project (./models by default) instead of
// the global Hugging Face cache, so everything stays self-contained.
env.cacheDir = config.modelsDir;

let generatorPromise;

/**
 * Load (and, on first run, download) the text-generation pipeline.
 * The result is memoised so the model is only loaded into memory once.
 *
 * @param {{ progress_callback?: (progress: object) => void }} [options]
 */
export function getGenerator({ progress_callback } = {}) {
  generatorPromise ??= pipeline("text-generation", config.modelId, {
    dtype: config.dtype,
    progress_callback,
  });
  return generatorPromise;
}

/**
 * Run one generation turn over a chat-style `messages` array and return the
 * assistant's reply as a string. If `onToken` is given, tokens are streamed to
 * it as they are produced.
 *
 * @param {object}   args
 * @param {any}      args.generator  pipeline returned by getGenerator()
 * @param {Array<{role: string, content: string}>} args.messages
 * @param {(token: string) => void} [args.onToken]
 * @returns {Promise<string>}
 */
export async function generate({ generator, messages, onToken }) {
  const streamer = onToken
    ? new TextStreamer(generator.tokenizer, {
        skip_prompt: true,
        skip_special_tokens: true,
        callback_function: onToken,
      })
    : undefined;

  const output = await generator(messages, {
    max_new_tokens: config.maxTokens,
    temperature: config.temperature,
    top_p: config.topP,
    repetition_penalty: config.repetitionPenalty,
    do_sample: config.temperature > 0,
    streamer,
  });

  // With a chat-style input, `generated_text` is the full conversation with the
  // new assistant turn appended; the last message is the reply we want.
  const generated = output[0].generated_text;
  const last = Array.isArray(generated) ? generated.at(-1) : generated;
  return typeof last === "string" ? last : (last?.content ?? "");
}
