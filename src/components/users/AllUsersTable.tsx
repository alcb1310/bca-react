import { useState } from "react";
import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import { DataGrid, GridColDef, GridActionsCellItem } from '@mui/x-data-grid';

import { useAllUsersQuery, useDeleteUserMutation, useMeQuery } from "../../redux/api/bca-backend/user/userSlice"
import ConfirmationDialog from "../dialog/ConfirmationDialog";

export default function AllUsersTable() {
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState<boolean>(false)
  const [userIdToDelete, setUserIdToDelete] = useState<string>("")
  const [message, setMessage] = useState<string>("")

  const { data, isLoading } = useAllUsersQuery()
  const { data: me } = useMeQuery()
  const [deleteUser] = useDeleteUserMutation()

  function setOpenConfirmationDialog(open: boolean, id: string, name: string) {
    setUserIdToDelete(id)
    setConfirmationDialogOpen(open)
    setMessage(`Seguro que quieres borrar al usuario ${name}?`)
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  const cols: GridColDef[] = [
    { field: "name", headerName: "Name", width: 300, resizable: true },
    { field: "email", headerName: "Email", width: 300, resizable: false },
    {
      field: "actions",
      type: "actions",
      width: 10,
      resizable: false,
      getActions: (params) => [
        <GridActionsCellItem
          icon=<EditOutlined color="warning" />
          showInMenu
          label="Edit"
          onClick={() => { console.log(params.row) }}
        />,


        <GridActionsCellItem
          disabled={me?.id === params.row.id}
          icon=<DeleteOutline className={me?.id === params.row.id ? "text-red-200" : "text-red-500"} />
          label="Delete"
          showInMenu
          onClick={() => { setOpenConfirmationDialog(true, params.row.id, params.row.name) }}
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
      {confirmationDialogOpen && <ConfirmationDialog message={message} confirm={() => { deleteUser(userIdToDelete) }} />}
    </>
  )
}
