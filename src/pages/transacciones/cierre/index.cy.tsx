import Cierre from '.'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

describe('<Cierre />', () => {
    it('should display the page', () => {
        cy.intercept('GET', '**/parametros/proyectos?active=true', {
            statusCode: 200,
            fixture: 'parameters/projects/active.json',
        }).as('projects')
        cy.wrapper(
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Cierre />
            </LocalizationProvider>
        )

        cy.getByTestId('page.transactions.closure.loading').should('be.visible')
        cy.getByTestId('component.pagetitle.title')
            .should('be.visible')
            .should('have.text', 'Cierre de Mes')
        cy.getByTestId('page.transactions.closure.loading').should('not.exist')

        cy.getByTestId('page.transactions.closure.project')
            .should('be.visible')
            .find('select')
            .should('not.have.value')
        cy.getByTestId('page.transactions.closure.date')
            .should('be.visible')
            .find('label')
            .should('have.text', 'Fecha')
        cy.getByTestId('page.transactions.closure.generate')
            .should('be.visible')
            .should('have.text', 'Generar Cierre')
        cy.getByTestId('page.transactions.closure.dialog').should('not.exist')
    })
})
