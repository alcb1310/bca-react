import { zodResolver } from '@hookform/resolvers/zod'
import { Typography } from '@mui/material'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import BcaSelect from '~/components/input/BcaSelect/BcaSelect'
import BcaTextField from '~/components/input/BcaTextField/BcaTextField'
import DrawerTitle from '~/components/titles/DrawerTitle/DrawerTitle'
import { useGetAllMaterialsQuery } from '~/queries/parametros/materiales'
import { useCreateRubrosMaterialMutation } from '~/queries/parametros/rubro-materal'
import { useAppSelector } from '~/redux/hooks'
import ButtonGroup from '~components/buttons/button-group'
import BcaDrawer from '~components/drawers/BcaDrawer/BcaDrawer'
import { useUpdateRubrosMaterialMutation } from '~redux/api/bca-backend/parametros/rubroMaterialSlice'
import {
  type RubroMaterialType,
  rubroMaterialSchema,
} from '~types/rubro-material'

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
  const token = useAppSelector((state) => state.login.token)
  const queryClient = useQueryClient()
  const [confilctError, setConflictError] = useState<string>('')
  const { control, reset, handleSubmit, register } = useForm<RubroMaterialType>(
    {
      defaultValues,
      resolver: zodResolver(rubroMaterialSchema),
    },
  )

  const [updateRubroMaterial] = useUpdateRubrosMaterialMutation()
  const { mutate } = useMutation({
    mutationFn: useCreateRubrosMaterialMutation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['item-materials'] })
      onClose()
    },
    onError: (error) => {
      setConflictError(error.message)
    },
  })

  const { data: allMaterials } = useQuery({
    queryKey: ['materials'],
    queryFn: () => useGetAllMaterialsQuery({ token }),
  })

  useEffect(() => {
    reset(defaultValues)
  }, [open])

  async function hadleSubmit(data: RubroMaterialType) {
    const material: RubroMaterialType = {
      item_id: data.item_id,
      material_id: data.material_id,
      quantity: Number.parseFloat(data.quantity.toString()),
    }
    setConflictError('')

    if (!defaultValues.material_id) {
      mutate({ token, rubro: material })
      return
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
          disabled={!!defaultValues.material_id}
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
