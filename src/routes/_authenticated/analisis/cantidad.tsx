import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/analisis/cantidad')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/analisis/cantidad"!</div>
}
