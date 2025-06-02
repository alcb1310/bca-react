import { createFileRoute } from '@tanstack/react-router'
import Categories from '~/pages/parametros/categories'
import { useGetAllCategoriesQuery } from '~/queries/parametros/categorias'

export const Route = createFileRoute('/_authenticated/parametros/categorias')({
  component: Categories,
  loader: ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData({
      queryKey: ['categories'],
      queryFn: () => useGetAllCategoriesQuery(),
    })
  },
})
