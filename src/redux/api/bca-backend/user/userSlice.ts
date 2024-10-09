import { UserResponse } from "../../../../types/user";
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
    })
  })
})

export const { useMeQuery } = userEndPoints
