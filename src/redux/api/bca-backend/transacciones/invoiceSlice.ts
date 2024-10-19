import { InvocieCreateType, InvoiceResponseType } from "../../../../types/invoice";
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
    }),

    getOneInvoice: builder.query<InvocieCreateType, string>({
      query: (id) => {
        return {
          url: `/transacciones/facturas/${id}`,
          method: 'GET'
        }
      },

      providesTags: ['facturas', 'partidas', 'suppliers'],
    }),
  })
})

export const {
  useGetAllInvoicesQuery,
  useGetOneInvoiceQuery,
} = invoiceApiSlice
