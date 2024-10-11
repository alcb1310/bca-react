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
    })
  })
})

export const {
  useMeQuery,
  useAllUsersQuery,
  useCreateUserMutation,
} = userEndPoints
