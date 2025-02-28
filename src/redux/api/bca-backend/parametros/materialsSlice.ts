import { bcaApiSlice } from '../bcaSlice'
import { MaterialType } from '@/types/materials'

const materialsApi = bcaApiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAllMaterials: builder.query<MaterialType[], void>({
      query() {
        return {
          url: '/parametros/materiales',
          method: 'GET',
        }
      },

      providesTags: ['materiales'],
    }),

    createMaterial: builder.mutation<MaterialType, MaterialType>({
      query(data) {
        return {
          url: '/parametros/materiales',
          method: 'POST',
          body: data,
        }
      },

      invalidatesTags: ['materiales'],
    }),

    updateMaterial: builder.mutation<MaterialType, MaterialType>({
      query(data) {
        return {
          url: `/parametros/materiales/${data.id}`,
          method: 'PUT',
          body: data,
        }
      },

      invalidatesTags: ['materiales'],
    }),
  }),
})

export const {
  useGetAllMaterialsQuery,
  useCreateMaterialMutation,
  useUpdateMaterialMutation,
} = materialsApi
