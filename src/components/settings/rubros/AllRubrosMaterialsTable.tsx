import { useState } from 'react'
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
import { RubroMaterialResponseTye, RubroMaterialType } from '../../../types/rubro-material'
import RubroMaterialsDrawer from '../../drawers/Settings/RubroMaterial/RubroMaterialsDrawer'

type AllRubrosMaterialsTableProps = {
  rubroId: string
}

export default function AllRubrosMaterialsTable({
  rubroId,
}: AllRubrosMaterialsTableProps) {
  const [open, setOpen] = useState<boolean>(false)
  const [selectedRubroMaterial, setSelectedRubroMaterial] = useState<RubroMaterialType | null>(null)
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
    {
      field: 'quantity',
      headerName: 'Cantidad',
      width: 200,
      align: 'right',
      valueFormatter: (params: number) => {
        return params.toLocaleString('es-EC', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
      },
    },
    {
      field: 'actions',
      type: 'actions',
      width: 10,
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          icon=<EditOutlined color='warning' />
          label='Editar'
          showInMenu
          onClick={() => {
            const dataToEdit: RubroMaterialType = {
              item_id: params.row.item.id,
              material_id: params.row.material.id,
              quantity: params.row.quantity
            }

            setSelectedRubroMaterial(dataToEdit)
            setOpen(true)
          }}
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
    <>
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

      {
        open && (
          <RubroMaterialsDrawer
            open={open}
            onClose={() => setOpen(false)}
            defaultValues={selectedRubroMaterial!}
          />
        )
      }
    </>
  )
}
