import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/parametros/partidas')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/parametros/partidas"!</div>
}
