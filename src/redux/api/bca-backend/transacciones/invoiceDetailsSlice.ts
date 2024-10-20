import { bcaApiSlice } from '../bcaSlice'

const invoiceDetailsApiSlice = bcaApiSlice.injectEndpoints({
  overrideExisting: true,

  endpoints: (builder) => ({
    getAllInvoiceDetails: builder.query<void, { id: string }>({
      query: ({ id }) => {
        return {
          url: `/transacciones/facturas/${id}/detalle`,
          method: 'GET',
        }
      },
    }),
  }),
})

export const { useGetAllInvoiceDetailsQuery } = invoiceDetailsApiSlice
