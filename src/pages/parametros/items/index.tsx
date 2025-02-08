import { useNavigate } from 'react-router-dom'
import { CircularProgress } from '@mui/material'

import AllRubrosTable from '~components/settings/rubros/AllRubrosTable'
import EditToolbar from '~components/table/headers/toolbar'
import PageTitle from '~/components/titles/PageTitle/PageTitle'
import { useGetAllRubrosQuery } from '~redux/api/bca-backend/parametros/rubrosSlice'

export default function Items() {
    const { data, isLoading } = useGetAllRubrosQuery()
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
