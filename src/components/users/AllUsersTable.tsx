import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import { DataGrid, GridColDef, GridActionsCellItem } from '@mui/x-data-grid';

import { useAllUsersQuery, useDeleteUserMutation, useMeQuery } from "../../redux/api/bca-backend/user/userSlice"

// TODO: Add confirmation message when deleting a user

export default function AllUsersTable() {
  const { data, isLoading } = useAllUsersQuery()
  const { data: me } = useMeQuery()
  const [deleteUser] = useDeleteUserMutation()

  if (isLoading) {
    return <div>Loading...</div>
  }

  const cols: GridColDef[] = [
    { field: "name", headerName: "Name", width: 300 },
    { field: "email", headerName: "Email", width: 300 },
    {
      field: "actions",
      type: "actions",
      width: 80,
      getActions: (params) => [
        <GridActionsCellItem
          icon=<EditOutlined color="warning" />
          label="Edit"
          onClick={() => {
            console.log(params)
          }}
        />,

        <GridActionsCellItem
          disabled={me?.id === params.row.id}
          icon=<DeleteOutline className={me?.id === params.row.id ? "text-red-200" : "text-red-500"} />
          label="Delete"
          onClick={() => { deleteUser(params.row.id) }}
        />,
      ]
    },
  ]

  return (
    <>
      <DataGrid
        rows={data || []}
        columns={cols}
        rowHeight={25}
        sx={{ '&, [class^=MuiDataGrid]': { border: 'none' } }}
        disableColumnFilter
        disableColumnResize
        hideFooterPagination={true}
        disableRowSelectionOnClick
        disableMultipleRowSelection
      />
    </>
  )
}
