import { DeleteOutlined } from '@mui/icons-material'
import {
  DataGrid,
  GridActionsCellItem,
  type GridColDef,
} from '@mui/x-data-grid'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useDeleteInvoiceDetailsMutation } from '~/queries/transacciones/detalle'
import { useAppSelector } from '~/redux/hooks'
import type { InvoiceDetailsResponseType } from '~types/invoiceDetails'

type AllDetailsTableProps = {
  data: InvoiceDetailsResponseType[]
  invoiceId: string
}

export default function AllDetailsTable({
  data,
  invoiceId,
}: AllDetailsTableProps) {
  const token = useAppSelector((state) => state.login.token)
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: useDeleteInvoiceDetailsMutation,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['invoice', invoiceId] })
      queryClient.invalidateQueries({ queryKey: ['details'] })
    },
    onError: (error) => {
      toast.error(`Error al borrar el detalle: ${error.message}`)
    },
    onSuccess: () => {
      toast.success('Detalle borrado')
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
          key={params.row.id}
          icon={<DeleteOutlined color='error' />}
          label='Borrar'
          onClick={() =>
            mutate({ token, invoiceId, detailId: params.row.budget_item_id })
          }
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
