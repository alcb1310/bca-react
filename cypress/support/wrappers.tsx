import { mount } from 'cypress/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

Cypress.Commands.add('wrapper', (children) => {
  return mount(
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
})

Cypress.Commands.add('pageWrapper', (children, routes) => {
  console.log(routes)
  return mount(
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
})
