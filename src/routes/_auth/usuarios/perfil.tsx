import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Spinner } from "@/components/ui/spinner";
import PageTitle from "@/components/web/pageTitle";
import { Me } from "@/queries/users";

export const Route = createFileRoute("/_auth/usuarios/perfil")({
	component: RouteComponent,
	beforeLoad: ({ context: { queryClient } }) => {
		queryClient.ensureQueryData({ queryKey: ["me"], queryFn: () => Me() });
	},
});

function RouteComponent() {
	const { data, isLoading } = useSuspenseQuery({
		queryKey: ["me"],
		queryFn: () => Me(),
	});

	return (
		<div>
			<PageTitle title="Perfil" />

			{isLoading && <Spinner />}

			<p>
				<strong>Nombre:</strong>{" "}
				<span className="text-chart-3">{data?.name}</span>
			</p>
			<p className="mb-5">
				<strong>Email:</strong>
				<span className="text-chart-3">{data?.email}</span>
			</p>

			<p className="text-xs font-extralight">
				Para modificar el perfil, favor contactarse con el administrador
			</p>
		</div>
	);
}
