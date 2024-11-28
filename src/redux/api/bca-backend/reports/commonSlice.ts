import { BudgetResponseType } from '../../../../types/budget'
import { BalanceResponseType, SpentResponseType } from '../../../../types/reports'
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
                    params,
                }
            },
        }),

        getBalanceReport: builder.query<
            BalanceResponseType,
            {
                project_id: string
                date: string
            }
        >({
            query: (params) => {
                return {
                    url: '/reportes/cuadre',
                    method: 'GET',
                    params,
                }
            },

            providesTags: ['cuadre'],
        }),

        setBalancedInvoice: builder.mutation<void, { invoice_id: string }>({
            query: (data) => {
                return {
                    url: `/reportes/cuadre/${data.invoice_id}`,
                    method: 'PUT',
                }
            },

            invalidatesTags: ['cuadre'],
        }),

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
                    params
                }
            },
        }),
    }),
})

export const {
    useGetAllLevelsQuery,
    useGetAllHistoricQuery,
    useGetBalanceReportQuery,
    useSetBalancedInvoiceMutation,
    useGetSpentQuery,
} = commonApiSlice
