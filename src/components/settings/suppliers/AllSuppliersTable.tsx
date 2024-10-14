import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowParams,
} from '@mui/x-data-grid'

import { SupplierType } from '../../../types/supplier'
import { EditOutlined } from '@mui/icons-material'
import SupplierDrawer from '../../drawers/Settings/Suppliers/SupplierDrawer'

type AllSuppliersTableProps = {
  data: SupplierType[]
}

export default function AllSuppliersTable({ data }: AllSuppliersTableProps) {
  const cols: GridColDef<SupplierType>[] = [
    { field: 'supplier_id', headerName: 'RUC', width: 130 },
    { field: 'name', headerName: 'Nombre', width: 270 },
    {
      field: 'contact_name',
      headerName: 'Nombre Contacto',
      width: 200,
      // @ts-expect-error String is a property of the object
      valueGetter: (row) => row.String,
    },
    {
      field: 'contact_email',
      headerName: 'Email Contacto',
      width: 200,
      // @ts-expect-error String is a property of the object
      valueGetter: (row) => row.String,
    },
    {
      field: 'contact_phone',
      headerName: 'Telefono Contacto',
      width: 200,
      // @ts-expect-error String is a property of the object
      valueGetter: (row) => row.String,
    },
    {
      field: 'actions',
      type: 'actions',
      width: 10,
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          icon=<EditOutlined color='warning' />
          label='Edit'
          onClick={() => {
            EditSupplier(params.row)
          }}
        />,
      ],
    },
  ]

  return (
    <>
      <DataGrid
        rows={data}
        columns={cols}
        getRowId={(row) => row.id!}
        rowHeight={25}
        disableColumnFilter
        disableColumnResize
        disableRowSelectionOnClick
        disableMultipleRowSelection
        sx={{ '&, [class^=MuiDataGrid]': { border: 'none' } }}
        pagination
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 25,
            },
          },
        }}
      />
    </>
  )
}
