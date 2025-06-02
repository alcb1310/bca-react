import { CircularProgress } from '@mui/material'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import PageTitle from '~/components/titles/PageTitle/PageTitle'
import { useGetAllRubrosQuery } from '~/queries/parametros/rubros'
import AllRubrosTable from '~components/settings/rubros/AllRubrosTable'
import EditToolbar from '~components/table/headers/toolbar'

export default function Items() {
  const { data, isLoading } = useSuspenseQuery({
    queryKey: ['items'],
    queryFn: () => useGetAllRubrosQuery(),
  })
  const navigate = useNavigate()

  return (
    <>
      <PageTitle title='Rubros' />

      {isLoading && <CircularProgress />}
      <EditToolbar
        title='Crear Rubro'
        onClick={() =>
          navigate({
            to: '/parametros/rubros/$id',
            params: {
              id: 'crear',
            },
          })
        }
      />

      <AllRubrosTable data={data!} />
    </>
  )
}
