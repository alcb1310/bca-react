import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/reportes/actual')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/reportes/actual"!</div>
}
