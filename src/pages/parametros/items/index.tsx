import { CircularProgress } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import AllRubrosTable from '@/components/settings/rubros/AllRubrosTable'
import EditToolbar from '@/components/table/headers/toolbar'
import PageTitle from '@/components/titles/PageTitle'
import { GetAllRubros } from '@/queries/parametros/rubros'

export default function Items() {
	const navigate = useNavigate()

	const { data, isLoading } = useQuery({
		queryKey: ['rubros'],
		queryFn: () => GetAllRubros(),
	})

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
