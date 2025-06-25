import IndividualItem from '@/pages/parametros/items/detail'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/parametros/rubros/$rubroId',
)({
  component: IndividualItem,
  loader: ({ params: { rubroId } }) => {
    return { rubroId }
  },
})
