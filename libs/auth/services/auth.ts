import { AxiosRequestConfig } from "axios"

import { LoginPayload } from "../types"
import { axiosClient } from "@/libs/common/utils/network"

const login = async (payload: LoginPayload, config?: AxiosRequestConfig) => {
  const url = `/login?email=${payload.email}&password=${payload.password}`
  return await axiosClient.post<any>(url, config)
}

export const authAPI = {
  login,
}
