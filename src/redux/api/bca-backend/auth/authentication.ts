import { bcaApiSlice } from "../bcaSlice";
import { LoginErrorResponse } from "../../../../types/error"
import { LoginInput } from "../../../../types/login"
import { UserResponse } from "../../../../types/user";

type loginResponse = {
  user: UserResponse
  token: string
}

const authEndPoints = bcaApiSlice.injectEndpoints({
  overrideExisting: true,
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

export const { useLoginMutation } = authEndPoints
