import type { InvoiceCreateType } from '~types/invoice'
import { bcaApiSlice } from '../bcaSlice'

const invoiceApiSlice = bcaApiSlice.injectEndpoints({
  overrideExisting: true,

  endpoints: (builder) => ({
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

export const { useUpdateInvoiceMutation } = invoiceApiSlice
