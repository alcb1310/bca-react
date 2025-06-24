import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/parametros/categorias')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/parametros/categorias"!</div>
}
