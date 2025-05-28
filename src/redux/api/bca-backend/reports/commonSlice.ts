import type { SpentDetailsType } from '~types/reports'
import { bcaApiSlice } from '../bcaSlice'

const commonApiSlice = bcaApiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
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

export const { useGetSpentDetailsQuery } = commonApiSlice
