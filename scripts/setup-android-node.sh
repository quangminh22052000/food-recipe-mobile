#!/usr/bin/env bash
# Ensures Gradle / Android Studio can find `node` when launched from the GUI.
# Expo's autolinking plugins invoke bare `node` — GUI apps often lack nvm in PATH.

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
ANDROID_DIR="$ROOT_DIR/android"
BIN_DIR="$ANDROID_DIR/.bin"
NODE_SHIM="$BIN_DIR/node"
GRADLEW="$ANDROID_DIR/gradlew"
SETTINGS_GRADLE="$ANDROID_DIR/settings.gradle"

if [[ ! -d "$ANDROID_DIR" ]]; then
  echo "android/ not found — run: pnpm prebuild"
  exit 1
fi

resolve_node() {
  local candidate
  for candidate in \
    "${NODE_BINARY:-}" \
    "$(command -v node 2>/dev/null || true)" \
    "/usr/local/bin/node" \
    "/opt/homebrew/bin/node"; do
    if [[ -n "$candidate" && -x "$candidate" ]]; then
      printf '%s' "$candidate"
      return 0
    fi
  done
  return 1
}

NODE_PATH="$(resolve_node)" || {
  echo "Could not find node. Install Node or set NODE_BINARY=/path/to/node"
  exit 1
}

mkdir -p "$BIN_DIR"
cat >"$NODE_SHIM" <<EOF
#!/bin/sh
exec "$NODE_PATH" "\$@"
EOF
chmod +x "$NODE_SHIM"

MARKER="# expo-node-path"
if [[ -f "$GRADLEW" ]] && ! grep -q "$MARKER" "$GRADLEW"; then
  tmp="$(mktemp)"
  awk -v marker="$MARKER" '
    /APP_HOME=\$\( cd -P "\$\{APP_HOME:-\.\/\}" > \/dev\/null && printf .*\) \|\| exit/ {
      print
      print marker
      print "if [ -d \"$APP_HOME/.bin\" ]; then"
      print "  PATH=\"$APP_HOME/.bin:$PATH\""
      print "  export PATH"
      print "fi"
      next
    }
    { print }
  ' "$GRADLEW" >"$tmp"
  mv "$tmp" "$GRADLEW"
  chmod +x "$GRADLEW"
fi

LOCAL_PROPS="$ANDROID_DIR/local.properties"
if [[ -f "$LOCAL_PROPS" ]]; then
  if grep -q '^NODE_BINARY=' "$LOCAL_PROPS"; then
    sed -i '' "s|^NODE_BINARY=.*|NODE_BINARY=$NODE_PATH|" "$LOCAL_PROPS"
  else
    printf '\nNODE_BINARY=%s\n' "$NODE_PATH" >>"$LOCAL_PROPS"
  fi
else
  printf 'sdk.dir=%s\nNODE_BINARY=%s\n' "${ANDROID_HOME:-$HOME/Library/Android/sdk}" "$NODE_PATH" >"$LOCAL_PROPS"
fi

PATH_FOR_GRADLE="$BIN_DIR:/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin"
IDEA_DIR="$ANDROID_DIR/.idea"
GRADLE_XML="$IDEA_DIR/gradle.xml"
ENV_BLOCK="        <option name=\"gradleExternalEnvironment\">
          <map>
            <entry key=\"PATH\" value=\"$PATH_FOR_GRADLE\" />
          </map>
        </option>"

mkdir -p "$IDEA_DIR"

write_gradle_xml() {
  cat >"$GRADLE_XML" <<EOF
<?xml version="1.0" encoding="UTF-8"?>
<project version="4">
  <component name="GradleMigrationSettings" migrationVersion="1" />
  <component name="GradleSettings">
    <option name="linkedExternalProjectsSettings">
      <GradleProjectSettings>
        <option name="testRunner" value="CHOOSE_PER_TEST" />
        <option name="externalProjectPath" value="\$PROJECT_DIR\$" />
        <option name="gradleJvm" value="#GRADLE_LOCAL_JAVA_HOME" />
$ENV_BLOCK
      </GradleProjectSettings>
    </option>
  </component>
</project>
EOF
}

if [[ -f "$GRADLE_XML" ]] && grep -q 'gradleExternalEnvironment' "$GRADLE_XML"; then
  sed -i '' "s|<entry key=\"PATH\" value=\"[^\"]*\"|<entry key=\"PATH\" value=\"$PATH_FOR_GRADLE\"|" "$GRADLE_XML"
else
  write_gradle_xml
fi

if [[ -f "$SETTINGS_GRADLE" ]] && ! grep -q 'settingsDir, ".bin/node"' "$SETTINGS_GRADLE"; then
  sed -i '' 's|def nodeExecutable = \["/usr/local/bin/node"|def nodeExecutable = [new File(settingsDir, ".bin/node").absolutePath, "/usr/local/bin/node"|' "$SETTINGS_GRADLE"
fi

cd "$ANDROID_DIR" && ./gradlew --stop >/dev/null 2>&1 || true

echo "Android node shim: $NODE_SHIM -> $NODE_PATH"
echo "Android Studio PATH (gradleExternalEnvironment): $PATH_FOR_GRADLE"
echo "Stopped Gradle daemons — quit Android Studio, reopen android/, then Sync."
