import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";
import { DeleteIcon, EditIcon, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Spinner } from "@/components/ui/spinner";
import PageTitle from "@/components/web/pageTitle";
import { UserCreateDrawer } from "@/components/web/user-drawer";
import { GetAllUsers } from "@/queries/users";
import type { UserResponse } from "@/types/user";

export const Route = createFileRoute("/_auth/usuarios/administrar")({
	component: RouteComponent,
	beforeLoad: ({ context: { queryClient } }) => {
		queryClient.ensureQueryData({
			queryKey: ["usuarios"],
			queryFn: () => GetAllUsers(),
		});
	},
});

function RouteComponent() {
	const { data, isLoading } = useSuspenseQuery({
		queryKey: ["usuarios"],
		queryFn: () => GetAllUsers(),
	});

	const columns: ColumnDef<UserResponse>[] = [
		{
			accessorKey: "name",
			header: "Nombre",
		},
		{
			accessorKey: "email",
			header: "Email",
		},
		{
			id: "actions",
			cell: ({ row }) => {
				const usuario = row.original;

				if (!usuario) return null;

				return (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" className="h-8 w-8 p-0">
								<span className="sr-only">Open menu</span>
								<MoreHorizontal className="h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>Acciones</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								Editar
								<EditIcon size={16} className="text-yellow-600" />
							</DropdownMenuItem>
							<DropdownMenuItem>
								Borrar
								<DeleteIcon size={16} className="text-red-600" />
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				);
			},
		},
	];

	return (
		<div>
			<PageTitle title="Administrar Usuarios" />

			{isLoading && <Spinner />}
			<UserCreateDrawer />

			<div className="max-w-2/3">
				<DataTable columns={columns} data={data} />
			</div>
		</div>
	);
}
