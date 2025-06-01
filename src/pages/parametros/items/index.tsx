import { CircularProgress } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import PageTitle from '~/components/titles/PageTitle/PageTitle'
import { useGetAllRubrosQuery } from '~/queries/parametros/rubros'
import AllRubrosTable from '~components/settings/rubros/AllRubrosTable'
import EditToolbar from '~components/table/headers/toolbar'

export default function Items() {
  const { data, isLoading } = useQuery({
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
        onClick={() => navigate('/parametros/rubros/crear')}
      />

      <AllRubrosTable data={data!} />
    </>
  )
}
