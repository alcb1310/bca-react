import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Typography } from '@mui/material'

import { rubroMaterialSchema, RubroMaterialType } from '~types/rubro-material'
import BcaDrawer from '~components/drawers/BcaDrawer/BcaDrawer'
import DrawerTitle from '~components/titles/DrawerTitle'
import ButtonGroup from '~components/buttons/button-group'
import BcaTextField from '~/components/input/BcaTextField/BcaTextField'
import { useGetAllMaterialsQuery } from '~redux/api/bca-backend/parametros/materialsSlice'
import BcaSelect from '~/components/input/BcaSelect/BcaSelect'
import {
    useCreateRubrosMaterialMutation,
    useUpdateRubrosMaterialMutation,
} from '~redux/api/bca-backend/parametros/rubroMaterialSlice'

type RubroMaterialsDrawerProps = {
    open: boolean
    onClose: () => void
    defaultValues: RubroMaterialType
}

function RubroMaterialsDrawer({
    open,
    onClose,
    defaultValues,
}: RubroMaterialsDrawerProps) {
    const [confilctError, setConflictError] = useState<string>('')
    const { control, reset, handleSubmit, register } = useForm<RubroMaterialType>(
        {
            defaultValues,
            resolver: zodResolver(rubroMaterialSchema),
        }
    )

    const { data: allMaterials } = useGetAllMaterialsQuery()
    const [createRubroMaterial] = useCreateRubrosMaterialMutation()
    const [updateRubroMaterial] = useUpdateRubrosMaterialMutation()

    useEffect(() => {
        reset(defaultValues)
    }, [open])

    async function hadleSubmit(data: RubroMaterialType) {
        const material: RubroMaterialType = {
            item_id: data.item_id,
            material_id: data.material_id,
            quantity: parseFloat(data.quantity.toString()),
        }
        setConflictError('')

        if (!defaultValues.material_id) {
            const res = await createRubroMaterial(material)
            if ('data' in res) {
                onClose()
                return
            }

            // @ts-expect-error data is a property of the res.error object
            setConflictError(res.error.data.error)
        }

        const res = await updateRubroMaterial(material)
        if ('data' in res) {
            onClose()
            return
        }

        // @ts-expect-error data is a property of the res.error object
        setConflictError(res.error.data.error)
    }

    return (
        <BcaDrawer open={open} onClose={onClose}>
            <DrawerTitle
                title={defaultValues.material_id ? 'Editar Material' : 'Crear Material'}
                close={onClose}
            />

            <form
                className='mt-5 flex flex-col gap-5'
                onSubmit={handleSubmit(hadleSubmit)}
            >
                {confilctError && (
                    <Typography color='error'>{confilctError}</Typography>
                )}
                <input type='hidden' {...register('item_id')} />

                <BcaSelect
                    name='material_id'
                    label='Material'
                    datatestid='component.drawer.settings.rubro.material.material'
                    control={control}
                    disabled={defaultValues.material_id ? true : false}
                >
                    <option value=''>Seleccione un material</option>
                    {allMaterials?.map((material) => (
                        <option key={material.id} value={material.id}>
                            {material.name}
                        </option>
                    ))}
                </BcaSelect>

                <BcaTextField
                    datatestid='component.drawer.settings.rubro.material.quantity'
                    name='quantity'
                    label='Cantidad'
                    control={control}
                />

                <ButtonGroup
                    saveFunction={handleSubmit(hadleSubmit)}
                    cancelFunction={onClose}
                />
            </form>
        </BcaDrawer>
    )
}

export default RubroMaterialsDrawer
