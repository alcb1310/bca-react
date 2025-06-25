import Projects from '@/pages/parametros/projects'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/parametros/proyectos')({
  component: Projects,
})
