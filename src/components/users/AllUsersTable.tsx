import { useState } from "react";
import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import { DataGrid, GridColDef, GridActionsCellItem, GridRowParams } from '@mui/x-data-grid';

import { useAllUsersQuery, useDeleteUserMutation, useMeQuery } from "../../redux/api/bca-backend/user/userSlice"
import ConfirmationDialog from "../dialog/ConfirmationDialog";
import UsersDrawer from "../drawers/Users/UsersDrawer";
import { UserResponse } from "../../types/user";

export default function AllUsersTable() {
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState<boolean>(false)
  const [userIdToDelete, setUserIdToDelete] = useState<string>("")
  const [message, setMessage] = useState<string>("")
  const [openUserDrawer, setOpenUserDrawer] = useState<boolean>(false)
  const [userData, setUserData] = useState<UserResponse | null>(null)


  const { data, isLoading } = useAllUsersQuery()
  const { data: me } = useMeQuery()
  const [deleteUser] = useDeleteUserMutation()

  function setOpenConfirmationDialog(open: boolean, id: string, name: string) {
    setUserIdToDelete(id)
    setConfirmationDialogOpen(open)
    setMessage(`Seguro que quieres borrar al usuario ${name}?`)
  }

  function setOpenUserDrawerWindow(open: boolean, userData: UserResponse) {
    setUserData(userData)
    setOpenUserDrawer(open)
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  const cols: GridColDef[] = [
    { field: "name", headerName: "Name", width: 300 },
    { field: "email", headerName: "Email", width: 300 },
    {
      field: "actions",
      type: "actions",
      width: 10,
      getActions: (params: GridRowParams<UserResponse>) => [
        <GridActionsCellItem
          icon=<EditOutlined color="warning" />
          label="Edit"
          onClick={() => { setOpenUserDrawerWindow(true, params.row) }}
          showInMenu
        />,

        <GridActionsCellItem
          disabled={me?.id === params.row.id}
          icon=<DeleteOutline className="text-red-500" />
          showInMenu
          label="Delete"
          onClick={() => { setOpenConfirmationDialog(true, params.row.id, params.row.name) }}
          sx={{
            visibility: me?.id === params.row.id ? 'hidden' : 'visible',
          }}
        />
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
      {openUserDrawer && <UsersDrawer open={openUserDrawer} onClose={() => setOpenUserDrawer(false)} userData={userData!} />}
    </>
  )
}
