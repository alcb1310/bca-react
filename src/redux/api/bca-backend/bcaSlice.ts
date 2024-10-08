import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { UserResponse } from "../../../types/user"
import { LoginInput } from "../../../types/login"
import { LoginErrorResponse } from "../../../types/error"

const SERVER_API_URL = import.meta.env.VITE_BACKEND_SERVER

export const bcaApiSlice = createApi({
  reducerPath: "bcaApi",
  baseQuery: fetchBaseQuery({
    baseUrl: SERVER_API_URL
  }),

  endpoints: builder => ({
    login: builder.mutation<UserResponse | LoginErrorResponse, LoginInput>({
      query(body) {
        return {
          url: "/login",
          method: "POST",
          body
        }
      },

      transformErrorResponse(baseQueryReturnValue, _meta, _arg) {
        return {
          error: baseQueryReturnValue.data as LoginErrorResponse,
          status: baseQueryReturnValue.status
        }
      },
    })
  })
})

export const { useLoginMutation } = bcaApiSlice
