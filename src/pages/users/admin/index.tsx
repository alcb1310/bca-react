import { useState } from 'react'
import PageTitle from '~/components/titles/PageTitle/PageTitle'
import UsersDrawer from '~components/drawers/Users/UsersDrawer'
import EditToolbar from '~components/table/headers/toolbar'
import AllUsersTable from '~components/users/AllUsersTable'

export default function Admin() {
  const [open, setOpen] = useState<boolean>(false)

  function handleClick() {
    setOpen((prev) => !prev)
  }

  return (
    <>
      <PageTitle title='Administración de usuarios' />

      <EditToolbar title='Crear Usuario' onClick={handleClick} />
      <AllUsersTable />

      <UsersDrawer
        open={open}
        onClose={() => setOpen((prev) => !prev)}
        userData={{ name: '', email: '', password: '' }}
      />
    </>
  )
}
