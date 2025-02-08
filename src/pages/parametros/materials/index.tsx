import { useState } from 'react'
import { CircularProgress } from '@mui/material'

import AllMaterialsTable from '~components/settings/materials/AllMaterialsTable'
import EditToolbar from '~components/table/headers/toolbar'
import PageTitle from '~/components/titles/PageTitle/PageTitle'
import { useGetAllMaterialsQuery } from '~redux/api/bca-backend/parametros/materialsSlice'
import MaterialsDrawer from '~components/drawers/Settings/Materials/MaterialsDrawer'

export default function Materials() {
    const [open, setOpen] = useState<boolean>(false)
    const { data, isLoading } = useGetAllMaterialsQuery()

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
