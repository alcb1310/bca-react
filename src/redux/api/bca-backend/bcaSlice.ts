import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { UserResponse } from "../../../types/user"
import { LoginInput } from "../../../types/login"
import { LoginErrorResponse } from "../../../types/error"
import { RootState } from "../../store"

const SERVER_API_URL = import.meta.env.VITE_BACKEND_SERVER

type loginResponse = {
  user: UserResponse
  token: string
}

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

  endpoints: builder => ({
    login: builder.mutation<loginResponse, LoginInput>({
      query(body) {
        return {
          url: "/login",
          method: "POST",
          body
        }
      },

      transformErrorResponse(baseQueryReturnValue: {
        data: LoginErrorResponse,
        status: number
      }) {
        return {
          error: baseQueryReturnValue.data.error,
          status: baseQueryReturnValue.status
        }
      },
    }),
  })
})

export const { useLoginMutation } = bcaApiSlice
