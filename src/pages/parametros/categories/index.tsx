import { CircularProgress } from '@mui/material'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useState } from 'react'
import PageTitle from '~/components/titles/PageTitle/PageTitle'
import { useGetAllCategoriesQuery } from '~/queries/parametros/categorias'
import CategoriesDrawer from '~components/drawers/Settings/Categories/CategoriesDrawer'
import AllCategoriesTable from '~components/settings/categories/AllCategoriesTable'
import EditToolbar from '~components/table/headers/toolbar'

export default function Categories() {
  const [open, setOpen] = useState<boolean>(false)
  const { data, isLoading } = useSuspenseQuery({
    queryKey: ['categories'],
    queryFn: () => useGetAllCategoriesQuery(),
  })

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
