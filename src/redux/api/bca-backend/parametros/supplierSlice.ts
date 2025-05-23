import type { SupplierType } from '~types/supplier'
import { bcaApiSlice } from '../bcaSlice'

const supplierSlice = bcaApiSlice.injectEndpoints({
  overrideExisting: true,

  endpoints: (builder) => ({
    createSupplier: builder.mutation<SupplierType, SupplierType>({
      query: (supplier) => ({
        url: '/parametros/proveedores',
        method: 'POST',
        body: supplier,
      }),

      invalidatesTags: ['suppliers'],
    }),

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

export const { useCreateSupplierMutation, useUpdateSupplierMutation } =
  supplierSlice
