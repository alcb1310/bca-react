import { zodResolver } from "@hookform/resolvers/zod";
import { SaveOutlined } from "@mui/icons-material";
import {
	Box,
	Button,
	CircularProgress,
	Stack,
	Typography,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import ConfirmationDialog from "@/components/dialog/ConfirmationDialog";
import BcaDateTextField from "@/components/input/BcaDateTextField";
import BcaSelect from "@/components/input/BcaSelect";
import PageTitle from "@/components/titles/PageTitle";
import { GetAllProjects } from "@/queries/parametros/projects";
import { CreateClosure } from "@/queries/transacciones/closure";
import { type CierreTypes, cierreSchema } from "@/types/cierre";

export default function Cierre() {
	const [open, setOpen] = useState<boolean>(false);
	const [conflictError, setConflictError] = useState<string>("");
	const [cierreData, setCierreData] = useState<CierreTypes | null>(null);

	const { data: projects, isLoading } = useQuery({
		queryKey: ["projects"],
		queryFn: () => GetAllProjects({ active: true }),
	});
	const { control, handleSubmit } = useForm<CierreTypes>({
		defaultValues: {
			project_id: "",
			// @ts-expect-error default value is empty
			date: "",
		},
		resolver: zodResolver(cierreSchema),
	});

	const createClosureMuatation = useMutation({
		mutationFn: CreateClosure,
		onSuccess: () => {
			toast.success("Cierre generado correctamente");
		},
		onError: (error) => {
			toast.error(error.message);
			setConflictError(error.message);
		},
		onSettled: () => {
			setOpen(false);
		},
	});

	function hadleSubmit(data: CierreTypes) {
		setCierreData(data);
		setOpen(true);
	}

	return (
		<>
			<PageTitle title="Cierre de Mes" />

			<form onSubmit={handleSubmit(hadleSubmit)}>
				<Stack width="50%" direction="column" spacing={2} mx="auto" mt={2}>
					{isLoading && (
						<CircularProgress data-testid="page.transactions.closure.loading" />
					)}
					{conflictError && (
						<Typography color="error">{conflictError}</Typography>
					)}

					<BcaSelect
						datatestid="page.transactions.closure.project"
						name="project_id"
						control={control}
					>
						<option value="">Seleccione un proyecto</option>
						{projects?.map((project) => (
							<option key={project.id} value={project.id}>
								{project.name}
							</option>
						))}
					</BcaSelect>

					<BcaDateTextField
						datatestid="page.transactions.closure.date"
						name="date"
						control={control}
						label="Fecha"
					/>

					<Box>
						<Button
							variant="contained"
							data-testid="page.transactions.closure.generate"
							startIcon={<SaveOutlined />}
							color="primary"
							onClick={handleSubmit(hadleSubmit)}
							type="submit"
							size="small"
						>
							Generar Cierre
						</Button>
					</Box>
				</Stack>
			</form>
			{open && (
				<ConfirmationDialog
					data-testid="page.transactions.closure.dialog"
					open={open}
					setOpen={setOpen}
					message={"Desea generar el cierre"}
					confirm={async () => {
						createClosureMuatation.mutate({ data: cierreData! });
					}}
				/>
			)}
		</>
	);
}
