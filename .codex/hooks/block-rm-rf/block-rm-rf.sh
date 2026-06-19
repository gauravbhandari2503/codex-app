#!/bin/bash
# .codex/hooks/block-rm-rf.sh

INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')

if echo "$COMMAND" | grep -q 'rm -rf /'; then
  echo "Blocked: refusing to run rm -rf /" >&2
  exit 2
fi

exit 0