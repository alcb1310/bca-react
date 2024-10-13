import { EditOutlined } from "@mui/icons-material";
import { DataGrid, GridActionsCellItem, GridColDef, GridRowParams } from "@mui/x-data-grid";

export default function AllCategoriesTable() {
  const cols: GridColDef[] = [
    {
      field: "name",
      headerName: "Categoría",
      width: 300,
    },
    {
      field: "actions",
      type: "actions",
      width: 10,
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          icon=<EditOutlined color="warning" />
          label="Edit"
          onClick={() => {console.log(params.row)}}
        />,
      ],
    }
  ]

  return (
    <>
      <DataGrid
        rows={[]}
        columns={cols}
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
              pageSize: 25
            }
          },
        }}
      />
    </>
  )
}
