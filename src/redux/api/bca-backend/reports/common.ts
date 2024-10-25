import { BudgetResponseType } from '../../../../types/budget'
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

    getAllHistoric: builder.query<
      BudgetResponseType[],
      {
        project_id: string
        level: string
        date: string
      }
    >({
      query: (params) => {
        return {
          url: '/reportes/historico',
          method: 'GET',
          params
        }
      },
    }),
  }),
})

export const { useGetAllLevelsQuery, useGetAllHistoricQuery } = commonApiSlice
