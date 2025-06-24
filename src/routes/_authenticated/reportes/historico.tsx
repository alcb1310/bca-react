import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/reportes/historico')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/reportes/historico"!</div>
}
