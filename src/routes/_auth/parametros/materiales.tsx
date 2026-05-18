import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Spinner } from "@/components/ui/spinner";
import PageTitle from "@/components/web/pageTitle";
import { GetAllMaterials } from "@/queries/parametros/materials";
import { Button } from "@/components/ui/button";
import { EditIcon, PlusIcon } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import type { MaterialType } from "@/types/materials";
import { DataTable } from "@/components/ui/data-table";
import { MaterialCreateDrawer } from "@/components/web/material-drawer";

export const Route = createFileRoute("/_auth/parametros/materiales")({
	component: RouteComponent,
	loader: ({ context: { queryClient } }) => {
		queryClient.ensureQueryData({
			queryKey: ["materiales"],
			queryFn: () => GetAllMaterials(),
		});
	},
});

function RouteComponent() {
	const { data, isLoading } = useSuspenseQuery({
		queryKey: ["materiales"],
		queryFn: () => GetAllMaterials(),
	});

	const columns: ColumnDef<MaterialType>[] = [
		{
			accessorKey: "code",
			header: "Código",
		},
		{
			accessorKey: "name",
			header: "Nombre",
		},
		{
			accessorKey: "unit",
			header: "Unidad",
		},
		{
			accessorKey: "category.name",
			header: "Categoria",
		},
		{
			id: "actions",
			cell: ({ row }) => {
				const material = row.original;
				if (!material) return null;

				return (
					<div>
						<EditIcon size={10} className="text-yellow-600" />
					</div>
				);
			},
		},
	];

	return (
		<div>
			<PageTitle title="Materiales" />
			{isLoading && <Spinner />}

			<MaterialCreateDrawer />
			<DataTable columns={columns} data={data} />
		</div>
	);
}
