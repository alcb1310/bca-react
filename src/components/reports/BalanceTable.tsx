import { DataGrid, GridColDef } from '@mui/x-data-grid'

type BalanceTableProps = {
  data: any[]
}

export default function BalanceTable({ data }: BalanceTableProps) {
  const cols: GridColDef[] = [
    {
      field: 'date',
      headerName: 'Feccha',
      width: 100,
      hideable: false,
    },
    {
      field: 'supplier',
      headerName: 'Proveedor',
      width: 400,
      hideable: false,
      renderCell: (params) => {
        return params.row.supplier.name
      },
    },
    {
      field: 'invoice_number',
      headerName: 'Factura',
      width: 200,
      hideable: false,
    },
    {
      field: 'invoice_total',
      headerName: 'Total',
      width: 150,
      hideable: false,
    },
  ]

  return (
    <DataGrid
      columns={cols}
      rows={data}
      rowHeight={25}
      pageSizeOptions={[]}
      disableColumnFilter
      disableColumnMenu
      disableColumnResize
      disableRowSelectionOnClick
      disableMultipleRowSelection
      sx={{ '&, [class^=MuiDataGrid]': { border: 'none' } }}
    />
  )
}
