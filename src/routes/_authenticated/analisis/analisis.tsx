import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/analisis/analisis')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/analisis/analisis"!</div>
}
