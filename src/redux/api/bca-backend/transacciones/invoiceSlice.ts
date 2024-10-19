import dayjs from 'dayjs'
import {
  InvoiceCreateType,
  InvoiceResponseType,
} from '../../../../types/invoice'
import { bcaApiSlice } from '../bcaSlice'

const invoiceApiSlice = bcaApiSlice.injectEndpoints({
  overrideExisting: true,

  endpoints: (builder) => ({
    getAllInvoices: builder.query<InvoiceResponseType[], void>({
      query: () => {
        return {
          url: '/transacciones/facturas',
          method: 'GET',
        }
      },

      providesTags: ['facturas', 'partidas', 'suppliers'],
    }),

    getOneInvoice: builder.query<InvoiceCreateType, string>({
      query: (id) => {
        return {
          url: `/transacciones/facturas/${id}`,
          method: 'GET',
        }
      },

      // @ts-expect-error response type is InvoiceCreateType
      transformResponse: (response: InvoiceCreateType) => {
        if (!response.project_id) {
          return {
            project_id: '',
            supplier_id: '',
            invoice_number: '',
            invoice_date: '',
            invoice_total: 0,
          }
        }
        return response
      },

      providesTags: ['facturas', 'partidas', 'suppliers'],
    }),

    createInvoice: builder.mutation<InvoiceCreateType, InvoiceCreateType>({
      query: (body) => {
        return {
          url: '/transacciones/facturas',
          method: 'POST',
          body,
        }
      },

      invalidatesTags: ['facturas'],
    }),
  }),
})

export const {
  useGetAllInvoicesQuery,
  useGetOneInvoiceQuery,
  useCreateInvoiceMutation,
} = invoiceApiSlice
