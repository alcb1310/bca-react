import { CircularProgress, TextField } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import PageTitle from '~/components/titles/PageTitle/PageTitle'
import { useGetAllBudgetItemsQuery } from '~/queries/parametros/budgetItem'
import { useAppSelector } from '~/redux/hooks'
import BudgetItemDrawer from '~components/drawers/Settings/BudgetItems/BudgetItemDrawer'
import AllBudgetItemsTable from '~components/settings/budget-items/AllBudgetItemsTable'
import EditToolbar from '~components/table/headers/toolbar'
import type { BudgetItem } from '~types/partidas'

export default function BudgetItems() {
  const token = useAppSelector((state) => state.login.token)
  const [open, setOpen] = useState<boolean>(false)
  const [query, setQuery] = useState<string>('')
  const { data, isFetching } = useQuery({
    queryKey: ['budget-items'],
    queryFn: () => useGetAllBudgetItemsQuery({ token, query }),
  })

  function handleClick() {
    setOpen((prev) => !prev)
  }

  return (
    <>
      <PageTitle title='Partidas' />
      {isFetching && (
        <CircularProgress data-testid='page.parametros.partidas.loading' />
      )}
      <Grid container spacing={2}>
        <Grid size={2}>
          <EditToolbar title='Crear Partida' onClick={handleClick} />
        </Grid>

        <Grid size={10}>
          <TextField
            data-testid='page.parametros.partidas.search'
            label='Buscar'
            name='query'
            value={query}
            size='small'
            onChange={(e) => setQuery(e.target.value)}
            className='w-full'
          />
        </Grid>
      </Grid>

      <AllBudgetItemsTable allBudgetItems={data as BudgetItem[]} />

      <BudgetItemDrawer
        open={open}
        onClose={handleClick}
        defaultValues={{
          id: '',
          code: '',
          name: '',
          accumulate: false,
          parent_id: '',
        }}
      />
    </>
  )
}
