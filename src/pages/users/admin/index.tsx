import { useState } from "react";
import EditToolbar from "../../../components/table/headers/toolbar";
import PageTitle from "../../../components/titles/PageTitle";
import AllUsersTable from "../../../components/users/AllUsersTable";
import UsersDrawer from "../../../components/drawers/Users/UsersDrawer";

export default function Admin() {
  const [open, setOpen] = useState<boolean>(false)

  function handleClick() {
    setOpen(prev => !prev)
  }

  return (
    <>
      <PageTitle title="Administración de usuarios" />

      <EditToolbar title="Crear Usuario" onClick={handleClick} />
      <AllUsersTable />

      <UsersDrawer
        open={open}
        onClose={() => setOpen(prev => !prev)}
        userData= {{ name: "", email: "", password: "" }}
      />
    </>
  )
}
