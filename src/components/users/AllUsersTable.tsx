import { DeleteOutline, EditOutlined } from '@mui/icons-material'
import { CircularProgress } from '@mui/material'
import {
  DataGrid,
  GridActionsCellItem,
  type GridColDef,
  type GridRowParams,
} from '@mui/x-data-grid'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useGetAllUsersQuery, useMeQuery } from '~/queries/user/user'
import { useAppSelector } from '~/redux/hooks'
import ConfirmationDialog from '~components/dialog/ConfirmationDialog'
import UsersDrawer from '~components/drawers/Users/UsersDrawer'
import { useDeleteUserMutation } from '~redux/api/bca-backend/user/userSlice'
import type { UserResponse } from '~types/user'

export default function AllUsersTable() {
  const token = useAppSelector((state) => state.login.token)
  const [confirmationDialogOpen, setConfirmationDialogOpen] =
    useState<boolean>(false)
  const [userIdToDelete, setUserIdToDelete] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [openUserDrawer, setOpenUserDrawer] = useState<boolean>(false)
  const [userData, setUserData] = useState<UserResponse | null>(null)

  const { data, isFetching } = useQuery({
    queryKey: ['users'],
    queryFn: () => useGetAllUsersQuery({ token }),
  })
  const { data: me } = useQuery({
    queryKey: ['users', 'me'],
    queryFn: () => useMeQuery({ token }),
  })
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

  if (isFetching) {
    return <CircularProgress data-testid='component.users.table.loading' />
  }

  const cols: GridColDef[] = [
    { field: 'name', headerName: 'Nombre', width: 300 },
    { field: 'email', headerName: 'Email', width: 300 },
    {
      field: 'actions',
      type: 'actions',
      width: 10,
      getActions: (params: GridRowParams<UserResponse>) => [
        <GridActionsCellItem
          key={params.row.id}
          icon=<EditOutlined color='warning' />
          label='Edit'
          onClick={() => {
            setOpenUserDrawerWindow(true, params.row)
          }}
          showInMenu
        />,

        <GridActionsCellItem
          key={params.row.id}
          disabled={me?.id === params.row.id}
          icon=<DeleteOutline color='error' />
          showInMenu
          label='Delete'
          onClick={() => {
            setOpenConfirmationDialog(true, params.row.id, params.row.name)
          }}
          sx={{
            visibility: me?.id === params.row.id ? 'hidden' : 'visible',
          }}
        />,
      ],
    },
  ]

  return (
    <>
      <DataGrid
        rows={data || []}
        getRowId={(row) => row.id}
        columns={cols}
        rowHeight={25}
        sx={{ '&, [class^=MuiDataGrid]': { border: 'none' } }}
        disableColumnFilter
        disableColumnResize
        hideFooterPagination={true}
        disableRowSelectionOnClick
        disableMultipleRowSelection
      />
      {confirmationDialogOpen && (
        <ConfirmationDialog
          open={confirmationDialogOpen}
          setOpen={setConfirmationDialogOpen}
          message={message}
          confirm={() => {
            deleteUser(userIdToDelete)
          }}
        />
      )}
      {openUserDrawer && (
        <UsersDrawer
          open={openUserDrawer}
          onClose={() => setOpenUserDrawer(false)}
          userData={userData!}
        />
      )}
    </>
  )
}
