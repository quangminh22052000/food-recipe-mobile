import * as Sentry from "@sentry/react-native"
import { isRunningInExpoGo } from "expo"

import { sentryNavigationIntegration } from "./navigation"

export const initSentry = () => {
  Sentry.init({
    dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
    // enabled: Boolean(process.env.EXPO_PUBLIC_SENTRY_DSN),
    enabled: !__DEV__,
    environment: __DEV__ ? "development" : "production",
    tracesSampleRate: __DEV__ ? 1.0 : 0.2,
    enableNativeFramesTracking: !isRunningInExpoGo(),
    integrations: [sentryNavigationIntegration],
  })
}
