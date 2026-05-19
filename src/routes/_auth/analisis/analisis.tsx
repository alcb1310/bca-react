import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/analisis/analisis')({
	component: RouteComponent,
})

function RouteComponent() {
	return <div>Hello "/_auth/analisis/analisis"!</div>
}
