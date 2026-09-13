const { withAppBuildGradle } = require("expo/config-plugins")

const withSentryGradleFix = config =>
  withAppBuildGradle(config, config => {
    if (config.modResults.language !== "groovy") {
      return config
    }

    const { contents } = config.modResults
    if (!contents.includes("sentry.gradle")) {
      return config
    }

    config.modResults.contents = contents.replace(
      /apply from: file\((\["node"[\s\S]*?"sentry\.gradle"\))/g,
      "apply from: new File($1",
    )

    config.modResults.contents = config.modResults.contents.replace(
      /apply from: file\(\[nodeExecutable[\s\S]*?"sentry\.gradle"\)/g,
      match => match.replace("apply from: file(", "apply from: new File("),
    )

    return config
  })

module.exports = withSentryGradleFix
