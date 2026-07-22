# mini-llm

Run a small, quantized LLM **locally in Node.js**, comfortably within ~4 GB of RAM.

Inference uses [Transformers.js](https://github.com/huggingface/transformers.js)
(`@huggingface/transformers`), which runs models with ONNX Runtime. Installation
pulls **prebuilt binaries only** — a plain `npm install`, with **no node-gyp, no
cmake, and no C/C++ build tools**.

The default model is [`onnx-community/Qwen2.5-0.5B-Instruct`](https://huggingface.co/onnx-community/Qwen2.5-0.5B-Instruct)
in 4-bit (`q4`, ~0.5 GB on disk) — small enough to leave plenty of headroom.

## Requirements

- Node.js **≥ 20.12** (uses `--env-file-if-exists`)
- ~1 GB free disk for the default model (larger models need more)
- Internet access on first run to download the model (afterwards it runs offline)

## Setup

```bash
npm install

# Optional: pre-download the model (otherwise it downloads on first chat/serve)
npm run pull-model
```

## Usage

### Terminal chat

```bash
npm run chat
```

Streams tokens as they are generated. Commands: `/reset` clears history, `/exit` quits.

### HTTP server + web UI

```bash
npm run serve
# open http://127.0.0.1:8080
```

Endpoints:

| Method | Path          | Description                                             |
| ------ | ------------- | ------------------------------------------------------- |
| `GET`  | `/`           | Minimal web chat UI                                     |
| `GET`  | `/health`     | `{ ok, model, dtype }`                                  |
| `POST` | `/api/chat`   | Body `{ "message": "..." }` → streams tokens over SSE   |
| `POST` | `/api/reset`  | Clears the server-side conversation                     |

### Compare small models with an ABAP prompt

Run the built-in small models, ask each for an ABAP Hello World program, and
save their answers to `abap-hello-world-results.md`:

```bash
npm run abap-model-survey
```

Models run sequentially and are released after each answer. Downloads are
cached in `./models`; failures are recorded without stopping the remaining
models.

Example with `curl` (server-sent events):

```bash
curl -N http://127.0.0.1:8080/api/chat \
  -H 'content-type: application/json' \
  -d '{"message":"Explain quantization in one sentence."}'
```

## Configuration

All settings have defaults in [src/config.js](src/config.js) and can be overridden
with environment variables (or a `.env` file — copy [.env.example](.env.example)):

| Variable             | Default                              | Notes                                    |
| -------------------- | ------------------------------------ | ---------------------------------------- |
| `MODEL_ID`           | `onnx-community/Qwen2.5-0.5B-Instruct` | Any Transformers.js-compatible ONNX repo |
| `MODEL_DTYPE`        | `q4`                                 | `q4`,`q4f16`,`q8`,`int8`,`fp16`,`fp32`   |
| `MODELS_DIR`         | `./models`                           | Local model cache                        |
| `SYSTEM_PROMPT`      | *(helpful assistant)*                | Assistant persona                        |
| `MAX_TOKENS`         | `512`                                | Max tokens generated per reply           |
| `TEMPERATURE`        | `0.7`                                | `0` = greedy/deterministic               |
| `TOP_P`              | `0.9`                                | Nucleus sampling                         |
| `REPETITION_PENALTY` | `1.1`                                | Curbs repetition in tiny models          |
| `HOST` / `PORT`      | `127.0.0.1` / `8080`                 | HTTP server bind address                 |

## Choosing a bigger model (still under 4 GB)

Point `MODEL_ID` at any ONNX chat model. Larger = better answers, more RAM, slower.
These all fit within a 4 GB budget at `q4`:

| Model (`MODEL_ID`)                         | Params | Approx. RAM (`q4`) |
| ------------------------------------------ | ------ | ------------------ |
| `onnx-community/Qwen2.5-0.5B-Instruct` ⭐   | 0.5B   | ~0.6 GB            |
| `HuggingFaceTB/SmolLM2-1.7B-Instruct`      | 1.7B   | ~1.5 GB            |
| `onnx-community/Llama-3.2-1B-Instruct`     | 1B     | ~1 GB              |
| `onnx-community/Qwen2.5-1.5B-Instruct`     | 1.5B   | ~1.4 GB            |
| `onnx-community/Llama-3.2-3B-Instruct`     | 3B     | ~2.5 GB            |

```bash
MODEL_ID=onnx-community/Llama-3.2-1B-Instruct npm run chat
```

If a repo name is slightly off, browse the [onnx-community](https://huggingface.co/onnx-community)
org on Hugging Face for the exact id.

## Project layout

```
src/
  config.js       # env-driven configuration + defaults
  llm.js          # loads the model, runs a generation turn (with streaming)
  progress.js     # single-line download progress for first run
  chat.js         # interactive terminal chat
  server.js       # HTTP API + web UI
  pull-model.js   # pre-download the model
  abap-model-survey.js # compare small models with an ABAP prompt
public/
  index.html      # web chat UI (served by server.js)
```

## Notes on memory

Actual RAM use ≈ model weights + a modest ONNX Runtime overhead + the KV cache for
the conversation. The default 0.5B model uses well under 1 GB; keep replies and
context modest (or lower `MAX_TOKENS`) if you push to a 3B model near the 4 GB line.
