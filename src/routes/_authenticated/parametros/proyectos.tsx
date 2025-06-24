import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/parametros/proyectos')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/parametros/proyectos"!</div>
}
