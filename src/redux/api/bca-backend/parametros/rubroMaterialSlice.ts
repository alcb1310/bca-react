import {
  RubroMaterialResponseTye,
  RubroMaterialType,
} from '../../../../types/rubro-material'
import { bcaApiSlice } from '../bcaSlice'

const rubroMaterialApilice = bcaApiSlice.injectEndpoints({
  overrideExisting: true,

  endpoints: (builder) => ({
    getAllRubrosMaterials: builder.query<RubroMaterialResponseTye[], string>({
      query: (rubroId) => {
        return {
          url: `/parametros/rubros/${rubroId}/materiales`,
          method: 'GET',
        }
      },

      providesTags: ['rubro-material'],
    }),

    createRubrosMaterial: builder.mutation<
      RubroMaterialResponseTye,
      RubroMaterialType
    >({
      query: (data) => {
        return {
          url: `/parametros/rubros/${data.item_id}/materiales`,
          method: 'POST',
          body: data
        }
      },

      invalidatesTags: ['rubro-material'],
    }),
  }),
})

export const {
  useGetAllRubrosMaterialsQuery,
  useCreateRubrosMaterialMutation,
} = rubroMaterialApilice
