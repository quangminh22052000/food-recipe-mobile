import "dotenv/config"

export default ({ config }) => ({
    ...config,
    experiments: {
      router: true, // 👈 bật Expo Router
    },
    extra: {
      authApiUrl: process.env.EXPO_PUBLIC_AUTH_API_URL,
    },
  })
