import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { Spinner } from "@/components/ui/spinner";
import {
	CategoryCreateDrawer,
	CategoryEditDrawer,
} from "@/components/web/category-drawer";
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

				return <CategoryEditDrawer category={category} />;
			},
		},
	];

	return (
		<div>
			<PageTitle title="Categorias" />

			{isLoading && <Spinner />}

			<CategoryCreateDrawer />

			<div className="max-w-1/3">
				<DataTable columns={columns} data={data} />
			</div>
		</div>
	);
}
