import { useForm } from 'react-hook-form'
import {
  rubroMaterialSchema,
  RubroMaterialType,
} from '../../../../types/rubro-material'
import BcaDrawer from '../../BcaDrawer/BcaDrawer'
import DrawerTitle from '../../../titles/DrawerTitle'
import ButtonGroup from '../../../buttons/button-group'
import { useEffect } from 'react'
import BcaTextField from '../../../input/BcaTextField'
import { useGetAllMaterialsQuery } from '../../../../redux/api/bca-backend/parametros/materialsSlice'
import BcaSelect from '../../../input/BcaSelect'
import { zodResolver } from '@hookform/resolvers/zod'

type RubroMaterialsDrawerProps = {
  open: boolean
  onClose: () => void
  defaultValues: RubroMaterialType
}

export default function RubroMaterialsDrawer({
  open,
  onClose,
  defaultValues,
}: RubroMaterialsDrawerProps) {
  const { control, reset, handleSubmit, register } = useForm<RubroMaterialType>(
    {
      defaultValues,
      resolver: zodResolver(rubroMaterialSchema),
    }
  )

  const { data: allMaterials } = useGetAllMaterialsQuery()

  useEffect(() => {
    reset(defaultValues)
  }, [open])

  function hadleSubmit(data: RubroMaterialType) {
    console.log(data)
  }

  return (
    <BcaDrawer open={open} onClose={onClose}>
      <DrawerTitle title='Material' close={onClose} />

      <form
        className='mt-5 flex flex-col gap-5'
        onSubmit={handleSubmit(hadleSubmit)}
      >
        <input type='hidden' {...register('item_id')} />

        <BcaSelect name='material_id' label='Material' control={control}>
          {allMaterials?.map((material) => (
            <option key={material.id} value={material.id}>
              {material.name}
            </option>
          ))}
        </BcaSelect>

        <BcaTextField name='quantity' label='Cantidad' control={control} />

        <ButtonGroup
          saveFunction={handleSubmit(hadleSubmit)}
          cancelFunction={onClose}
        />
      </form>
    </BcaDrawer>
  )
}
