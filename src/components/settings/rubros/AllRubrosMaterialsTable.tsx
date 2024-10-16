import { DeleteOutline, EditOutlined } from '@mui/icons-material'
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowParams,
} from '@mui/x-data-grid'
import {
  useDeleteRubrosMaterialMutation,
  useGetAllRubrosMaterialsQuery,
} from '../../../redux/api/bca-backend/parametros/rubroMaterialSlice'
import { RubroMaterialResponseTye } from '../../../types/rubro-material'

type AllRubrosMaterialsTableProps = {
  rubroId: string
}

export default function AllRubrosMaterialsTable({
  rubroId,
}: AllRubrosMaterialsTableProps) {
  const { data: materials } = useGetAllRubrosMaterialsQuery(rubroId!)
  const [deleteRubroMaterial] = useDeleteRubrosMaterialMutation()

  const cols: GridColDef<RubroMaterialResponseTye>[] = [
    {
      field: 'code',
      headerName: 'Código',
      width: 100,
      valueGetter: (_value, row) => row.material.code,
    },
    {
      field: 'name',
      headerName: 'Nombre',
      width: 400,
      valueGetter: (_value, row) => row.material.name,
    },
    {
      field: 'unit',
      headerName: 'Unidad',
      width: 100,
      align: 'center',
      valueGetter: (_value, row) => row.material.unit,
    },
    { field: 'quantity', headerName: 'Cantidad', width: 200, align: 'right' },
    {
      field: 'actions',
      type: 'actions',
      width: 10,
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          icon=<EditOutlined color='warning' />
          label='Editar'
          showInMenu
          onClick={() => console.log(params.row)}
        />,

        <GridActionsCellItem
          icon=<DeleteOutline color='error' />
          label='Borrar'
          showInMenu
          onClick={() => {
            deleteRubroMaterial({
              rubroId: params.row.item.id,
              materialId: params.row.material.id,
            })
          }}
        />,
      ],
    },
  ]

  return (
    <DataGrid
      columns={cols}
      rows={materials!}
      getRowId={(row) => row.material.id!}
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
