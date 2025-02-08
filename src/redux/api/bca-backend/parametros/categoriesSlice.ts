import { bcaApiSlice } from '../bcaSlice'
import { CategoryType } from '~types/categories'

const categorySlice = bcaApiSlice.injectEndpoints({
    overrideExisting: true,

    endpoints(builder) {
        return {
            getAllCategories: builder.query<CategoryType[], void>({
                query() {
                    return {
                        url: '/parametros/categorias',
                        method: 'GET',
                    }
                },

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
    useGetAllCategoriesQuery,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
} = categorySlice
