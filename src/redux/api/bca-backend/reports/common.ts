import { bcaApiSlice } from '../bcaSlice'

type LevelType = {
  key: string
  value: string
}

const commonApiSlice = bcaApiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAllLevels: builder.query<LevelType[], void>({
      query: () => {
        return {
          url: '/reportes/levels',
          method: 'GET',
        }
      },
    }),
  }),
})

export const { useGetAllLevelsQuery } = commonApiSlice
