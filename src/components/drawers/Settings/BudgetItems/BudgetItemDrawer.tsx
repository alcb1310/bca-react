import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Box,
  CircularProgress,
  FormControlLabel,
  Typography,
} from '@mui/material'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { RhfSwitch } from 'mui-rhf-integration'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import BcaSelect from '~/components/input/BcaSelect/BcaSelect'
import BcaTextField from '~/components/input/BcaTextField/BcaTextField'
import DrawerTitle from '~/components/titles/DrawerTitle/DrawerTitle'
import {
  useCreateBudgetItemMutation,
  useGetAllBudgetItemsQuery,
  useUpdateBudgetItemMutation,
} from '~/queries/parametros/budgetItem'
import { useAppSelector } from '~/redux/hooks'
import ButtonGroup from '~components/buttons/button-group'
import BcaDrawer from '~components/drawers/BcaDrawer/BcaDrawer'
import { type BudgetItem, budgetItemSchema } from '~types/partidas'

type BudgetItemDrawerProps = {
  open: boolean
  onClose: () => void
  defaultValues: BudgetItem
}

export default function BudgetItemDrawer({
  open,
  onClose,
  defaultValues,
}: BudgetItemDrawerProps) {
  const token = useAppSelector((state) => state.login.token)
  const queryClient = useQueryClient()
  const { control, reset, handleSubmit } = useForm<BudgetItem>({
    defaultValues,
    resolver: zodResolver(budgetItemSchema),
  })
  const [conflictError, setConflictError] = useState<string>('')

  const { mutate: updateBudgetItem } = useMutation({
    mutationFn: useUpdateBudgetItemMutation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budget-items'] })
      onClose()
      return
    },
    onError: (error) => {
      setConflictError(error.message)
    },
  })
  const { data, isLoading } = useQuery({
    queryKey: ['budget-items', 'accum'],
    queryFn: () => useGetAllBudgetItemsQuery({ token, accum: true }),
  })

  // biome-ignore lint/correctness/useExhaustiveDependencies: should run only on open change
  useEffect(() => {
    setConflictError('')
    reset(defaultValues)
  }, [open])

  async function hadleSubmit(data: BudgetItem) {
    setConflictError('')
    if (defaultValues.id) {
      updateBudgetItem({ token, budgetItem: data })
      return
    }
    createBudgetItem({ token, budgetItem: data })
  }

  return (
    <BcaDrawer open={open} onClose={onClose}>
      <DrawerTitle
        title={defaultValues.id ? 'Editar Partida' : 'Crear Partida'}
        close={onClose}
      />

      <Box mt={2}>
        <form
          className='w-full flex flex-col gap-5'
          onSubmit={handleSubmit(hadleSubmit)}
        >
          {isLoading && <CircularProgress />}
          {conflictError && (
            <Typography color='error' sx={{ fontSize: '0.85rem' }}>
              {conflictError}
            </Typography>
          )}

          <BcaTextField
            datatestid='component.drawer.settings.budget.item.code'
            name='code'
            label='Código'
            control={control}
          />

          <BcaTextField
            datatestid='component.drawer.settings.budget.item.name'
            name='name'
            label='Nombre'
            control={control}
          />

          <BcaSelect
            name='parent_id'
            datatestid='component.drawer.settings.budget.item.parent'
            label='Padre'
            control={control}
            disabled={!!defaultValues.id}
          >
            <option value=''>Seleccione una partida</option>
            {data?.map((budgetItem) => (
              <option key={budgetItem.id} value={budgetItem.id}>
                {budgetItem.name}
              </option>
            ))}
          </BcaSelect>

          <FormControlLabel
            name='accumulates'
            data-testid='component.drawer.settings.budget.item.accumulate'
            labelPlacement='end'
            label='Acumula'
            control={
              <RhfSwitch name='accumulate' control={control} size='small' />
            }
          />

          <ButtonGroup
            saveFunction={handleSubmit(hadleSubmit)}
            cancelFunction={onClose}
          />
        </form>
      </Box>
      <DevTool control={control} />
    </BcaDrawer>
  )
}

const { mutate: createBudgetItem } = useMutation({
  mutationFn: useCreateBudgetItemMutation,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['budget-items'] })
    onClose()
    return
  },
  onError: (error) => {
    setConflictError(error.message)
  },
})
const { data, isLoading } = useQuery({
  queryKey: ['budget-items', 'accum'],
  queryFn: () => useGetAllBudgetItemsQuery({ token, accum: true }),
})

// biome-ignore lint/correctness/useExhaustiveDependencies: should run only on open change
useEffect(() => {
  setConflictError('')
  reset(defaultValues)
}, [open])

async function hadleSubmit(data: BudgetItem) {
  setConflictError('')
  if (defaultValues.id) {
    await updateBudgetItem(data)
    onClose()
    return
  }
  createBudgetItem({ token, budgetItem: data })
}

return (
  <BcaDrawer open={open} onClose={onClose}>
    <DrawerTitle
      title={defaultValues.id ? 'Editar Partida' : 'Crear Partida'}
      close={onClose}
    />

    <Box mt={2}>
      <form
        className='w-full flex flex-col gap-5'
        onSubmit={handleSubmit(hadleSubmit)}
      >
        {isLoading && <CircularProgress />}
        {conflictError && (
          <Typography color='error' sx={{ fontSize: '0.85rem' }}>
            {conflictError}
          </Typography>
        )}

        <BcaTextField
          datatestid='component.drawer.settings.budget.item.code'
          name='code'
          label='Código'
          control={control}
        />

        <BcaTextField
          datatestid='component.drawer.settings.budget.item.name'
          name='name'
          label='Nombre'
          control={control}
        />

        <BcaSelect
          name='parent_id'
          datatestid='component.drawer.settings.budget.item.parent'
          label='Padre'
          control={control}
          disabled={!!defaultValues.id}
        >
          <option value=''>Seleccione una partida</option>
          {data?.map((budgetItem) => (
            <option key={budgetItem.id} value={budgetItem.id}>
              {budgetItem.name}
            </option>
          ))}
        </BcaSelect>

        <FormControlLabel
          name='accumulates'
          data-testid='component.drawer.settings.budget.item.accumulate'
          labelPlacement='end'
          label='Acumula'
          control={
            <RhfSwitch name='accumulate' control={control} size='small' />
          }
        />

        <ButtonGroup
          saveFunction={handleSubmit(hadleSubmit)}
          cancelFunction={onClose}
        />
      </form>
    </Box>
    <DevTool control={control} />
  </BcaDrawer>
)
}
