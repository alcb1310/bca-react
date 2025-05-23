import type { SupplierType } from '~types/supplier'
import { bcaApiSlice } from '../bcaSlice'

const supplierSlice = bcaApiSlice.injectEndpoints({
  overrideExisting: true,

  endpoints: (builder) => ({
    updateSupplier: builder.mutation<SupplierType, SupplierType>({
      query: (supplier) => ({
        url: `/parametros/proveedores/${supplier.id}`,
        method: 'PUT',
        body: supplier,
      }),

      invalidatesTags: ['suppliers'],
    }),
  }),
})

export const { useUpdateSupplierMutation } = supplierSlice
