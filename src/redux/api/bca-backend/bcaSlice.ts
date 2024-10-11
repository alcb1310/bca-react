import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { RootState } from "../../store"

const SERVER_API_URL = import.meta.env.VITE_BACKEND_SERVER

export const bcaApiSlice = createApi({
  reducerPath: "bcaApi",
  baseQuery: fetchBaseQuery({
    baseUrl: SERVER_API_URL,

    prepareHeaders(headers, { getState }) {
      const token = (getState() as RootState).login.token
      if (token) {
        headers.set("Authorization", `Bearer ${token}`)
      }

      headers.set("Content-Type", "application/json")
      return headers
    },
  }),

  tagTypes: [
    "users",
  ],

  endpoints: () => ({}),
})

