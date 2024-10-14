import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowParams,
} from '@mui/x-data-grid'
import { RubrosType } from '../../../types/rubros'
import { EditOutlined } from '@mui/icons-material'

type AllRubrosTableProps = {
  data: RubrosType[]
}

export default function AllRubrosTable({ data }: AllRubrosTableProps) {
  const cols: GridColDef<RubrosType>[] = [
    { field: 'code', headerName: 'Código', width: 200 },
    { field: 'name', headerName: 'Nombre', width: 400 },
    { field: 'unit', headerName: 'Unit', width: 200 },
    {
      field: 'actions',
      type: 'actions',
      width: 10,
      getActions: (params: GridRowParams<RubrosType>) => [
        <GridActionsCellItem
          icon=<EditOutlined color='warning' />
          label='Edit'
          onClick={() => console.log(params.row)}
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
            paginationModel: { pageSize: 25 },
          },
        }}
      />
    </>
  )
}
