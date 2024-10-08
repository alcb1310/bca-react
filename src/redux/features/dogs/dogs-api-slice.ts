import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const DOGS_API_KEY = 'live_VNGJYP0pnGZufr3ZiSKWsEWtxH9SFJ2CxEJtYx92dDlEpGFJCe2kN45jUeL3y9aA'

interface Breed {
  id: string
  name: string
  image: {
    url: string
  }
}

export const dogsApiSlice = createApi({
  reducerPath: 'dogsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.thedogapi.com/v1',
    prepareHeaders: (headers) => {
      headers.set('x-api-key', DOGS_API_KEY)
      return headers
    }
  }),

  endpoints: (builder) => {
    return {
      fetchBreeds: builder.query<Breed[], number | void>({ // <return Type, argument Type>
        query(limit = 10) {
          return `/breeds?limit=${limit}`
        }
      })
    }
  }
})

export const { useFetchBreedsQuery } = dogsApiSlice
