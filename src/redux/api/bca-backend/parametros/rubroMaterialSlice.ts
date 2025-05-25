import type { RubroMaterialType } from '~types/rubro-material'
import { bcaApiSlice } from '../bcaSlice'

const rubroMaterialApilice = bcaApiSlice.injectEndpoints({
  overrideExisting: true,

  endpoints: (builder) => ({
    deleteRubrosMaterial: builder.mutation<
      void,
      { rubroId: string; materialId: string }
    >({
      query: (data) => {
        return {
          url: `/parametros/rubros/${data.rubroId}/materiales/${data.materialId}`,
          method: 'DELETE',
        }
      },

      invalidatesTags: ['rubro-material'],
    }),

    updateRubrosMaterial: builder.mutation<void, RubroMaterialType>({
      query: (data) => {
        return {
          url: `/parametros/rubros/${data.item_id}/materiales/${data.material_id}`,
          method: 'PUT',
          body: data,
        }
      },

      invalidatesTags: ['rubro-material'],
    }),
  }),
})

export const {
  useDeleteRubrosMaterialMutation,
  useUpdateRubrosMaterialMutation,
} = rubroMaterialApilice
