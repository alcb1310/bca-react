import { Alert, Checkbox } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { SetBalancedInvoice } from "@/queries/reports";
import type { InvoiceResponseType } from "@/types/invoice";
import type { BalanceResponseType } from "@/types/reports";

type BalanceTableProps = {
	data: BalanceResponseType;
};

export default function BalanceTable({ data }: BalanceTableProps) {
	const queryClient = useQueryClient();
	const [alert, setAlert] = useState<boolean>(false);
	const [msg, setMsg] = useState<string>("");

	const setBalanceInvoice = useMutation({
		mutationFn: SetBalancedInvoice,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["balance"],
			});
		},
		onError: (error) => {
			setMsg(error.message);
			setAlert(true);
		},
	});

	async function handleClick(data: InvoiceResponseType) {
		setAlert(false);
		setBalanceInvoice.mutate({ invoice_id: data.id });
	}

	const cols: GridColDef<InvoiceResponseType>[] = [
		{
			field: "is_balaced",
			headerName: "",
			width: 55,
			hideable: false,
			renderCell(params) {
				return (
					<Checkbox
						checked={params.row.is_balanced}
						size="small"
						onClick={() => handleClick(params.row)}
						sx={{ mt: -1 }}
						inputProps={{ "aria-label": "isBalanced" }}
					/>
				);
			},
		},
		{
			field: "date",
			headerName: "Fecha",
			width: 100,
			hideable: false,
			valueGetter: (_value, row) => {
				const dt = new Date(row.invoice_date);
				return dt.toLocaleDateString("es-EC", {
					year: "numeric",
					month: "2-digit",
					day: "2-digit",
				});
			},
		},
		{
			field: "supplier",
			headerName: "Proveedor",
			width: 400,
			hideable: false,
			renderCell: (params) => {
				return params.row.supplier.name;
			},
		},
		{
			field: "invoice_number",
			headerName: "Factura",
			width: 200,
			hideable: false,
		},
		{
			field: "invoice_total",
			headerName: "Total",
			width: 150,
			hideable: false,
			align: "right",
			renderCell: (params) => {
				return params.row.invoice_total.toLocaleString("es-EC", {
					minimumFractionDigits: 2,
					maximumFractionDigits: 2,
				});
			},
		},
	];

	return (
		<>
			{alert && (
				<Alert severity="error" onClose={() => setAlert(false)}>
					{msg}
				</Alert>
			)}
			<DataGrid
				columns={cols}
				rows={data?.invoices}
				rowHeight={25}
				pageSizeOptions={[]}
				disableColumnFilter
				disableColumnMenu
				disableColumnResize
				disableRowSelectionOnClick
				disableMultipleRowSelection
				hideFooter
				sx={{
					"&, [class^=MuiDataGrid]": { border: "none" },
				}}
			/>
		</>
	);
}
