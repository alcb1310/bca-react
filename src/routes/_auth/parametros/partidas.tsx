import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/parametros/partidas')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_auth/parametros/partidas"!</div>
}
