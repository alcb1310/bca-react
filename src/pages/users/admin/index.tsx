import PageTitle from "../../../components/titles/PageTitle";
import AllUsersTable from "../../../components/users/AllUsersTable";

export default function Admin() {
  return (
    <>
      <PageTitle title="Administración de usuarios" />
      <AllUsersTable />
    </>
  )
}
