import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import {
	DataGrid,
	GridActionsCellItem,
	type GridColDef,
	type GridRowParams,
} from "@mui/x-data-grid";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import RubroMaterialsDrawer from "@/components/drawers/Settings/RubroMaterial/RubroMaterialsDrawer";
import {
	DeleteRubroMaterial,
	GetAllRubrosMaterials,
} from "@/queries/parametros/rubroMaterial";
import type {
	RubroMaterialResponseTye,
	RubroMaterialType,
} from "@/types/rubro-material";

type AllRubrosMaterialsTableProps = {
	rubroId: string;
};

export default function AllRubrosMaterialsTable({
	rubroId,
}: AllRubrosMaterialsTableProps) {
	const queryClient = useQueryClient();
	const [open, setOpen] = useState<boolean>(false);
	const [selectedRubroMaterial, setSelectedRubroMaterial] =
		useState<RubroMaterialType | null>(null);

	const useDeleteRubroMaterial = useMutation({
		mutationFn: DeleteRubroMaterial,
		onSuccess: () => {
			toast.success("Rubro eliminado exitosamente");
		},
		onError: (error) => {
			toast.error(`Error al eliminar el rubro: ${error.message}`);
		},
		onSettled: () => {
			queryClient.invalidateQueries({
				queryKey: ["rubro-materials"],
			});
		},
	});

	const { data: materials } = useQuery({
		queryKey: ["rubro-materials", rubroId],
		queryFn: () => GetAllRubrosMaterials(rubroId),
		enabled: !!rubroId,
	});

	const cols: GridColDef<RubroMaterialResponseTye>[] = [
		{
			field: "code",
			headerName: "Código",
			width: 100,
			valueGetter: (_value, row) => row.material.code,
		},
		{
			field: "name",
			headerName: "Nombre",
			width: 400,
			valueGetter: (_value, row) => row.material.name,
		},
		{
			field: "unit",
			headerName: "Unidad",
			width: 100,
			align: "center",
			valueGetter: (_value, row) => row.material.unit,
		},
		{
			field: "quantity",
			headerName: "Cantidad",
			width: 200,
			align: "right",
			valueFormatter: (params: number) => {
				return params.toLocaleString("es-EC", {
					minimumFractionDigits: 2,
					maximumFractionDigits: 2,
				});
			},
		},
		{
			field: "actions",
			type: "actions",
			width: 10,
			getActions: (params: GridRowParams) => [
				<GridActionsCellItem
					key={params.id}
					icon=<EditOutlined color="warning" />
					label="Editar"
					showInMenu
					onClick={() => {
						const dataToEdit: RubroMaterialType = {
							item_id: params.row.item.id,
							material_id: params.row.material.id,
							quantity: params.row.quantity,
						};

						setSelectedRubroMaterial(dataToEdit);
						setOpen(true);
					}}
				/>,

				<GridActionsCellItem
					key={params.id}
					icon=<DeleteOutline color="error" />
					label="Borrar"
					showInMenu
					onClick={async () => {
						useDeleteRubroMaterial.mutate({
							rubroId: params.row.item.id,
							materialId: params.row.material.id,
						});
					}}
				/>,
			],
		},
	];

	return (
		<>
			<DataGrid
				columns={cols}
				rows={materials!}
				getRowId={(row) => row.material.id!}
				rowHeight={25}
				disableColumnFilter
				disableColumnResize
				disableRowSelectionOnClick
				disableMultipleRowSelection
				sx={{ "&, [class^=MuiDataGrid]": { border: "none" } }}
				pagination
				initialState={{
					pagination: {
						paginationModel: { pageSize: 25 },
					},
				}}
			/>

			{open && (
				<RubroMaterialsDrawer
					open={open}
					onClose={() => setOpen(false)}
					defaultValues={selectedRubroMaterial!}
				/>
			)}
		</>
	);
}
