import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/parametros/categorias')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_auth/parametros/categorias"!</div>
}
