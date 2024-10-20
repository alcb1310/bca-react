import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid'
import { InvoiceDetailsResponseType } from '../../../types/invoiceDetails'
import { DeleteOutlined } from '@mui/icons-material'

type AllDetailsTableProps = {
  data: any
}

export default function AllDetailsTable({ data }: AllDetailsTableProps) {
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
          onClick={() => console.log(params)}
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
