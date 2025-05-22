import type { UserResponse } from '~types/user'
import { bcaApiSlice } from '../bcaSlice'

const userEndPoints = bcaApiSlice.injectEndpoints({
  overrideExisting: true,

  endpoints: (builder) => ({
    deleteUser: builder.mutation<UserResponse, string>({
      query(id) {
        return {
          url: `/users/${id}`,
          method: 'DELETE',
        }
      },

      invalidatesTags: ['users'],
    }),

    updateUser: builder.mutation<UserResponse, UserResponse>({
      query(body) {
        return {
          url: `/users/${body.id}`,
          method: 'PUT',
          body,
        }
      },

      invalidatesTags: ['users'],
    }),

    updatePassword: builder.mutation<void, { password: string }>({
      query(body) {
        return {
          url: '/users',
          method: 'PUT',
          body,
        }
      },

      invalidatesTags: ['users'],
    }),
  }),
})

export const {
  useDeleteUserMutation,
  useUpdateUserMutation,
  useUpdatePasswordMutation,
} = userEndPoints
