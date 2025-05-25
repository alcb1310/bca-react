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
  }),
})

export const { useDeleteRubrosMaterialMutation } = rubroMaterialApilice
