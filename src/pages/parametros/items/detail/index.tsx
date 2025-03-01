import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Box, CircularProgress } from '@mui/material'

import { useGetOneRubroQuery } from '../../../../redux/api/bca-backend/parametros/rubrosSlice'
import PageTitle from '../../../../components/titles/PageTitle'
import EditToolbar from '../../../../components/table/headers/toolbar'
import AllRubrosMaterialsTable from '../../../../components/settings/rubros/AllRubrosMaterialsTable'
import RubroMaterialsDrawer from '../../../../components/drawers/Settings/RubroMaterial/RubroMaterialsDrawer'
import RubrosForm from '../../../../components/forms/Rubros'

export default function IndividualItem() {
    const [open, setOpen] = useState<boolean>(false)
    const location = useLocation()
    const rubroId = location.pathname.split('/')[3]
    const { data: rubro, isLoading } = useGetOneRubroQuery(rubroId!)

    const title = rubroId
        ? rubroId.toLowerCase() === 'crear'
            ? 'Crear Rubro'
            : 'Editar Rubro'
        : 'Crear Rubro'

    const showTable = title === 'Crear Rubro'

    return (
        <>
            <PageTitle title={title} />
            {isLoading ? (
                <CircularProgress data-testid='page.parameters.item.detail.loading' />
            ) : (
                <>
                    <Box sx={{ width: '50%', mx: 'auto', mt: 2 }}>
                        <RubrosForm rubroId={rubroId!} rubro={rubro!} />
                    </Box>
                    {!showTable && (
                        <Box sx={{ mt: 2 }}>
                            <EditToolbar
                                title='Agregar Material'
                                onClick={() => setOpen(true)}
                                color='success'
                            />
                            <AllRubrosMaterialsTable rubroId={rubroId!} />
                            <RubroMaterialsDrawer
                                open={open}
                                onClose={() => setOpen(false)}
                                defaultValues={{
                                    item_id: rubroId!,
                                    material_id: '',
                                    quantity: 0,
                                }}
                            />
                        </Box>
                    )}
                </>
            )}
        </>
    )
}
