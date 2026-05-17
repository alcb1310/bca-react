import { zodResolver } from "@hookform/resolvers/zod";
import { FormControlLabel, Typography } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RhfSwitch } from "mui-rhf-integration";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import ButtonGroup from "@/components/buttons/button-group";
import BcaDrawer from "@/components/drawers/BcaDrawer/BcaDrawer";
import BcaTextField from "@/components/input/BcaTextField";
import DrawerTitle from "@/components/titles/DrawerTitle";
import { CreateProject, UpdateProject } from "@/queries/parametros/projects";
import { type ProjectType, projectSchema } from "@/types/project";

type ProjectDrawerProps = {
	open: boolean;
	onClose: () => void;
	defaultValues: ProjectType;
};

export default function ProjectDrawer({
	open,
	onClose,
	defaultValues,
}: ProjectDrawerProps) {
	const queryClient = useQueryClient();
	const [conflictError, setConflictError] = useState<string>("");
	const { control, reset, handleSubmit } = useForm<ProjectType>({
		defaultValues,
		resolver: zodResolver(projectSchema),
	});

	const createProjectMutation = useMutation({
		mutationFn: CreateProject,
		onSuccess: () => {
			onClose();
			toast.success("Proyecto creado exitosamente");
		},
		onError: (error) => {
			setConflictError(error.message);
			toast.error(`Error al crear el proyecto: ${error.message}`);
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["projects"] });
		},
	});

	const updateProjectMutation = useMutation({
		mutationFn: UpdateProject,
		onSuccess: () => {
			onClose();
			toast.success("Proyecto actualizado exitosamente");
		},
		onError: (error) => {
			setConflictError(error.message);
			toast.error(`Error al crear el proyecto: ${error.message}`);
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["projects"] });
		},
	});

	useEffect(() => {
		reset();
	}, [reset]);

	async function hadleSubmit(data: ProjectType) {
		setConflictError("");
		data.gross_area = Number.parseFloat(data.gross_area?.toString() || "0");
		data.net_area = Number.parseFloat(data.net_area?.toString() || "0");

		if (!defaultValues.id) {
			createProjectMutation.mutate({ data });
			return;
		}

		updateProjectMutation.mutate({ data });
	}

	return (
		<BcaDrawer open={open} onClose={onClose}>
			<DrawerTitle
				title={defaultValues.id ? "Editar Proyecto" : "Crear Proyecto"}
				close={onClose}
			/>

			<form
				className="mt-5 flex flex-col gap-5"
				onSubmit={handleSubmit(hadleSubmit)}
			>
				{conflictError && (
					<Typography color="error" variant="body2">
						{conflictError}
					</Typography>
				)}
				<BcaTextField
					datatestid="component.drawer.settings.project.name"
					name="name"
					label="Nombre"
					control={control}
				/>

				<BcaTextField
					datatestid="component.drawer.settings.project.net.area"
					name="net_area"
					label="Area Bruta"
					control={control}
				/>

				<BcaTextField
					datatestid="component.drawer.settings.project.gross.area"
					name="gross_area"
					label="Area Util"
					control={control}
				/>

				<FormControlLabel
					name="is_active"
					data-testid="component.drawer.settings.project.active"
					labelPlacement="end"
					label="Activo"
					control={
						<RhfSwitch name="is_active" control={control} size="small" />
					}
				/>

				<ButtonGroup
					saveFunction={handleSubmit(hadleSubmit)}
					cancelFunction={onClose}
				/>
			</form>
		</BcaDrawer>
	);
}
