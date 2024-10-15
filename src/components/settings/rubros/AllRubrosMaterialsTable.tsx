import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import { DataGrid, GridActionsCellItem, GridColDef, GridRowParams } from "@mui/x-data-grid";


export default function AllRubrosMaterialsTable() {
  const cols: GridColDef[] = [
    { field: "code", headerName: "Código", width: 100 },
    { field: "name", headerName: "Nombre", width: 400 },
    { field: "unit", headerName: "Unidad", width: 100 },
    { field: "quantity", headerName: "Cantidad", width: 200 },
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
          onClick={() => console.log(params.row)}
        />,
      ],
    }
  ]

return (
  <DataGrid
    columns={cols}
    rows={[]}
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
)
}
