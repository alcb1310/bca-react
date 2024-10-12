import { BudgetItem } from "../../../../types/partidas";
import { bcaApiSlice } from "../bcaSlice";

const partidasEndpoints = bcaApiSlice.injectEndpoints({
  overrideExisting: true,

  endpoints: builder => ({
    getAllBudgetItems: builder.query<BudgetItem[], {
      query: string
    }>({
      query(body) {
        return {
          url: `/parametros/partidas?query=${body.query}`,
          method: "GET",
        }
      },

      providesTags: ["partidas"],
    }),

    createBudgetItem: builder.mutation<BudgetItem, BudgetItem>({
      query(body) {
        return {
          url: "/parametros/partidas",
          method: "POST",
          body
        }
      },

      invalidatesTags: ["partidas"],
    }),
  })
})

export const {
  useGetAllBudgetItemsQuery,
  useCreateBudgetItemMutation,
} = partidasEndpoints
