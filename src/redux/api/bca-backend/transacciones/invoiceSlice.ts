import { bcaApiSlice } from '../bcaSlice'

const invoiceApiSlice = bcaApiSlice.injectEndpoints({
    overrideExisting: true,

    endpoints: (builder) => ({
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

export const { useDeleteInvoiceMutation } = invoiceApiSlice
