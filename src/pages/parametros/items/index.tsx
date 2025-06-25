import AllRubrosTable from '@/components/settings/rubros/AllRubrosTable'
import EditToolbar from '@/components/table/headers/toolbar'
import PageTitle from '@/components/titles/PageTitle'
import { useGetAllRubrosQuery } from '@/redux/api/bca-backend/parametros/rubrosSlice'
import { CircularProgress } from '@mui/material'
import { useNavigate } from '@tanstack/react-router'

export default function Items() {
  const { data, isLoading } = useGetAllRubrosQuery()
  const navigate = useNavigate()

  return (
    <>
      <PageTitle title='Rubros' />

      {isLoading && <CircularProgress />}
      <EditToolbar
        title='Crear Rubro'
        onClick={() =>
          navigate({
            to: '/parametros/rubros/$rubroId',
            params: { rubroId: 'crear' },
          })
        }
      />

      <AllRubrosTable data={data!} />
    </>
  )
}
