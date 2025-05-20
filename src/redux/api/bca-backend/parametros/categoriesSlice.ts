import type { CategoryType } from '~types/categories'
import { bcaApiSlice } from '../bcaSlice'

const categorySlice = bcaApiSlice.injectEndpoints({
  overrideExisting: true,

  endpoints(builder) {
    return {
      updateCategory: builder.mutation<CategoryType, CategoryType>({
        query(data) {
          return {
            url: `/parametros/categorias/${data.id}`,
            method: 'PUT',
            body: data,
          }
        },

        invalidatesTags: ['categorias'],
      }),
    }
  },
})

export const { useUpdateCategoryMutation } = categorySlice
