import Materials from '@/pages/parametros/materials'
import { useGetAllCategoriesQuery } from '@/queries/parametros/categorias'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/parametros/materiales')({
  component: Materials,
  loader: ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData({
      queryKey: ['categorias'],
      queryFn: useGetAllCategoriesQuery,
    })
  },
})
