import { useForm, useWatch } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'

import { budgetEditSchema, BudgetEditType } from '@/types/budget'
import ButtonGroup from '@components/buttons/button-group'
import DrawerTitle from '@/components/titles/DrawerTitle/DrawerTitle'
import BcaDrawer from '@components/drawers/BcaDrawer/BcaDrawer'
import { useGetAllProjectsQuery } from '@redux/api/bca-backend/parametros/projectsSlice'
import BcaSelect from '@/components/input/BcaSelect/BcaSelect'
import { useGetAllBudgetItemsQuery } from '@redux/api/bca-backend/parametros/budgetItemSlice'
import BcaTextField from '@/components/input/BcaTextField/BcaTextField'
import {
  useCreateBudgetMutation,
  useUpdateBudgetMutation,
} from '@redux/api/bca-backend/transacciones/budgetSlice'

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
  const { control, reset, handleSubmit } = useForm<BudgetEditType>({
    defaultValues,
    resolver: zodResolver(budgetEditSchema),
  })

  function calculateTotal(): number {
    const q = results.quantity
      ? isNaN(results.quantity)
        ? 0
        : results.quantity
      : 0
    const c = results.cost ? (isNaN(results.cost) ? 0 : results.cost) : 0

    return q * c
  }

  const results = useWatch({ control })
  const total = calculateTotal()

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
        <DrawerTitle
          title={
            defaultValues?.project_id
              ? 'Editar Presupuesto'
              : 'Crear Presupuesto'
          }
          close={onClose}
        />

        <Box mt={2}>
          <form
            className='flex w-full flex-col gap-5'
            onSubmit={handleSubmit(hadleSubmit)}
          >
            {conflictError && (
              <Typography color='error'>{conflictError}</Typography>
            )}
            <BcaSelect
              datatestid='component.drawer.budget.project'
              control={control}
              name='project_id'
              label='Proyectos'
              disabled={defaultValues?.project_id ? true : false}
            >
              <option value=''>Seleccione un proyecto</option>
              {projects?.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </BcaSelect>

            <BcaSelect
              datatestid='component.drawer.budget.budget_item'
              control={control}
              name='budget_item_id'
              label='Partida'
              disabled={defaultValues?.budget_item_id ? true : false}
            >
              <option value=''>Seleccione una partida</option>
              {budgetItems?.map((budgetItem) => (
                <option key={budgetItem.id} value={budgetItem.id}>
                  {budgetItem.name}
                </option>
              ))}
            </BcaSelect>

            <BcaTextField
              name='quantity'
              datatestid='component.drawer.budget.quantity'
              label='Cantidad'
              control={control}
            />
            <BcaTextField
              name='cost'
              label='Costo'
              datatestid='component.drawer.budget.cost'
              control={control}
            />
            <BcaTextField
              datatestid='component.drawer.budget.total'
              name='total'
              label='Total'
              control={control}
              value={total}
              disabled
            />

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
