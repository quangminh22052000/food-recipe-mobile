/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react"

import { Redirect, type RelativePathString } from "expo-router"

import { useAuthStore } from "@/libs/auth/store"

export default function App() {
  const { token } = useAuthStore()

  const [refLink, setRefLink] = useState<string | null>(null)

  useEffect(() => {
    // if (token) {
    //   setRefLink("/home")
    // } else {
    //   setRefLink("/login")
    // }
    setRefLink("/home")
  }, [])

  if (refLink === null) {
    return null
  }

  return <Redirect href={refLink as RelativePathString} withAnchor />
}
