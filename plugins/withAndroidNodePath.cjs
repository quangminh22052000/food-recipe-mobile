const { execSync } = require("child_process")
const fs = require("fs")
const path = require("path")

const { withDangerousMod } = require("expo/config-plugins")

const { resolveJavaHome } = require("../scripts/resolve-java-home.cjs")

const upsertGradleJavaHome = (gradlePropertiesPath, javaHome) => {
  if (!fs.existsSync(gradlePropertiesPath)) return

  const marker = "# expo-java-home-21"
  let contents = fs.readFileSync(gradlePropertiesPath, "utf8")
  const line = `org.gradle.java.home=${javaHome}`

  if (/^org\.gradle\.java\.home=/m.test(contents)) {
    contents = contents.replace(/^org\.gradle\.java\.home=.*$/m, line)
  } else {
    contents = `${contents.trimEnd()}\n\n${marker}\n${line}\n`
  }

  fs.writeFileSync(gradlePropertiesPath, contents)
}

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
      const javaHome = resolveJavaHome()

      if (javaHome) {
        upsertGradleJavaHome(
          path.join(androidDir, "gradle.properties"),
          javaHome,
        )
      }

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
        javaHome ? path.join(javaHome, "bin") : null,
        binDir,
        "/usr/local/bin",
        "/opt/homebrew/bin",
        "/usr/bin",
        "/bin",
      ]
        .filter(Boolean)
        .join(":")

      fs.mkdirSync(ideaDir, { recursive: true })

      const javaHomeEntry = javaHome
        ? `            <entry key="JAVA_HOME" value="${javaHome}" />\n`
        : ""
      const gradleJvmValue = javaHome ?? "#GRADLE_LOCAL_JAVA_HOME"

      const envBlock = `        <option name="gradleExternalEnvironment">
          <map>
${javaHomeEntry}            <entry key="PATH" value="${pathForGradle}" />
          </map>
        </option>
`

      if (fs.existsSync(gradleXmlPath)) {
        let gradleXml = fs.readFileSync(gradleXmlPath, "utf8")
        gradleXml = gradleXml.replace(
          /<option name="env">[\s\S]*?<\/option>\s*/g,
          "",
        )
        gradleXml = gradleXml.replace(
          /<option name="gradleJvm" value="[^"]*" \/>/,
          `<option name="gradleJvm" value="${gradleJvmValue}" />`,
        )
        if (gradleXml.includes("gradleExternalEnvironment")) {
          if (javaHome && !gradleXml.includes('key="JAVA_HOME"')) {
            gradleXml = gradleXml.replace(
              /(<map>\s*)/,
              `$1<entry key="JAVA_HOME" value="${javaHome}" />\n            `,
            )
          } else if (javaHome) {
            gradleXml = gradleXml.replace(
              /(<entry key="JAVA_HOME" value=")[^"]*(" \/>)/,
              `$1${javaHome}$2`,
            )
          }
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
        <option name="gradleJvm" value="${gradleJvmValue}" />
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
