import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

type LoginResponse = {
    data: string,
    error: string
    jwt: string
}
type LoginCredentials = {
    email: string
    password: string
}
type ValidateType = {
    email: string
    name: string
    company: string
    jwt: string
}
const url = import.meta.env.VITE_BASE_URL as string

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: `${url}/api`,
        credentials: 'include'
        // prepareHeaders(headers) {
        // return headers
        // },
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
            }),

            validate: build.query<ValidateType, undefined>({
                query() {
                    return {
                        url: '/validate',
                        method: 'GET',
                        credentials: 'include'
                    }
                }
            })
        }
    },
})

export const { useLoginMutation, useValidateQuery } = apiSlice
