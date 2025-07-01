import Materials from '@/pages/parametros/materials'
import { useGetAllCategoriesQuery } from '@/queries/parametros/categorias'
import { useGetAllMaterialsQuery } from '@/queries/parametros/materiales'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/parametros/materiales')({
  component: Materials,
  loader: async ({ context: { queryClient } }) => {
    return await Promise.all([
      queryClient.ensureQueryData({
        queryKey: ['categorias'],
        queryFn: useGetAllCategoriesQuery,
      }),
      queryClient.ensureQueryData({
        queryKey: ['materiales'],
        queryFn: useGetAllMaterialsQuery,
      }),
    ])
  },
})
