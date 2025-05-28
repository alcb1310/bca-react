import type { SpentDetailsType, SpentResponseType } from '~types/reports'
import { bcaApiSlice } from '../bcaSlice'

const commonApiSlice = bcaApiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getSpent: builder.query<
      SpentResponseType,
      {
        project_id: string
        level: string
        date: string
      }
    >({
      query: (params) => {
        return {
          url: '/reportes/gastado',
          method: 'GET',
          params,
        }
      },
    }),
    getSpentDetails: builder.query<
      SpentDetailsType[],
      {
        project_id: string
        budget_item_id: string
        date: string
      }
    >({
      query: (params) => {
        const url = `/reportes/gastado/${params.project_id}/${params.budget_item_id}/${params.date}`
        console.log('getSpentDetails', url)

        return {
          url,
          method: 'GET',
        }
      },
    }),
  }),
})

export const { useGetSpentQuery, useGetSpentDetailsQuery } = commonApiSlice
