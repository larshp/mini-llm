import process from "node:process";

/**
 * A small progress_callback for pipeline() that renders download progress on a
 * single line of stderr. Handy for both the CLI and the server on first run.
 */
export function downloadProgress(progress) {
  if (progress.status === "progress" && typeof progress.progress === "number") {
    const pct = progress.progress.toFixed(1).padStart(5);
    process.stderr.write(`\r  ↓ ${pct}%  ${progress.file ?? ""}`.padEnd(70));
  } else if (progress.status === "done" && progress.file) {
    process.stderr.write(`\r  ✓ ${progress.file}`.padEnd(70) + "\n");
  }
}
