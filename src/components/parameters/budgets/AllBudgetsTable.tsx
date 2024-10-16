import { DataGrid, GridActionsCellItem, GridColDef, GridColumnGroupingModel, GridRowParams } from "@mui/x-data-grid";
import { BudgetResponseType } from "../../../types/budget";
import { EditOutlined } from "@mui/icons-material";

type AllBudgetsTableProps = {
  data: BudgetResponseType[]
}

export default function AllBudgetsTable({
  data,
}: AllBudgetsTableProps) {
  const cols: GridColDef[] = [
    { field: 'project_name', headerName: 'Proyecto', width: 180, hideable: false },
    { field: 'budget_item_name', headerName: 'Partida', width: 380, hideable: false },
    { field: 'initial_quantity', headerName: 'Cant. Inicial', width: 180 },
    { field: 'initial_cost', headerName: 'Costo Inicial', width: 180 },
    { field: 'initial_total', headerName: 'Total Inicial', width: 180 },
    { field: 'spent_quantity', headerName: 'Cant. Gastada', width: 180 },
    { field: 'spent_total', headerName: 'Total Gastado', width: 180 },
    { field: 'remaining_quantity', headerName: 'Cant. Disponible', width: 180 },
    { field: 'remaining_cost', headerName: 'Costo Disponible', width: 180 },
    { field: 'remaining_total', headerName: 'Total Disponible', width: 180 },
    { field: 'updated_budget', headerName: 'Presupuesto Actualizado', width: 180, hideable: false },
    {
      field: 'actions',
      type: 'actions',
      width: 10,
      getActions: (params: GridRowParams<BudgetResponseType>) => [<GridActionsCellItem
        icon=<EditOutlined color="warning" />
        label="Editar"
        onClick={() => {
          console.log(params)
        }}
      />
      ]
    }
  ]

  const groupingModel: GridColumnGroupingModel = [
    { groupId: 'global', headerName: '', children: [{ field: 'project_id' }, { field: 'budget_item_id' }] },
    { groupId: 'Iniciales', headerAlign: 'center', children: [{ field: 'initial_quantity' }, { field: 'initial_cost' }, { field: 'initial_total' }] },
    { groupId: 'Gastados', headerAlign: 'center', children: [{ field: 'spent_quantity' }, { field: 'spent_total' }] },
    { groupId: 'Por Gastar', headerAlign: 'center', children: [{ field: 'remaining_quantity' }, { field: 'remaining_cost' }, { field: 'remaining_total' }] },
    { groupId: 'Presupuesto Actualizado', headerName: '', children: [{ field: 'updated_budget' }] },
  ]

  return (
    <>
      <DataGrid
        columns={cols}
        rows={data}
        getRowId={(row) => row.id}
        rowHeight={25}
        disableColumnFilter
        disableColumnResize
        disableRowSelectionOnClick
        disableMultipleRowSelection
        columnGroupingModel={groupingModel}
        sx={{ '&, [class^=MuiDataGrid]': { border: 'none' } }}
        pagination
        initialState={{
          pagination: {
            paginationModel: { pageSize: 25 },
          },
          columns: {
            columnVisibilityModel: {
              initial_quantity: false,
              initial_cost: false,
              initial_total: false,
              spent_quantity: false,
              spent_total: false,
            }
          }
        }}

      />
    </>
  )
}
