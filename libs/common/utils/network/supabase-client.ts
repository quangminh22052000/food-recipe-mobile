import { createClient, type SupabaseClient } from "@supabase/supabase-js"

import { sentryTracedFetch } from "@/libs/common/utils/sentry"

let client: SupabaseClient | undefined

export const getSupabase = (): SupabaseClient | null => {
  const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL
  const supabasePublishableKey =
    process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY

  if (!supabaseUrl || !supabasePublishableKey) return null

  if (!client) {
    client = createClient(supabaseUrl, supabasePublishableKey, {
      global: {
        fetch: sentryTracedFetch,
      },
    })
  }

  return client
}
