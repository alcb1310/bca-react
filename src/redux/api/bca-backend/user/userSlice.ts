import { bcaApiSlice } from '../bcaSlice'

const userEndPoints = bcaApiSlice.injectEndpoints({
  overrideExisting: true,

  endpoints: (builder) => ({
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

export const { useUpdatePasswordMutation } = userEndPoints
