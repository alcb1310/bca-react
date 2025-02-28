import { Button, CircularProgress } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

import { useGetSpentDetailsQuery } from '@redux/api/bca-backend/reports/commonSlice'
import DrawerTitle from '@/components/titles/DrawerTitle/DrawerTitle'
import BcaDrawer from '@components/drawers/BcaDrawer/BcaDrawer'
import { Spent, SpentDetailsType } from '@/types/reports'

type SpentDetailsDrawerProps = {
  setOpen: () => void
  open: boolean
  selectedData: Spent
  selectedProject: string
  selectedDate: string
}

export default function SpentDetailsDrawer({
  setOpen,
  open,
  selectedData,
  selectedProject,
  selectedDate,
}: SpentDetailsDrawerProps) {
  const { data, isLoading } = useGetSpentDetailsQuery({
    project_id: selectedProject,
    budget_item_id: selectedData.budget_item.id!,
    date: selectedDate,
  })

  const cols: GridColDef<SpentDetailsType>[] = [
    {
      field: 'date',
      headerName: 'Fecha',
      width: 80,
      renderCell(params) {
        const date = new Date(params.row.invoice_date)
        return date.toLocaleDateString('es-EC')
      },
    },
    {
      field: 'supplier_name',
      headerName: 'Proveedor',
      width: 140,
    },
    {
      field: 'invoice_number',
      headerName: 'Factura',
      width: 140,
    },
    {
      field: 'total',
      headerName: 'Total',
      width: 80,
      align: 'right',
      valueFormatter: (params: number) => {
        return params.toLocaleString('es-EC', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      },
    },
  ]

  return (
    <>
      {isLoading && (
        <CircularProgress data-testid='component.drawers.reporst.spent.detail.loading' />
      )}
      <BcaDrawer open={open} onClose={setOpen} width='500px'>
        <DrawerTitle title='Reporte de gastos' close={setOpen} />

        <DataGrid
          columns={cols}
          rows={data}
          rowHeight={25}
          getRowId={(row) => {
            return row.invoice_id + '-' + row.budget_item_id
          }}
          pageSizeOptions={[]}
          disableColumnFilter
          disableColumnMenu
          disableColumnResize
          disableRowSelectionOnClick
          disableMultipleRowSelection
          hideFooter
          sx={{
            '&, [class^=MuiDataGrid]': { border: 'none' },
          }}
        />

        <Button
          variant='contained'
          data-testid='component.drawers.reports.spent.detail.close'
          onClick={setOpen}
          color='primary'
          size='small'
          sx={{
            width: '100%',
            marginTop: 2,
          }}
        >
          Cerrar
        </Button>
      </BcaDrawer>
    </>
  )
}
