import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { BalanceResponseType } from '../../types/reports'
import { InvoiceResponseType } from '../../types/invoice'

type BalanceTableProps = {
  data: BalanceResponseType
}

export default function BalanceTable({ data }: BalanceTableProps) {
  const cols: GridColDef<InvoiceResponseType>[] = [
    {
      field: 'date',
      headerName: 'Feccha',
      width: 100,
      hideable: false,
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
      rows={data?.invoices}
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
