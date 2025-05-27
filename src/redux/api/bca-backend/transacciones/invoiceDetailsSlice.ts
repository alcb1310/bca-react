import type {
  InvoiceDetailsCreateType,
  InvoiceDetailsResponseType,
} from '~types/invoiceDetails'
import { bcaApiSlice } from '../bcaSlice'

const invoiceDetailsApiSlice = bcaApiSlice.injectEndpoints({
  overrideExisting: true,

  endpoints: (builder) => ({
    createIvoiceDetails: builder.mutation<
      InvoiceDetailsResponseType,
      { body: InvoiceDetailsCreateType; id: string }
    >({
      query: ({ id, body }) => {
        return {
          url: `/transacciones/facturas/${id}/detalle`,
          method: 'POST',
          body,
        }
      },

      invalidatesTags: ['detalle', 'facturas'],
    }),

    deleteInvoiceDetails: builder.mutation<
      void,
      { invoiceId: string; detailId: string }
    >({
      query: ({ invoiceId, detailId }) => {
        return {
          url: `/transacciones/facturas/${invoiceId}/detalle/${detailId}`,
          method: 'DELETE',
        }
      },

      invalidatesTags: ['detalle', 'facturas'],
    }),
  }),
})

export const {
  useCreateIvoiceDetailsMutation,
  useDeleteInvoiceDetailsMutation,
} = invoiceDetailsApiSlice
