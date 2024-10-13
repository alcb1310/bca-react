import { MaterialType } from "../../../../types/materials";
import { bcaApiSlice } from "../bcaSlice";

const materialsApi = bcaApiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: builder => ({
    getAllMaterials: builder.query<MaterialType[], void>({
      query() {
        return {
          url: "/parametros/materiales",
          method: "GET",
        }
      },

      providesTags: ["materiales"],
    })
  })
})

export const { useGetAllMaterialsQuery } = materialsApi
