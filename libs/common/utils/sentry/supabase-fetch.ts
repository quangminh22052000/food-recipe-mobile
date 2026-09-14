import * as Sentry from "@sentry/react-native"

const MAX_BODY_LENGTH = 2000

const isSentryIngestUrl = (url: string) =>
  url.includes("sentry.io") || url.includes("ingest.")

const sanitizeUrl = (url: string) => {
  try {
    const parsed = new URL(url)
    ;["apikey", "api_key", "access_token", "token", "authorization"].forEach(
      key => parsed.searchParams.delete(key),
    )
    return `${parsed.origin}${parsed.pathname}${parsed.search}`
  } catch {
    return url.split("?")[0] ?? url
  }
}

const serializeBody = (body: unknown) => {
  try {
    const text = typeof body === "string" ? body : JSON.stringify(body)
    if (!text) return undefined
    return text.length > MAX_BODY_LENGTH
      ? `${text.slice(0, MAX_BODY_LENGTH)}…`
      : text
  } catch {
    return "[unserializable]"
  }
}

const addHttpBreadcrumb = (
  method: string,
  url: string,
  ok: boolean,
  status?: number,
  body?: unknown,
  errorMessage?: string,
) => {
  const safeUrl = sanitizeUrl(url)
  const data = {
    method,
    url: safeUrl,
    status,
    body: body === undefined ? undefined : serializeBody(body),
    error: errorMessage,
  }

  Sentry.addBreadcrumb({
    type: "http",
    category: "http",
    level: ok ? "info" : "error",
    message: `API ${method} ${safeUrl} → ${status ?? "ERR"}`,
    data,
  })
}

const reportFailure = (
  method: string,
  url: string,
  status?: number,
  body?: unknown,
  errorMessage?: string,
) => {
  const safeUrl = sanitizeUrl(url)
  const label = `API ${method} ${safeUrl} → ${status ?? "ERR"}`
  const data = {
    method,
    url: safeUrl,
    status,
    body: body === undefined ? undefined : serializeBody(body),
    error: errorMessage,
  }

  addHttpBreadcrumb(method, url, false, status, body, errorMessage)

  Sentry.captureMessage(label, {
    level: "error",
    fingerprint: ["api", method, safeUrl, String(status ?? "ERR")],
    extra: data,
  })
}

/** Supabase `global.fetch` override: reports every response, success or failure. */
export const sentryTracedFetch: typeof fetch = async (input, init) => {
  const method = (init?.method ?? "GET").toUpperCase()
  const url =
    typeof input === "string"
      ? input
      : input instanceof URL
        ? input.toString()
        : input.url

  if (isSentryIngestUrl(url)) {
    return fetch(input, init)
  }

  const runFetch = async () => {
    try {
      const response = await fetch(input, init)

      if (!response.ok) {
        let body: unknown
        try {
          const contentType = response.headers.get("content-type") ?? ""
          body = contentType.includes("application/json")
            ? await response.clone().json()
            : await response.clone().text()
        } catch {
          body = undefined
        }
        reportFailure(method, url, response.status, body)
        return response
      }

      addHttpBreadcrumb(method, url, true, response.status)
      return response
    } catch (error) {
      reportFailure(
        method,
        url,
        undefined,
        undefined,
        error instanceof Error ? error.message : String(error),
      )
      throw error
    }
  }

  if (__DEV__) {
    return runFetch()
  }

  return Sentry.startSpan(
    { op: "http.client", name: `${method} ${sanitizeUrl(url)}` },
    async span => {
      const response = await runFetch()
      span.setAttribute("http.response.status_code", response.status)
      return response
    },
  )
}
