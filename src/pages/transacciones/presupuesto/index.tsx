import { ChangeEvent, useState } from 'react'
import { CircularProgress, Stack, TextField } from '@mui/material'

import EditToolbar from '../../../components/table/headers/toolbar'
import PageTitle from '../../../components/titles/PageTitle'
import AllBudgetsTable from '../../../components/parameters/budgets/AllBudgetsTable'
import { useGetAllBudgetsQuery } from '../../../redux/api/bca-backend/transacciones/budgetSlice'
import BudgetDrawer from '../../../components/drawers/Transactions/BudgetDrawer'

export default function Presupuesto() {
  const [open, setOpen] = useState<boolean>(false)
  const [search, setSearch] = useState<string>('')
  const { data, isLoading } = useGetAllBudgetsQuery({ query: search })

  return (
    <>
      <PageTitle title='Presupuesto' />

      <Stack spacing={3} direction='row'>
        <EditToolbar title={'Agregar'} onClick={() => setOpen(true)} />
        {isLoading && <CircularProgress />}
        <TextField
          placeholder='Buscar'
          size='small'
          value={search}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
          className='w-full'
        />
      </Stack>

      <AllBudgetsTable data={data!} />
      <BudgetDrawer
        open={open}
        onClose={() => setOpen(false)}
        defaultValues={{
          project_id: '',
          budget_item_id: '',
          quantity: 0,
          cost: 0,
          total: 0,
        }}
      />
    </>
  )
}
