import { SupplierType } from '../../../../types/supplier'
import { bcaApiSlice } from '../bcaSlice'

const supplierSlice = bcaApiSlice.injectEndpoints({
  overrideExisting: true,

  endpoints: (builder) => ({
    getAllSuppliers: builder.query<SupplierType[], { search: string }>({
      query: ({ search }) => ({
        url: '/parametros/proveedores',
        method: 'GET',
        params: {
          query: search,
        },
      }),

      providesTags: ['suppliers'],
    }),

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

export const {
  useGetAllSuppliersQuery,
  useCreateSupplierMutation,
  useUpdateSupplierMutation,
} = supplierSlice
