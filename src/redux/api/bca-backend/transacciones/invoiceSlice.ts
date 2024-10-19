import { InvoiceResponseType } from "../../../../types/invoice";
import { bcaApiSlice } from "../bcaSlice";

const invoiceApiSlice = bcaApiSlice.injectEndpoints({
  overrideExisting: true,

  endpoints: builder => ({
    getAllInvoices: builder.query<InvoiceResponseType[], void>({
      query: () => {
        return {
          url: '/transacciones/facturas',
          method: 'GET',
        }
      },

      providesTags: ['facturas', 'partidas', 'suppliers'],
    })
  })
})

export const {
  useGetAllInvoicesQuery
} = invoiceApiSlice
