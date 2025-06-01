import { mount } from 'cypress/react'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

Cypress.Commands.add('wrapper', (children) => {
  return mount(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{children}</BrowserRouter>
    </QueryClientProvider>
  )
})

Cypress.Commands.add('pageWrapper', (children, routes) => {
  return mount(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={routes}>{children}</MemoryRouter>
    </QueryClientProvider>
  )
})
