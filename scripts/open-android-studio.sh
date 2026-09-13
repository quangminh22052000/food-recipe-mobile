#!/usr/bin/env bash
# Open Android Studio with nvm/node available (fallback if IDE sync still fails).

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
bash "$ROOT_DIR/scripts/setup-android-node.sh"

export PATH="$ROOT_DIR/android/.bin:$PATH"

if [[ -d "/Applications/Android Studio.app" ]]; then
  open -a "Android Studio" "$ROOT_DIR/android"
else
  echo "Android Studio not found at /Applications/Android Studio.app"
  exit 1
fi
