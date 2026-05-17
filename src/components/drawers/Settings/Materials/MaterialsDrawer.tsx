import { zodResolver } from "@hookform/resolvers/zod";
import { CircularProgress, Typography } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import ButtonGroup from "@/components/buttons/button-group";
import BcaDrawer from "@/components/drawers/BcaDrawer/BcaDrawer";
import BcaSelect from "@/components/input/BcaSelect";
import BcaTextField from "@/components/input/BcaTextField";
import DrawerTitle from "@/components/titles/DrawerTitle";
import { GetAllCategories } from "@/queries/parametros/categories";
import { CreateMaterial, UpdateMaterial } from "@/queries/parametros/materials";
import {
	type MaterialCreateType,
	type MaterialType,
	materialSchema,
} from "@/types/materials";

type MaterialsDrawerProps = {
	open: boolean;
	onClose: () => void;
	defaultValues: MaterialType;
};

export default function MaterialsDrawer({
	open,
	onClose,
	defaultValues,
}: MaterialsDrawerProps) {
	const queryClient = useQueryClient();
	const [conflictError, setConflictError] = useState<string>("");

	const { control, reset, handleSubmit } = useForm<MaterialType>({
		defaultValues,
		resolver: zodResolver(materialSchema),
	});

	const { data: categories, isLoading } = useQuery({
		queryKey: ["categorias"],
		queryFn: () => GetAllCategories(),
	});

	const createMaterialMutation = useMutation({
		mutationFn: CreateMaterial,
		onSuccess: () => {
			onClose();
			toast.success("Material creado exitosamente");
		},
		onError: (error) => {
			setConflictError(error.message);
			toast.error(`Error al crear el material: ${error.message}`);
		},
		onSettled: () => {
			queryClient.invalidateQueries({
				queryKey: ["materials"],
			});
		},
	});

	const updateMaterialMutation = useMutation({
		mutationFn: UpdateMaterial,
		onSuccess: () => {
			onClose();
			toast.success("Material actualizado exitosamente");
		},
		onError: (error) => {
			setConflictError(error.message);
			toast.error(`Error al actualizar el material: ${error.message}`);
		},
		onSettled: () => {
			queryClient.invalidateQueries({
				queryKey: ["materials"],
			});
		},
	});

	useEffect(() => {
		reset(defaultValues);
		setConflictError("");
	}, [reset, defaultValues]);

	async function hadleSubmit(data: MaterialType) {
		if (!defaultValues.id) {
			const material: MaterialCreateType = {
				code: data.code,
				name: data.name,
				unit: data.unit,
				category_id: data.category.id,
			};
			createMaterialMutation.mutate({ data: material });
			return;
		}

		updateMaterialMutation.mutate({ data });
	}

	return (
		<BcaDrawer open={open} onClose={onClose}>
			<DrawerTitle
				title={defaultValues.id ? "Editar Material" : "Crear Material"}
				close={onClose}
			/>

			{isLoading && <CircularProgress />}
			{conflictError && <Typography color="error">{conflictError}</Typography>}

			<form
				className="mt-5 flex flex-col gap-5"
				onSubmit={handleSubmit(hadleSubmit)}
			>
				<BcaTextField
					datatestid="component.drawer.setting.materials.code"
					name="code"
					label="Código"
					control={control}
				/>

				<BcaTextField
					datatestid="component.drawer.setting.materials.name"
					name="name"
					label="Nombre"
					control={control}
				/>

				<BcaTextField
					datatestid="component.drawer.setting.materials.unit"
					name="unit"
					label="Unidad"
					control={control}
				/>

				<BcaSelect
					datatestid="component.drawer.setting.materials.category"
					name="category.id"
					label="Categoría"
					control={control}
				>
					<option value="">Seleccione una categoría</option>
					{categories?.map((category) => (
						<option key={category.id} value={category.id}>
							{category.name}
						</option>
					))}
				</BcaSelect>

				<ButtonGroup
					saveFunction={handleSubmit(hadleSubmit)}
					cancelFunction={onClose}
				/>
			</form>
		</BcaDrawer>
	);
}
