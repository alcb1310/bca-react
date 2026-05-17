import { zodResolver } from "@hookform/resolvers/zod";
import { CircularProgress, Grid2, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import BcaDateTextField from "@/components/input/BcaDateTextField";
import BcaSelect from "@/components/input/BcaSelect";
import BalanceTable from "@/components/reports/BalanceTable";
import EditToolbar from "@/components/table/headers/toolbar";
import PageTitle from "@/components/titles/PageTitle";
import { GetAllProjects } from "@/queries/parametros/projects";
import { GetBalanceReport } from "@/queries/reports";
import { useAppSelector } from "@/redux/hooks";
import { normalizeDate } from "@/utils/date";
import { downloadExcelFile } from "@/utils/download";

const reportSchema = z.object({
	project_id: z
		.string({ message: "Seleccione un proyecto" })
		.uuid("Seleccione un proyecto"),
	date: z.coerce.date({ message: "Seleccione una fecha" }),
});

type ReportType = z.infer<typeof reportSchema>;

export default function Balance() {
	const { control, handleSubmit } = useForm<ReportType>({
		defaultValues: {
			project_id: "",
			date: new Date(),
		},
		resolver: zodResolver(reportSchema),
	});

	const [selectedData, setSelectedData] = useState({
		project_id: "",
		date: "",
	});
	const { data: projects } = useQuery({
		queryKey: ["projects"],
		queryFn: () => GetAllProjects({ active: true }),
	});

	const { data, isFetching } = useQuery({
		queryKey: ["balance", selectedData.project_id, selectedData.date],
		queryFn: () =>
			GetBalanceReport({
				project_id: selectedData.project_id,
				date: selectedData.date,
			}),
		enabled: selectedData.project_id !== "" && selectedData.date !== "",
	});

	const token = useAppSelector((state) => state.login.token);

	function generateReport(data: ReportType) {
		setSelectedData({
			project_id: data.project_id,
			date: normalizeDate(data.date),
		});
	}

	async function exportReport(data: ReportType) {
		const url = import.meta.env.VITE_BACKEND_SERVER;
		const date = normalizeDate(data.date);
		const res = await fetch(
			`${url}/reportes/excel/cuadre?project=${data.project_id}&date=${date}`,
			{
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);

		const blob = await res.blob();
		const filename =
			res.headers.get("Content-Disposition")?.split("filename=")[1] ||
			"excel-file.xlsx";

		downloadExcelFile(blob, filename);
	}

	return (
		<>
			<PageTitle title="Cuadre" />

			<form>
				<Stack width="50%" direction="column" spacing={2} mx="auto" mt={2}>
					<BcaSelect
						datatestid="page.reports.balance.project"
						name="project_id"
						label="Proyecto"
						control={control}
					>
						<option value="">Seleccione un proyecto</option>
						{projects?.map((project) => (
							<option key={project.id} value={project.id}>
								{project.name}
							</option>
						))}
					</BcaSelect>
					<Stack direction="row" spacing={2}>
						<BcaDateTextField
							datatestid="page.reports.balance.date"
							name="date"
							label="Fecha"
							control={control}
						/>
					</Stack>

					<EditToolbar
						title="Generar"
						onClick={handleSubmit(generateReport)}
						hasExportButton
						exportClick={handleSubmit(exportReport)}
					/>
				</Stack>
			</form>
			{isFetching && (
				<CircularProgress data-testid="page.reports.balance.loading" />
			)}

			{!!data && (
				<Grid2 container spacing={2} mt={2}>
					<Typography variant="body1" component="h5" textAlign="left" pl={8}>
						Total:{" "}
						<Typography
							variant="body1"
							fontWeight="bold"
							component="span"
							sx={{ color: "success.main" }}
						>
							{data.total.toLocaleString("es-EC", {
								minimumFractionDigits: 2,
								maximumFractionDigits: 2,
							})}
						</Typography>
					</Typography>
				</Grid2>
			)}

			<BalanceTable data={data!} />

			{!!data && (
				<Grid2 container spacing={2} mt={2}>
					<Typography variant="body1" component="h5" textAlign="left" pl={8}>
						Total:{" "}
						<Typography
							variant="body1"
							fontWeight="bold"
							component="span"
							sx={{ color: "success.main" }}
						>
							{data.total.toLocaleString("es-EC", {
								minimumFractionDigits: 2,
								maximumFractionDigits: 2,
							})}
						</Typography>
					</Typography>
				</Grid2>
			)}
		</>
	);
}
