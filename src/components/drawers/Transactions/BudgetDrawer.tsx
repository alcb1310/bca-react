import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { Box, MenuItem, Typography } from '@mui/material'
import { budgetEditSchema, BudgetEditType } from '../../../types/budget'
import ButtonGroup from '../../buttons/button-group'
import DrawerTitle from '../../titles/DrawerTitle'
import BcaDrawer from '../BcaDrawer/BcaDrawer'
import { useGetAllProjectsQuery } from '../../../redux/api/bca-backend/parametros/projectsSlice'
import BcaSelect from '../../input/BcaSelect'
import { useGetAllBudgetItemsQuery } from '../../../redux/api/bca-backend/parametros/budgetItemSlice'
import BcaTextField from '../../input/BcaTextField'
import { DevTool } from '@hookform/devtools'
import { useCreateBudgetMutation, useUpdateBudgetMutation } from '../../../redux/api/bca-backend/transacciones/budgetSlice'
import { zodResolver } from '@hookform/resolvers/zod'

type BudgetDrawerProps = {
  open: boolean
  onClose: () => void
  defaultValues: BudgetEditType
}

export default function BudgetDrawer({
  open,
  onClose,
  defaultValues,
}: BudgetDrawerProps) {
  const [conflictError, setConflictError] = useState<string>('')
  const { control, reset, handleSubmit, setValue, getValues } =
    useForm<BudgetEditType>({
      defaultValues,
      resolver: zodResolver(budgetEditSchema),
    })

  const { data: projects } = useGetAllProjectsQuery({
    active: true,
  })
  const { data: budgetItems } = useGetAllBudgetItemsQuery({
    accum: false,
  })

  const [createBudget] = useCreateBudgetMutation()
  const [updateBudget] = useUpdateBudgetMutation()

  useEffect(() => {
    reset(defaultValues)
  }, [open])

  async function hadleSubmit(data: BudgetEditType) {
    // TODO: update budget
    const costo = parseFloat(data.cost?.toString() || '0')
    const cantidad = parseFloat(data.quantity?.toString() || '0')

    const dataToSave = {
      project_id: data.project_id,
      budget_item_id: data.budget_item_id,
      quantity: cantidad,
      cost: costo,
      total: cantidad * costo,
    }

    if (!defaultValues.project_id) {
      const res = await createBudget(dataToSave)
      if ('data' in res) {
        onClose()
        return
      }

      // @ts-expect-error data property is part of the res.error object
      setConflictError(res.error.data.error)
      return
    }

    const res = await updateBudget(dataToSave)
    if ('data' in res) {
      onClose()
      return
    }

    // @ts-expect-error data property is part of the res.error object
    setConflictError(res.error.data.erro)
  }

  return (
    <>
      <BcaDrawer open={open} onClose={onClose}>
        <DrawerTitle title='Proyectos' close={onClose} />

        <Box mt={2}>
          <form
            className='w-full flex flex-col gap-5'
            onSubmit={handleSubmit(hadleSubmit)}
          >
            {conflictError && (
              <Typography color='error'>{conflictError}</Typography>
            )}
            <BcaSelect control={control} name='project_id' label='Proyectos'>
              {projects?.map((project) => (
                <MenuItem key={project.id} value={project.id}>
                  {project.name}
                </MenuItem>
              ))}
            </BcaSelect>

            <BcaSelect control={control} name='budget_item_id' label='Partida'>
              {budgetItems?.map((budgetItem) => (
                <MenuItem key={budgetItem.id} value={budgetItem.id}>
                  {budgetItem.name}
                </MenuItem>
              ))}
            </BcaSelect>

            <BcaTextField
              name='quantity'
              label='Cantidad'
              control={control}
              onChange={(e) => {
                if (!isNaN(parseFloat(e.target.value))) {
                  setValue('quantity', parseFloat(e.target.value))
                  setValue(
                    'total',
                    getValues('cost') * parseFloat(e.target.value)
                  )
                } else {
                  console.log(e.target.value)
                }

              }}
            />
            <BcaTextField
              name='cost'
              label='Costo'
              control={control}
              onChange={(e) => {
                if (!isNaN(parseFloat(e.target.value))) {
                  setValue('cost', parseFloat(e.target.value))
                  setValue(
                    'total',
                    getValues('quantity') * parseFloat(e.target.value)
                  )
                }
              }}
            />
            <BcaTextField name='total' control={control} disabled />

            <ButtonGroup
              saveFunction={handleSubmit(hadleSubmit)}
              cancelFunction={onClose}
            />
          </form>
        </Box>
      </BcaDrawer>
      <DevTool control={control} />
    </>
  )
}
