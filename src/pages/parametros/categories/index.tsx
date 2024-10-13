import AllCategoriesTable from "../../../components/settings/categories/AllCategoriesTable"
import EditToolbar from "../../../components/table/headers/toolbar"
import PageTitle from "../../../components/titles/PageTitle"

export default function Categories() {
  return (
    <>
      <PageTitle title="Categorías" />

      <EditToolbar title="Crear Categoría" onClick={() => {}}/>
      <AllCategoriesTable />
    </>
  )
}
