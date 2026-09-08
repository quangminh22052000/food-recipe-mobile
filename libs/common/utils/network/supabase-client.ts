import { createClient } from "@supabase/supabase-js"

import { sentryTracedFetch } from "@/libs/common/utils/sentry"

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!
const supabasePublishableKey = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY!

export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  global: {
    fetch: sentryTracedFetch,
  },
})
