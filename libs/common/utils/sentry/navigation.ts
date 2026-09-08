import { useEffect, useRef } from "react"

import * as Sentry from "@sentry/react-native"
import {
  useGlobalSearchParams,
  useNavigationContainerRef,
  usePathname,
} from "expo-router"

import { debugAction } from "./debug"

export const sentryNavigationIntegration = Sentry.reactNavigationIntegration({
  enableTimeToInitialDisplay: true,
})

export const useSentryNavigationTracking = () => {
  const navigationRef = useNavigationContainerRef()
  const pathname = usePathname()
  const params = useGlobalSearchParams()
  const paramsKey = JSON.stringify(params)
  const previousPathRef = useRef<string | undefined>(undefined)

  useEffect(() => {
    sentryNavigationIntegration.registerNavigationContainer(navigationRef)
  }, [navigationRef])

  useEffect(() => {
    const from = previousPathRef.current
    const to = pathname
    previousPathRef.current = to

    Sentry.addBreadcrumb({
      category: "navigation",
      type: "navigation",
      level: "info",
      message: from ? `${from} → ${to}` : to,
      data: { from, to, params: JSON.parse(paramsKey) as typeof params },
    })

    Sentry.setTag("screen", to)

    const message = from ? `Navigate ${from} → ${to}` : `Navigate ${to}`
    debugAction(message, JSON.parse(paramsKey) as typeof params)

    Sentry.captureMessage(message, {
      level: "info",
      fingerprint: ["navigation", from ?? "app-start", to],
      extra: { from, to, params: JSON.parse(paramsKey) as typeof params },
    })
  }, [pathname, paramsKey])
}
