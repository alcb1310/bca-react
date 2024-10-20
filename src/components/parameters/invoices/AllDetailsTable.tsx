import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid'
import { InvoiceDetailsResponseType } from '../../../types/invoiceDetails'
import { DeleteOutlined } from '@mui/icons-material'
import { useDeleteInvoiceDetailsMutation } from '../../../redux/api/bca-backend/transacciones/invoiceDetailsSlice'

type AllDetailsTableProps = {
  data: InvoiceDetailsResponseType[]
  invoiceId: string
}

export default function AllDetailsTable({
  data,
  invoiceId,
}: AllDetailsTableProps) {
  const [deleteDetail] = useDeleteInvoiceDetailsMutation()

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
          icon={<DeleteOutlined color='error' />}
          label='Borrar'
          onClick={() =>
            deleteDetail({
              invoiceId,
              detailId: params.row.budget_item_id,
            })
          }
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
