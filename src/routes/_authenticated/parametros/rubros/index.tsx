import Items from '@/pages/parametros/items'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/parametros/rubros/')({
  component: Items,
})
