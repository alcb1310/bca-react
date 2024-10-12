import { ClearOutlined, Done, EditOutlined } from "@mui/icons-material";
import { DataGrid, GridActionsCellItem, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { BudgetItem } from "../../../types/partidas";

type AllBudgetItemsTableProps = {
  allBudgetItems: BudgetItem[]
}

export default function AllBudgetItemsTable({
  allBudgetItems,
}: AllBudgetItemsTableProps) {

  const cols: GridColDef[] = [
    { field: "code", headerName: "Código", width: 120 },
    { field: "name", headerName: "Nombre", width: 500 },
    { field: "level", headerName: "Nivel", width: 70, disableColumnMenu: true, align: "center" },
    {
      field: "accumulate",
      headerName: "Acumula",
      width: 90,
      disableColumnMenu: true,
      align: "center",
      renderCell: (params) => {
        return params.row.accumulate ? <Done sx={{ fontSize: "0.95rem" }} /> : <ClearOutlined sx={{ fontSize: "0.95rem" }} />
      },
    },
    {
      field: "parent_code",
      headerName: "Padre",
      width: 120,
      valueGetter: (_value, row) => {
        return row.parent?.code
      },
    },
    {
      field: "actions",
      type: "actions",
      width: 10,
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          icon=<EditOutlined color="warning" />
          label="Edit"
          onClick={() => { console.dir(params.row) }}
          sx={{
            visibility: params.row.id === 0 ? 'hidden' : 'visible'
          }}
        />,
      ]
    }
  ]
  return (
    <>
      <DataGrid
        rows={allBudgetItems}
        rowHeight={25}
        getRowId={(row) => row.id}
        columns={cols}
        disableColumnFilter
        disableColumnResize
        disableRowSelectionOnClick
        disableMultipleRowSelection
        sx={{ '&, [class^=MuiDataGrid]': { border: 'none' } }}
        pagination
        initialState={{ pagination: { paginationModel: { pageSize: 25 } } }}
      />
    </>
  )
}
