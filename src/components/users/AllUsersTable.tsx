import ConfirmationDialog from '@/components/dialog/ConfirmationDialog'
import UsersDrawer from '@/components/drawers/Users/UsersDrawer'
import { DeleteUser, GetAllUsers, Me } from '@/queries/users'
import type { UserResponse } from '@/types/user'
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

export default function AllUsersTable() {
    const queryClient = useQueryClient()
    const [confirmationDialogOpen, setConfirmationDialogOpen] =
        useState<boolean>(false)
    const [userIdToDelete, setUserIdToDelete] = useState<string>('')
    const [message, setMessage] = useState<string>('')
    const [openUserDrawer, setOpenUserDrawer] = useState<boolean>(false)
    const [userData, setUserData] = useState<UserResponse | null>(null)

    const { data, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: () => GetAllUsers(),
    })
    const { data: me } = useQuery({
        queryKey: ['me'],
        queryFn: () => Me(),
    })

    const deleteUserMutation = useMutation({
        mutationFn: DeleteUser,
        onSuccess: () => {
            toast.success('Usuario borrado exitosamente')
            queryClient.invalidateQueries({ queryKey: ['users'] })
        },
        onError: (error) => {
            toast.error(`Error al borrar el usuario: ${error.message}`)
        },
    })

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
                    key={params.id}
                    icon=<EditOutlined color='warning' />
                    label='Edit'
                    onClick={() => {
                        setOpenUserDrawerWindow(true, params.row)
                    }}
                    showInMenu
                />,

                <GridActionsCellItem
                    key={params.id}
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
                    confirm={async () => {
                        deleteUserMutation.mutate(userIdToDelete)
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
