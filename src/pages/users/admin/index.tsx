import EditToolbar from "../../../components/table/headers/toolbar";
import PageTitle from "../../../components/titles/PageTitle";
import AllUsersTable from "../../../components/users/AllUsersTable";

export default function Admin() {
  function handleClick() {
    console.log("clicked")
  }

  return (
    <>
      <PageTitle title="Administración de usuarios" />

      <EditToolbar title="Crear Usuario" onClick={handleClick} />
      <AllUsersTable />
    </>
  )
}
