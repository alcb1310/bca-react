import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";
import { EditIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import PageTitle from "@/components/web/pageTitle";
import { SupplierCreateDrawer } from "@/components/web/supplier-drawer";
import { GetAllSuppliers } from "@/queries/parametros/supplier";
import type { SupplierType } from "@/types/supplier";

export const Route = createFileRoute("/_auth/parametros/proveedores")({
	component: RouteComponent,
	loader: ({ context: { queryClient } }) => {
		queryClient.ensureQueryData({
			queryKey: ["proveedores"],
			queryFn: () => GetAllSuppliers({}),
		});
	},
});

function RouteComponent() {
	const queryClient = useQueryClient();
	const [search, setSearch] = useState<string>("");
	const [debounced, setDebounced] = useState<string>(search);

	const { data, isLoading, isFetching } = useSuspenseQuery({
		queryKey: ["proveedores"],
		queryFn: () => GetAllSuppliers({ search }),
	});

	const columns: ColumnDef<SupplierType>[] = [
		{
			accessorKey: "supplier_id",
			header: "RUC",
		},
		{
			accessorKey: "name",
			header: "Nombre",
		},
		{
			accessorKey: "contact_name.String",
			header: "Nombre Contacto",
		},
		{
			accessorKey: "contact_email.String",
			header: "Email Contacto",
		},
		{
			accessorKey: "contact_phone.String",
			header: "Telefono Contacto",
		},
		{
			id: "actions",
			cell: ({ row }) => {
				const project = row.original;

				return <EditIcon size={10} className="text-yellow-600" />;
			},
		},
	];

	useEffect(() => {
		const id = window.setTimeout(() => setDebounced(search), 500);
		return () => window.clearTimeout(id);
	}, [search]);

	// biome-ignore lint/correctness/useExhaustiveDependencies(debounced): suppress dependency debounced
	useEffect(() => {
		queryClient.invalidateQueries({ queryKey: ["proveedores"] });
	}, [debounced, queryClient]);

	return (
		<div>
			<PageTitle title="Proveedores" />

			<div className="flex my-3 justify-start gap-4">
				<SupplierCreateDrawer />

				<Input
					placeholder="Buscar"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
			</div>
			{(isLoading || isFetching) && <Spinner />}
			<DataTable data={data} columns={columns} />
		</div>
	);
}
