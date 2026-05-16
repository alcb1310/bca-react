import { DeleteInvoice } from '@/queries/transacciones/invoice'
import type { InvoiceResponseType } from '@/types/invoice'
import { DeleteOutlined, EditOutlined } from '@mui/icons-material'
import {
    DataGrid,
    GridActionsCellItem,
    type GridColDef,
    type GridRowParams,
} from '@mui/x-data-grid'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

type AllInvoicesTableProps = {
    data: InvoiceResponseType[]
}

export default function AllInvoicesTable({ data }: AllInvoicesTableProps) {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const deleteInvoiceMutation = useMutation({
        mutationFn: DeleteInvoice,
        onSuccess: () => {
            toast.success('Factura eliminada exitosamente')
        },
        onError: (error) => {
            toast.error(`Error al eliminar la factura: ${error.message}`)
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['invoices'] })
        },
    })

    const cols: GridColDef<InvoiceResponseType>[] = [
        {
            field: 'invoice_date',
            headerName: 'Fecha',
            width: 100,
            valueGetter: (_value, row) => {
                const dt = new Date(row.invoice_date)
                return dt.toLocaleDateString('es-EC', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                })
            },
        },
        {
            field: 'project_name',
            headerName: 'Proyecto',
            width: 200,
            renderCell: (params) => params.row.project.name,
        },
        {
            field: 'supplier_name',
            headerName: 'Proveedor',
            width: 300,
            renderCell: (params) => params.row.supplier.name,
        },
        {
            field: 'invoice_number',
            headerName: 'Número',
            width: 200,
        },
        {
            field: 'invoice_total',
            headerName: 'Total',
            width: 200,
            align: 'right',
            valueFormatter: (params: number) => {
                return params.toLocaleString('es-EC', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                })
            },
        },
        {
            field: 'actions',
            type: 'actions',
            width: 10,
            getActions: (params: GridRowParams<InvoiceResponseType>) => [
                <GridActionsCellItem
                    key={params.id}
                    icon={<EditOutlined color='warning' />}
                    label='Editar'
                    showInMenu
                    onClick={() => navigate(`/transacciones/facturas/${params.id}`)}
                />,

                <GridActionsCellItem
                    key={params.id}
                    icon=<DeleteOutlined color='error' />
                    label='Borrar'
                    showInMenu
                    onClick={async () => {
                        deleteInvoiceMutation.mutate({ id: params.id as string })
                    }}
                />,
            ],
        },
    ]

    return (
        <DataGrid
            rows={data}
            columns={cols}
            getRowId={(row) => row.id}
            rowHeight={25}
            disableColumnFilter
            disableColumnResize
            disableRowSelectionOnClick
            disableMultipleRowSelection
            sx={{ '&, [class^=MuiDataGrid]': { border: 'none' } }}
            pagination
            initialState={{
                pagination: {
                    paginationModel: { pageSize: 25 },
                },
            }}
        />
    )
}
