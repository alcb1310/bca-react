import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/transacciones/presupuesto')({
	component: RouteComponent,
})

function RouteComponent() {
	return <div>Hello "/_auth/transacciones/presupuesto"!</div>
}
