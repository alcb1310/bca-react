import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/reportes/historico')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_auth/reportes/historico"!</div>
}
