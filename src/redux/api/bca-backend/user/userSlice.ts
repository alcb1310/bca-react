import { UserCreate, UserResponse } from "../../../../types/user";
import { bcaApiSlice } from "../bcaSlice";

const userEndPoints = bcaApiSlice.injectEndpoints({
  overrideExisting: true,

  endpoints: builder => ({
    me: builder.query<UserResponse, void>({
      query() {
        return {
          url: "/users/me",
          method: "GET"
        }
      },

      providesTags: ["users"],
    }),

    allUsers: builder.query<UserResponse[], void>({
      query() {
        return {
          url: "/users",
          method: "GET"
        }
      },

      providesTags: ["users"],
    }),

    createUser: builder.mutation<UserResponse, UserCreate>({
      query(body) {
        return {
          url: "/users",
          method: "POST",
          body
        }
      },

      invalidatesTags: ["users"],
    }),

    deleteUser: builder.mutation<UserResponse, string>({
      query(id) {
        return {
          url: `/users/${id}`,
          method: "DELETE"
        }
      },

      invalidatesTags: ["users"],
    }),

    updateUser: builder.mutation<UserResponse, UserResponse>({
      query(body) {
        return {
          url: `/users/${body.id}`,
          method: "PUT",
          body
        }
      },

      invalidatesTags: ["users"],
    }),

    updatePassword: builder.mutation<void, { password: string }>({
      query(body) {
        return {
          url: `/users`,
          method: "PUT",
          body
        }
      },

      invalidatesTags: ["users"],
    }),

  })
})

export const {
  useMeQuery,
  useAllUsersQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useUpdatePasswordMutation
} = userEndPoints
