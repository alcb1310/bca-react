import { RubroMaterialResponseTye } from '../../../../types/rubro-material'
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
  }),
})

export const { useGetAllRubrosMaterialsQuery } = rubroMaterialApilice
