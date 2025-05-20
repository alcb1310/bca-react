import { mount } from 'cypress/react'
import { Provider } from 'react-redux'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import { testStore } from '../../src/redux/testStore.ts'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

Cypress.Commands.add('wrapper', (children) => {
  return mount(
    <Provider store={testStore}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>{children}</BrowserRouter>
      </QueryClientProvider>
    </Provider>
  )
})

Cypress.Commands.add('pageWrapper', (children, routes) => {
  return mount(
    <Provider store={testStore}>
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={routes}>{children}</MemoryRouter>
      </QueryClientProvider>
    </Provider>
  )
})
