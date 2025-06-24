import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/parametros/materiales')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/parametros/materiales"!</div>
}
