import type { MaterialType } from '~types/materials'
import { bcaApiSlice } from '../bcaSlice'

const materialsApi = bcaApiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
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
