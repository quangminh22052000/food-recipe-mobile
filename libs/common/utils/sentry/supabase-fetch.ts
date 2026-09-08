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

const report = (
  method: string,
  url: string,
  ok: boolean,
  status?: number,
  body?: unknown,
  errorMessage?: string,
) => {
  const safeUrl = sanitizeUrl(url)
  const truncatedBody = serializeBody(body)
  const label = `API ${method} ${safeUrl} → ${status ?? "ERR"}`
  const data = {
    method,
    url: safeUrl,
    status,
    body: truncatedBody,
    error: errorMessage,
  }

  Sentry.addBreadcrumb({
    type: "http",
    category: "http",
    level: ok ? "info" : "error",
    message: label,
    data,
  })

  Sentry.captureMessage(label, {
    level: ok ? "info" : "error",
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

  return Sentry.startSpan(
    { op: "http.client", name: `${method} ${sanitizeUrl(url)}` },
    async span => {
      try {
        const response = await fetch(input, init)
        let body: unknown
        try {
          const contentType = response.headers.get("content-type") ?? ""
          body = contentType.includes("application/json")
            ? await response.clone().json()
            : await response.clone().text()
        } catch {
          body = undefined
        }

        span.setAttribute("http.response.status_code", response.status)
        report(method, url, response.ok, response.status, body)
        return response
      } catch (error) {
        report(
          method,
          url,
          false,
          undefined,
          undefined,
          error instanceof Error ? error.message : String(error),
        )
        throw error
      }
    },
  )
}
