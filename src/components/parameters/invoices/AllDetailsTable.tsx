import { DeleteInvoiceDetail } from '@/queries/transacciones/invoiceDetails'
import type { InvoiceDetailsResponseType } from '@/types/invoiceDetails'
import { DeleteOutlined } from '@mui/icons-material'
import {
    DataGrid,
    GridActionsCellItem,
    type GridColDef,
} from '@mui/x-data-grid'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

type AllDetailsTableProps = {
    data: InvoiceDetailsResponseType[]
    invoiceId: string
}

export default function AllDetailsTable({
    data,
    invoiceId,
}: AllDetailsTableProps) {
    const queryClient = useQueryClient()
    const useDeleteDetailMutation = useMutation({
        mutationFn: DeleteInvoiceDetail,
        onSuccess: async () => {
            toast.success('Detalle borrado exitosamente')

            await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: ['details', invoiceId],
                }),
                queryClient.invalidateQueries({
                    queryKey: ['invoice', invoiceId],
                }),
            ])
        },
        onError: (error) => {
            toast.error(`Error al borrar el detalle: ${error.message}`)
        },
    })

    const cols: GridColDef<InvoiceDetailsResponseType>[] = [
        {
            field: 'budget_item_code',
            headerName: 'Codigo',
            width: 120,
        },
        {
            field: 'budget_item_name',
            headerName: 'Nombre',
            width: 500,
        },
        {
            field: 'quantity',
            headerName: 'Cantidad',
            width: 150,
            align: 'right',
            valueFormatter: (params: number) => {
                return params.toLocaleString('es-EC', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                })
            },
        },
        {
            field: 'cost',
            headerName: 'Costo',
            width: 150,
            align: 'right',
            valueFormatter: (params: number) => {
                return params.toLocaleString('es-EC', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                })
            },
        },
        {
            field: 'total',
            headerName: 'Total',
            width: 150,
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
            getActions: (params) => [
                <GridActionsCellItem
                    key={params.id}
                    icon={<DeleteOutlined color='error' />}
                    label='Borrar'
                    onClick={async () => {
                        useDeleteDetailMutation.mutate({
                            invoiceId,
                            detailId: params.row.budget_item_id,
                        })
                    }}
                />,
            ],
        },
    ]

    return (
        <DataGrid
            rows={data}
            columns={cols}
            getRowId={(row) => row.budget_item_id}
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
