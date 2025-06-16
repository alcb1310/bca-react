import type { LoginErrorResponse } from '@/types/error'
import type { LoginInput } from '@/types/login'
import type * as user from '@/types/user'
import { bcaApiSlice } from '../bcaSlice'

type loginResponse = {
  user: user.UserResponse
  token: string
}

const authEndPoints = bcaApiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    login: builder.mutation<loginResponse, LoginInput>({
      query(body) {
        return {
          url: '/login',
          method: 'POST',
          body,
        }
      },

      transformErrorResponse(baseQueryReturnValue: {
        data: LoginErrorResponse
        status: number
      }) {
        return {
          error: baseQueryReturnValue.data.error,
          status: baseQueryReturnValue.status,
        }
      },
    }),
  }),
})

export const { useLoginMutation } = authEndPoints
