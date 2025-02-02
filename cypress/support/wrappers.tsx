import { mount } from 'cypress/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { testStore } from '../../src/redux/testStore.ts'

Cypress.Commands.add('wrapper', (children) => {
    return mount(
        <Provider store={testStore}>
            <BrowserRouter>{children}</BrowserRouter>
        </Provider>
    )
})
