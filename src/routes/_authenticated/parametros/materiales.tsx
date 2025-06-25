import Materials from '@/pages/parametros/materials'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/parametros/materiales')({
  component: Materials,
})
