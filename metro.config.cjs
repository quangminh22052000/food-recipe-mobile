// eslint-disable-next-line @typescript-eslint/no-require-imports
const { getSentryExpoConfig } = require("@sentry/react-native/metro")

/** @type {import("expo/metro-config").MetroConfig} */
const config = getSentryExpoConfig(__dirname)

// Metro + package exports resolve `tslib` to `modules/index.js`, which default-imports
// `tslib.js` and crashes (`_tslib.default` is undefined). Point at the ESM helpers instead.
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === "tslib") {
    return {
      filePath: require.resolve("tslib/tslib.es6.js"),
      type: "sourceFile",
    }
  }

  return context.resolveRequest(context, moduleName, platform)
}

module.exports = config
