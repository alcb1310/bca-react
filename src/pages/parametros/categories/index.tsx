import { useState } from 'react'
import { CircularProgress } from '@mui/material'

import AllCategoriesTable from '@components/settings/categories/AllCategoriesTable'
import EditToolbar from '@components/table/headers/toolbar'
import PageTitle from '@/components/titles/PageTitle/PageTitle'
import { useGetAllCategoriesQuery } from '@redux/api/bca-backend/parametros/categoriesSlice'
import CategoriesDrawer from '@components/drawers/Settings/Categories/CategoriesDrawer'

export default function Categories() {
  const [open, setOpen] = useState<boolean>(false)
  const { data, isLoading } = useGetAllCategoriesQuery()

  function handleClick() {
    setOpen((prev) => !prev)
  }

  return (
    <>
      <PageTitle title='Categorias' />

      {isLoading && (
        <CircularProgress data-testid='page.parametros.categorias.loading' />
      )}
      <EditToolbar title='Crear Categoria' onClick={handleClick} />
      <AllCategoriesTable data={data!} />
      <CategoriesDrawer
        open={open}
        onClose={handleClick}
        defaultValues={{
          name: '',
        }}
      />
    </>
  )
}
