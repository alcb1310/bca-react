import { bcaApiSlice } from '../bcaSlice'
import {
  InvoiceDetailsCreateType,
  InvoiceDetailsResponseType,
} from '@/types/invoiceDetails'

const invoiceDetailsApiSlice = bcaApiSlice.injectEndpoints({
  overrideExisting: true,

  endpoints: (builder) => ({
    getAllInvoiceDetails: builder.query<
      InvoiceDetailsResponseType[],
      { id: string }
    >({
      query: ({ id }) => {
        return {
          url: `/transacciones/facturas/${id}/detalle`,
          method: 'GET',
        }
      },

      providesTags: ['detalle', 'facturas', 'partidas'],
    }),

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
  useGetAllInvoiceDetailsQuery,
  useCreateIvoiceDetailsMutation,
  useDeleteInvoiceDetailsMutation,
} = invoiceDetailsApiSlice
