import { CircularProgress } from "@mui/material"
import AllMaterialsTable from "../../../components/settings/materials/AllMaterialsTable"
import EditToolbar from "../../../components/table/headers/toolbar"
import PageTitle from "../../../components/titles/PageTitle"
import { useGetAllMaterialsQuery } from "../../../redux/api/bca-backend/parametros/materialsSlice"

export default function Materials() {
  const {data, isLoading} = useGetAllMaterialsQuery()
  console.log(data)

  return (
    <>
      <PageTitle title="Materiales" />
      {isLoading && <CircularProgress />}

      <EditToolbar title="Crear Material" onClick={() => {}} />
      <AllMaterialsTable data={data!} />
    </>
  )
}
