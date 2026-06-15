#!/usr/bin/env bash
set -euo pipefail

repo_root="$(git rev-parse --show-toplevel 2>/dev/null || cd "$(dirname "${BASH_SOURCE[0]}")/../../.." && pwd)"
command=$(cat <<'__CODEx_HOOK_COMMAND__'
if git rev-parse --git-dir >/dev/null 2>&1 && [[ -n "$CODEX_TOOL_FILE_PATH" ]]; then git add "$CODEX_TOOL_FILE_PATH" 2>/dev/null; CHANGED_LINES=$(git diff --cached --numstat "$CODEX_TOOL_FILE_PATH" 2>/dev/null | awk '{total += $1 + $2} END {print total + 0}'); if [[ $CHANGED_LINES -gt 0 ]]; then FILENAME=$(basename "$CODEX_TOOL_FILE_PATH"); if [[ $CHANGED_LINES -lt 10 ]]; then SIZE="minor"; elif [[ $CHANGED_LINES -lt 50 ]]; then SIZE="moderate"; else SIZE="major"; fi; MSG="Update $FILENAME: $SIZE changes ($CHANGED_LINES lines)"; git commit -m "$MSG" "$CODEX_TOOL_FILE_PATH" 2>/dev/null || true; fi; fi
__CODEx_HOOK_COMMAND__
)

cd "$repo_root"
exec "$repo_root/.codex/hooks/smart-commit/_shared/run-with-hook-env.sh" -- bash -lc "$command"
