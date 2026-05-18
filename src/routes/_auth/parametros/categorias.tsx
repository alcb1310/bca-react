import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";
import { EditIcon, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Spinner } from "@/components/ui/spinner";
import PageTitle from "@/components/web/pageTitle";
import { GetAllCategories } from "@/queries/parametros/categories";
import type { CategoryType } from "@/types/categories";

export const Route = createFileRoute("/_auth/parametros/categorias")({
	component: RouteComponent,
	loader: ({ context: { queryClient } }) => {
		queryClient.ensureQueryData({
			queryKey: ["categorias"],
			queryFn: () => GetAllCategories(),
		});
	},
});

function RouteComponent() {
	const { data, isLoading } = useSuspenseQuery({
		queryKey: ["categorias"],
		queryFn: () => GetAllCategories(),
	});

	const columns: ColumnDef<CategoryType>[] = [
		{
			header: "Nombre",
			accessorKey: "name",
		},
		{
			id: "actions",
			cell: ({ row }) => {
				const category = row.original;

				return (
					<EditIcon
						className="text-yellow-600"
						size={16}
						onClick={() => {
							console.log(category);
						}}
					/>
				);
			},
		},
	];

	return (
		<div>
			<PageTitle title="Categorias" />

			{isLoading && <Spinner />}

			<Button className="my-2">
				<PlusIcon size={16} />
				Crear Categoria
			</Button>

			<div className="max-w-1/3">
				<DataTable columns={columns} data={data} />
			</div>
		</div>
	);
}
