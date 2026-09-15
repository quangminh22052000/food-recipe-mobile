#!/usr/bin/env bash
# Delegates to cross-platform Node resolver (macOS / Linux / Git Bash on Windows).

resolve_java_home() {
  local root
  root="$(cd "$(dirname "$0")/.." && pwd)"
  node "$root/scripts/resolve-java-home.cjs"
}
