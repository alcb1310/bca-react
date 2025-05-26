import type { InvoiceCreateType } from '~types/invoice'
import { bcaApiSlice } from '../bcaSlice'

const invoiceApiSlice = bcaApiSlice.injectEndpoints({
  overrideExisting: true,

  endpoints: (builder) => ({
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

    deleteInvoice: builder.mutation<void, { id: string }>({
      query: ({ id }) => {
        return {
          url: `/transacciones/facturas/${id}`,
          method: 'DELETE',
        }
      },

      invalidatesTags: ['facturas'],
    }),
  }),
})

export const {
  useCreateInvoiceMutation,
  useUpdateInvoiceMutation,
  useDeleteInvoiceMutation,
} = invoiceApiSlice
