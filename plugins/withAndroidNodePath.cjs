const { execSync } = require("child_process")
const fs = require("fs")
const path = require("path")

const { withDangerousMod } = require("expo/config-plugins")

const resolveNodeBinary = () => {
  const candidates = [
    process.env.NODE_BINARY,
    (() => {
      try {
        return execSync("command -v node", {
          encoding: "utf8",
          shell: "/bin/bash",
        }).trim()
      } catch {
        return null
      }
    })(),
    "/usr/local/bin/node",
    "/opt/homebrew/bin/node",
  ].filter(Boolean)

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return candidate
    }
  }

  return "node"
}

const withAndroidNodePath = config =>
  withDangerousMod(config, [
    "android",
    async config => {
      const androidDir = config.modRequest.platformProjectRoot
      const binDir = path.join(androidDir, ".bin")
      const nodeShim = path.join(binDir, "node")
      const nodePath = resolveNodeBinary()

      fs.mkdirSync(binDir, { recursive: true })
      fs.writeFileSync(
        nodeShim,
        `#!/bin/sh\nexec "${nodePath.replace(/"/g, '\\"')}" "$@"\n`,
        { mode: 0o755 },
      )

      const gradlewPath = path.join(androidDir, "gradlew")
      const marker = "# expo-node-path"

      if (fs.existsSync(gradlewPath)) {
        let gradlew = fs.readFileSync(gradlewPath, "utf8")
        if (!gradlew.includes(marker)) {
          gradlew = gradlew.replace(
            /APP_HOME=\$\( cd -P "\$\{APP_HOME:-\.\/\}" > \/dev\/null && printf '%s\\n' "\$PWD" \) \|\| exit\n/,
            `$&${marker}\nif [ -d "$APP_HOME/.bin" ]; then\n  PATH="$APP_HOME/.bin:$PATH"\n  export PATH\nfi\n`,
          )
          fs.writeFileSync(gradlewPath, gradlew, { mode: 0o755 })
        }
      }

      const settingsGradlePath = path.join(androidDir, "settings.gradle")
      if (fs.existsSync(settingsGradlePath)) {
        let settingsGradle = fs.readFileSync(settingsGradlePath, "utf8")
        if (!settingsGradle.includes(".bin/node")) {
          settingsGradle = settingsGradle.replace(
            'def nodeExecutable = ["/usr/local/bin/node"',
            'def nodeExecutable = [new File(settingsDir, ".bin/node").absolutePath, "/usr/local/bin/node"',
          )
          fs.writeFileSync(settingsGradlePath, settingsGradle)
        }
      }

      const ideaDir = path.join(androidDir, ".idea")
      const gradleXmlPath = path.join(ideaDir, "gradle.xml")
      const pathForGradle = [
        binDir,
        "/usr/local/bin",
        "/opt/homebrew/bin",
        "/usr/bin",
        "/bin",
      ].join(":")

      fs.mkdirSync(ideaDir, { recursive: true })

      const envBlock = `        <option name="gradleExternalEnvironment">
          <map>
            <entry key="PATH" value="${pathForGradle}" />
          </map>
        </option>
`

      if (fs.existsSync(gradleXmlPath)) {
        let gradleXml = fs.readFileSync(gradleXmlPath, "utf8")
        gradleXml = gradleXml.replace(
          /<option name="env">[\s\S]*?<\/option>\s*/g,
          "",
        )
        if (gradleXml.includes("gradleExternalEnvironment")) {
          gradleXml = gradleXml.replace(
            /(<entry key="PATH" value=")[^"]*(" \/>)/,
            `$1${pathForGradle}$2`,
          )
        } else if (gradleXml.includes("</GradleProjectSettings>")) {
          gradleXml = gradleXml.replace(
            "</GradleProjectSettings>",
            `${envBlock}      </GradleProjectSettings>`,
          )
        }
        fs.writeFileSync(gradleXmlPath, gradleXml)
      } else {
        fs.writeFileSync(
          gradleXmlPath,
          `<?xml version="1.0" encoding="UTF-8"?>
<project version="4">
  <component name="GradleMigrationSettings" migrationVersion="1" />
  <component name="GradleSettings">
    <option name="linkedExternalProjectsSettings">
      <GradleProjectSettings>
        <option name="testRunner" value="CHOOSE_PER_TEST" />
        <option name="externalProjectPath" value="$PROJECT_DIR$" />
        <option name="gradleJvm" value="#GRADLE_LOCAL_JAVA_HOME" />
${envBlock}      </GradleProjectSettings>
    </option>
  </component>
</project>
`,
        )
      }

      return config
    },
  ])

module.exports = withAndroidNodePath
