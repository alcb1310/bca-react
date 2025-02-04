import { mount } from 'cypress/react'
import { Provider } from 'react-redux'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import { testStore } from '../../src/redux/testStore.ts'

Cypress.Commands.add('wrapper', (children) => {
    return mount(
        <Provider store={testStore}>
            <BrowserRouter>{children}</BrowserRouter>
        </Provider>
    )
})

Cypress.Commands.add('pageWrapper', (children, routes) => {
    return mount(
        <Provider store={testStore}>
            <MemoryRouter initialEntries={routes}>{children}</MemoryRouter>
        </Provider>
    )
})
