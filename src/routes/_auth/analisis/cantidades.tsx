import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/analisis/cantidades')({
	component: RouteComponent,
})

function RouteComponent() {
	return <div>Hello "/_auth/analisis/cantidades"!</div>
}
