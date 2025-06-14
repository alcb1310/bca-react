import { CircularProgress, TextField } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { useState } from 'react'
import BudgetItemDrawer from '../../../components/drawers/Settings/BudgetItems/BudgetItemDrawer'
import AllBudgetItemsTable from '../../../components/settings/budget-items/AllBudgetItemsTable'
import EditToolbar from '../../../components/table/headers/toolbar'
import PageTitle from '../../../components/titles/PageTitle'
import { useGetAllBudgetItemsQuery } from '../../../redux/api/bca-backend/parametros/budgetItemSlice'
import type { BudgetItem } from '../../../types/partidas'

export default function BudgetItems() {
  const [open, setOpen] = useState<boolean>(false)
  const [query, setQuery] = useState<string>('')
  const { data, isLoading } = useGetAllBudgetItemsQuery({ query })

  function handleClick() {
    setOpen((prev) => !prev)
  }

  return (
    <>
      <PageTitle title='Partidas' />
      {isLoading && (
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
