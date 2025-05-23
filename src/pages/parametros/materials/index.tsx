import { CircularProgress } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import PageTitle from '~/components/titles/PageTitle/PageTitle'
import { useGetAllMaterialsQuery } from '~/queries/parametros/materiales'
import { useAppSelector } from '~/redux/hooks'
import MaterialsDrawer from '~components/drawers/Settings/Materials/MaterialsDrawer'
import AllMaterialsTable from '~components/settings/materials/AllMaterialsTable'
import EditToolbar from '~components/table/headers/toolbar'

export default function Materials() {
  const token = useAppSelector((state) => state.login.token)
  const [open, setOpen] = useState<boolean>(false)
  // const { data, isLoading } = useGetAllMaterialsQuery()
  const { data, isLoading } = useQuery({
    queryKey: ['materials'],
    queryFn: () => useGetAllMaterialsQuery({ token }),
  })

  return (
    <>
      <PageTitle title='Materiales' />
      {isLoading && (
        <CircularProgress data-testid='page.parameters.materials.loading' />
      )}

      <EditToolbar title='Crear Material' onClick={() => setOpen(true)} />
      <AllMaterialsTable data={data!} />
      <MaterialsDrawer
        open={open}
        onClose={() => setOpen(false)}
        defaultValues={{
          code: '',
          name: '',
          unit: '',
          category: {
            id: '',
            name: '',
          },
        }}
      />
    </>
  )
}
