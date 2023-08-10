import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { RootState } from "../../store/store"

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

type GetRequest = {
    jwt: string
}
const url = import.meta.env.VITE_BASE_URL as string

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: `${url}/api`,
        prepareHeaders(headers, { getState, endpoint }) {
            const token = (getState() as RootState).login.jwt

            if (token && endpoint !== 'refresh') headers.set('Authorization', `Bearer ${token}`)
            return headers
        },
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

            validate: build.query<ValidateType, GetRequest>({
                query() {
                    return {
                        url: '/validate',
                        method: 'GET',
                    }
                }
            })
        }
    },
})

export const { useLoginMutation, useValidateQuery } = apiSlice
