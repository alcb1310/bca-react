import { CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import MaterialsDrawer from "@/components/drawers/Settings/Materials/MaterialsDrawer";
import AllMaterialsTable from "@/components/settings/materials/AllMaterialsTable";
import EditToolbar from "@/components/table/headers/toolbar";
import PageTitle from "@/components/titles/PageTitle";
import { GetAllMaterials } from "@/queries/parametros/materials";

export default function Materials() {
	const [open, setOpen] = useState<boolean>(false);

	const { data, isLoading } = useQuery({
		queryKey: ["materials"],
		queryFn: GetAllMaterials,
	});

	return (
		<>
			<PageTitle title="Materiales" />
			{isLoading && (
				<CircularProgress data-testid="page.parameters.materials.loading" />
			)}

			<EditToolbar title="Crear Material" onClick={() => setOpen(true)} />
			<AllMaterialsTable data={data!} />
			<MaterialsDrawer
				open={open}
				onClose={() => setOpen(false)}
				defaultValues={{
					code: "",
					name: "",
					unit: "",
					category: {
						id: "",
						name: "",
					},
				}}
			/>
		</>
	);
}
