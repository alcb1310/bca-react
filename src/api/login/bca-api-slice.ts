import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

type LoginResponse = {
    data: string,
    error: string
}
type LoginCredentials = {
    email: string
    password: string
}

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:42069/api",
    }),
    endpoints(build) {
        return {
            login: build.mutation<LoginResponse, LoginCredentials>({
                query(arg) {
                    return {
                        url: `/login`,
                        method: "POST",
                        body: arg
                    }
                },
            })
        }
    },
})

export const { useLoginMutation } = apiSlice
