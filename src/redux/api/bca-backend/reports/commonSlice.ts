import type { BudgetResponseType } from '@/types/budget'
import type {
    BalanceResponseType,
    SpentDetailsType,
    SpentResponseType,
} from '@/types/reports'
import { bcaApiSlice } from '../bcaSlice'

const commonApiSlice = bcaApiSlice.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
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

export const {
    useGetAllHistoricQuery,
    useGetBalanceReportQuery,
    useSetBalancedInvoiceMutation,
    useGetSpentQuery,
    useGetSpentDetailsQuery,
} = commonApiSlice
