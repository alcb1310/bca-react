import type { CategoryType } from '@/types/categories'
import { bcaApiSlice } from '../bcaSlice'

const categorySlice = bcaApiSlice.injectEndpoints({
    overrideExisting: true,


        providesTags: ['categorias'],
      }),

      createCategory: builder.mutation<CategoryType, CategoryType>({
        query(data) {
          return {
            url: '/parametros/categorias',
            method: 'POST',
            body: data,
          }
        },

        invalidatesTags: ['categorias'],
      }),

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

export const {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} = categorySlice
