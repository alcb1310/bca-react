import { DeleteOutline, EditOutlined } from '@mui/icons-material'
import { CircularProgress } from '@mui/material'
import {
  DataGrid,
  GridActionsCellItem,
  type GridColDef,
  type GridRowParams,
} from '@mui/x-data-grid'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'sonner'
import {
  useDeleteRubrosMaterialMutation,
  useGetAllRubrosMaterialsQuery,
} from '~/queries/parametros/rubro-materal'
import RubroMaterialsDrawer from '~components/drawers/Settings/RubroMaterial/RubroMaterialsDrawer'
import type {
  RubroMaterialResponseTye,
  RubroMaterialType,
} from '~types/rubro-material'

type AllRubrosMaterialsTableProps = {
  rubroId: string
}

export default function AllRubrosMaterialsTable({
  rubroId,
}: AllRubrosMaterialsTableProps) {
  const queryClient = useQueryClient()
  const [open, setOpen] = useState<boolean>(false)
  const [selectedRubroMaterial, setSelectedRubroMaterial] =
    useState<RubroMaterialType | null>(null)
  const { mutate: deleteRubroMaterial } = useMutation({
    mutationFn: useDeleteRubrosMaterialMutation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['item-materials'] })
      toast.success('Material eliminado')
    },
    onError: (error) => {
      toast.error(`Error al elimianar el material: ${error.message}`)
    },
  })

  const { data: materials, isFetching } = useQuery({
    queryKey: ['item-materials'],
    queryFn: () => useGetAllRubrosMaterialsQuery({ rubroId }),
  })

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
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          key={params.row.id}
          icon=<EditOutlined color='warning' />
          label='Editar'
          showInMenu
          onClick={() => {
            const dataToEdit: RubroMaterialType = {
              item_id: params.row.item.id,
              material_id: params.row.material.id,
              quantity: params.row.quantity,
            }

            setSelectedRubroMaterial(dataToEdit)
            setOpen(true)
          }}
        />,

        <GridActionsCellItem
          key={params.row.id}
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
      {isFetching && (
        <CircularProgress data-testid='component.rubros.materals.table.loading' />
      )}
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

      {open && (
        <RubroMaterialsDrawer
          open={open}
          onClose={() => setOpen(false)}
          defaultValues={selectedRubroMaterial!}
        />
      )}
    </>
  )
}
