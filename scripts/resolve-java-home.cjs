/**
 * Resolve JDK for Android Gradle (team default: Java 21).
 * Override: set GRADLE_JAVA_HOME or JAVA_HOME to a JDK 21 install.
 */
const { execSync } = require("child_process")
const fs = require("fs")
const os = require("os")
const path = require("path")

const REQUIRED_MAJOR = Number(process.env.ANDROID_JAVA_MAJOR || "21")

const javaBinaryName = process.platform === "win32" ? "java.exe" : "java"

const getJavaVersionOutput = javaHome => {
  const javaBin = path.join(javaHome, "bin", javaBinaryName)
  if (!fs.existsSync(javaBin)) return null
  try {
    return execSync(`"${javaBin}" -version 2>&1`, { encoding: "utf8" })
  } catch (error) {
    const buf = error.stderr || error.stdout
    return buf ? String(buf) : null
  }
}

const majorVersionFromOutput = output => {
  if (!output) return null
  const match = output.match(/version "(\d+)/)
  return match ? Number(match[1]) : null
}

const isValidJavaHome = javaHome => {
  const major = majorVersionFromOutput(getJavaVersionOutput(javaHome))
  return major === REQUIRED_MAJOR
}

const normalizeHome = candidate => {
  if (!candidate) return null
  const trimmed = candidate.trim().replace(/^["']|["']$/g, "")
  return fs.existsSync(trimmed) ? trimmed : null
}

const macOsCandidates = () => {
  const list = []
  try {
    const fromTool = execSync(
      `/usr/libexec/java_home -v ${REQUIRED_MAJOR} 2>/dev/null`,
      {
        encoding: "utf8",
      },
    ).trim()
    if (fromTool) list.push(fromTool)
  } catch {
    /* ignore */
  }
  list.push(
    `/Library/Java/JavaVirtualMachines/zulu-${REQUIRED_MAJOR}.jdk/Contents/Home`,
    `/Library/Java/JavaVirtualMachines/temurin-${REQUIRED_MAJOR}.jdk/Contents/Home`,
  )
  return list
}

const windowsCandidates = () => {
  const roots = [
    process.env["ProgramFiles"],
    process.env["ProgramFiles(x86)"],
    "C:\\Program Files",
    "C:\\Program Files (x86)",
  ].filter(Boolean)

  const names = [
    `Java\\jdk-${REQUIRED_MAJOR}`,
    `Eclipse Adoptium\\jdk-${REQUIRED_MAJOR}*`,
    `Microsoft\\jdk-${REQUIRED_MAJOR}*`,
    `Zulu\\zulu-${REQUIRED_MAJOR}*`,
    `Amazon Corretto\\jdk${REQUIRED_MAJOR}*`,
  ]

  const list = []
  for (const root of roots) {
    for (const name of names) {
      if (name.includes("*")) {
        const parent = path.join(root, name.split("\\")[0])
        if (!fs.existsSync(parent)) continue
        for (const entry of fs.readdirSync(parent)) {
          if (entry.includes(String(REQUIRED_MAJOR))) {
            list.push(path.join(parent, entry))
          }
        }
      } else {
        list.push(path.join(root, name))
      }
    }
  }
  return list
}

const linuxCandidates = () => [
  `/usr/lib/jvm/java-${REQUIRED_MAJOR}-openjdk`,
  `/usr/lib/jvm/java-${REQUIRED_MAJOR}-openjdk-amd64`,
  `/usr/lib/jvm/temurin-${REQUIRED_MAJOR}-jdk-amd64`,
]

const resolveJavaHome = () => {
  const explicit =
    normalizeHome(process.env.GRADLE_JAVA_HOME) ||
    normalizeHome(process.env.JAVA_HOME)

  if (explicit && isValidJavaHome(explicit)) return explicit

  const platformCandidates =
    process.platform === "darwin"
      ? macOsCandidates()
      : process.platform === "win32"
        ? windowsCandidates()
        : linuxCandidates()

  for (const candidate of platformCandidates) {
    const home = normalizeHome(candidate)
    if (home && isValidJavaHome(home)) return home
  }

  return null
}

if (require.main === module) {
  const home = resolveJavaHome()
  if (!home) {
    console.error(
      `Could not find JDK ${REQUIRED_MAJOR}. Set GRADLE_JAVA_HOME or JAVA_HOME, then run pnpm setup:android.`,
    )
    process.exit(1)
  }
  process.stdout.write(home)
}

module.exports = { resolveJavaHome, REQUIRED_MAJOR }
