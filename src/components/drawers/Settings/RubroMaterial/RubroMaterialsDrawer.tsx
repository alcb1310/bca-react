import { zodResolver } from "@hookform/resolvers/zod";
import { Typography } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import ButtonGroup from "@/components/buttons/button-group";
import BcaDrawer from "@/components/drawers/BcaDrawer/BcaDrawer";
import BcaSelect from "@/components/input/BcaSelect";
import BcaTextField from "@/components/input/BcaTextField";
import DrawerTitle from "@/components/titles/DrawerTitle";
import { GetAllMaterials } from "@/queries/parametros/materials";
import {
	CreateRubroMaterial,
	UpdateRubroMaterial,
} from "@/queries/parametros/rubroMaterial";
import {
	type RubroMaterialType,
	rubroMaterialSchema,
} from "@/types/rubro-material";

type RubroMaterialsDrawerProps = {
	open: boolean;
	onClose: () => void;
	defaultValues: RubroMaterialType;
};

function RubroMaterialsDrawer({
	open,
	onClose,
	defaultValues,
}: RubroMaterialsDrawerProps) {
	const queryClient = useQueryClient();
	const [confilctError, setConflictError] = useState<string>("");
	const { control, reset, handleSubmit, register } = useForm<RubroMaterialType>(
		{
			defaultValues,
			resolver: zodResolver(rubroMaterialSchema),
		},
	);

	const { data: allMaterials } = useQuery({
		queryKey: ["materials"],
		queryFn: () => GetAllMaterials(),
	});

	const useCreateRubroMaterial = useMutation({
		mutationFn: CreateRubroMaterial,
		onSuccess: () => {
			onClose();
			toast.success("Rubro creado exitosamente");
		},
		onError: (error) => {
			setConflictError(error.message);
			toast.error(`Error al crear el rubro: ${error.message}`);
		},
		onSettled: () => {
			queryClient.invalidateQueries({
				queryKey: ["rubro-materials"],
			});
		},
	});

	const useUpdateRubroMaterial = useMutation({
		mutationFn: UpdateRubroMaterial,
		onSuccess: () => {
			onClose();
			toast.success("Rubro actualizado exitosamente");
		},
		onError: (error) => {
			setConflictError(error.message);
			toast.error(`Error al actualizar el rubro: ${error.message}`);
		},
		onSettled: () => {
			queryClient.invalidateQueries({
				queryKey: ["rubro-materials"],
			});
		},
	});

	useEffect(() => {
		reset(defaultValues);
		setConflictError("");
	}, [reset, defaultValues]);

	async function hadleSubmit(data: RubroMaterialType) {
		const material: RubroMaterialType = {
			item_id: data.item_id,
			material_id: data.material_id,
			quantity: Number.parseFloat(data.quantity.toString()),
		};
		setConflictError("");

		if (!defaultValues.material_id) {
			useCreateRubroMaterial.mutate({ data: material });
			return;
		}

		useUpdateRubroMaterial.mutate({ data: material });
	}

	return (
		<BcaDrawer open={open} onClose={onClose}>
			<DrawerTitle
				title={defaultValues.material_id ? "Editar Material" : "Crear Material"}
				close={onClose}
			/>

			<form
				className="mt-5 flex flex-col gap-5"
				onSubmit={handleSubmit(hadleSubmit)}
			>
				{confilctError && (
					<Typography color="error">{confilctError}</Typography>
				)}
				<input type="hidden" {...register("item_id")} />

				<BcaSelect
					name="material_id"
					label="Material"
					datatestid="component.drawer.settings.rubro.material.material"
					control={control}
					disabled={!!defaultValues.material_id}
				>
					<option value="">Seleccione un material</option>
					{allMaterials?.map((material) => (
						<option key={material.id} value={material.id}>
							{material.name}
						</option>
					))}
				</BcaSelect>

				<BcaTextField
					datatestid="component.drawer.settings.rubro.material.quantity"
					name="quantity"
					label="Cantidad"
					control={control}
				/>

				<ButtonGroup
					saveFunction={handleSubmit(hadleSubmit)}
					cancelFunction={onClose}
				/>
			</form>
		</BcaDrawer>
	);
}

export default RubroMaterialsDrawer;
