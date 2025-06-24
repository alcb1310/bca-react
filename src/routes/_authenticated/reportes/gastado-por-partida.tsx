import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/reportes/gastado-por-partida',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/reportes/gastado-por-partida"!</div>
}
