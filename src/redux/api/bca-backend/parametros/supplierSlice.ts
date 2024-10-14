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
})
export const {
  useGetAllSuppliersQuery,
} = supplierSlice
