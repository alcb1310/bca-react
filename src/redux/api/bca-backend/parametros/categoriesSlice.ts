import { CategoryType } from "../../../../types/categories";
import { bcaApiSlice } from "../bcaSlice";

const categorySlice = bcaApiSlice.injectEndpoints({
  overrideExisting: true,

  endpoints(builder){
    return {
      getAllCategories: builder.query<CategoryType[], void>({
        query() {
          return {
            url: "/parametros/categorias",
            method: "GET"
          }
        },

        providesTags: ["categorias"],
      }),
    }
  }
})

export const {
  useGetAllCategoriesQuery
} = categorySlice
