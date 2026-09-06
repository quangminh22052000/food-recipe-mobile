import AsyncStorage from "@react-native-async-storage/async-storage"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!
const supabasePublishableKey = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY!

// Expo Router also renders on Node, where AsyncStorage's web backend reads `window`.
const isBrowser = typeof window !== "undefined"

const authStorage = {
  getItem: (key: string) => {
    if (!isBrowser) {
      return null
    }
    return AsyncStorage.getItem(key)
  },
  setItem: (key: string, value: string) => {
    if (!isBrowser) {
      return
    }
    return AsyncStorage.setItem(key, value)
  },
  removeItem: (key: string) => {
    if (!isBrowser) {
      return
    }
    return AsyncStorage.removeItem(key)
  },
}

export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    storage: authStorage,
    autoRefreshToken: isBrowser,
    persistSession: isBrowser,
    detectSessionInUrl: false,
  },
})
