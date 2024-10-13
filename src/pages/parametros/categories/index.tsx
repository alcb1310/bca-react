import { CircularProgress } from "@mui/material"
import AllCategoriesTable from "../../../components/settings/categories/AllCategoriesTable"
import EditToolbar from "../../../components/table/headers/toolbar"
import PageTitle from "../../../components/titles/PageTitle"
import { useGetAllCategoriesQuery } from "../../../redux/api/bca-backend/parametros/categoriesSlice"

export default function Categories() {
  const { data, isLoading } = useGetAllCategoriesQuery()

  return (
    <>
      <PageTitle title="Categorías" />

      {isLoading && <CircularProgress />}
      <EditToolbar title="Crear Categoría" onClick={() => {}}/>
      <AllCategoriesTable data={data!} />
    </>
  )
}
