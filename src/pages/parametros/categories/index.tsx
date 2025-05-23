import { CircularProgress } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import PageTitle from '~/components/titles/PageTitle/PageTitle'
import { useGetAllCategoriesQuery } from '~/queries/parametros/categorias'
import { useAppSelector } from '~/redux/hooks'
import CategoriesDrawer from '~components/drawers/Settings/Categories/CategoriesDrawer'
import AllCategoriesTable from '~components/settings/categories/AllCategoriesTable'
import EditToolbar from '~components/table/headers/toolbar'

export default function Categories() {
  const token = useAppSelector((state) => state.login.token)
  const [open, setOpen] = useState<boolean>(false)
  const { data, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: () => useGetAllCategoriesQuery({ token }),
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
