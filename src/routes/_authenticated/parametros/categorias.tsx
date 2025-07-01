import Categories from '@/pages/parametros/categories'
import { useGetAllCategoriesQuery } from '@/queries/parametros/categorias'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/parametros/categorias')({
  component: Categories,
  loader: async ({ context: { queryClient } }) => {
    return await queryClient.ensureQueryData({
      queryKey: ['categorias'],
      queryFn: useGetAllCategoriesQuery,
    })
  },
})
