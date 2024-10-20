import {
  InvoiceDetailsCreateType,
  InvoiceDetailsResponseType,
} from '../../../../types/invoiceDetails'
import { bcaApiSlice } from '../bcaSlice'

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

      invalidatesTags: ['detalle'],
    }),
  }),
})

export const { useGetAllInvoiceDetailsQuery, useCreateIvoiceDetailsMutation } =
  invoiceDetailsApiSlice
