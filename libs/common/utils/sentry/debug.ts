export const debugAction = (label: string, payload?: unknown) => {
  if (!__DEV__) return

  if (payload === undefined) {
    console.log(`${label}`)
    return
  }

  console.log(`${label}`, payload)
}
