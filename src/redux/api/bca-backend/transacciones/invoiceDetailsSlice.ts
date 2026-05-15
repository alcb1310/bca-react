import { bcaApiSlice } from '../bcaSlice'

const invoiceDetailsApiSlice = bcaApiSlice.injectEndpoints({
    overrideExisting: true,

    endpoints: (builder) => ({
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

export const { useDeleteInvoiceDetailsMutation } = invoiceDetailsApiSlice
