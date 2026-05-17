import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/transacciones/cierre-mensual")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/_auth/transacciones/cierre-mensual"!</div>;
}
