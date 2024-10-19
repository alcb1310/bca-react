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

    updateInvoice: builder.mutation<InvoiceCreateType, InvoiceCreateType>({
      query: (body) => {
        return {
          url: `/transacciones/facturas/${body.id}`,
          method: 'PUT',
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
  useUpdateInvoiceMutation,
} = invoiceApiSlice
