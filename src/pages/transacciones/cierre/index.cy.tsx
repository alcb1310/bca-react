import Cierre from '.'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

describe('<Cierre />', () => {
    beforeEach(() => {
        cy.intercept('GET', '**/parametros/proyectos?active=true', {
            statusCode: 200,
            fixture: 'parameters/projects/active.json',
        }).as('projects')
        cy.wrapper(
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Cierre />
            </LocalizationProvider>
        )
    })

    it('should display the page', () => {
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
        cy.getByTestId('component.dialog').should('not.exist')
    })

    it('should display errors', () => {
        cy.getByTestId('page.transactions.closure.generate').click()
        cy.get('.project_id')
            .should('be.visible')
            .should('have.text', 'Seleccione un proyecto')
        cy.getByTestId('page.transactions.closure.date')
            .find('.MuiFormHelperText-root')
            .should('have.text', 'Invalid date')
    })

    it('should display dialog', () => {
        cy.getByTestId('page.transactions.closure.project')
            .find('select')
            .select('e4b2eaf2-1d98-4493-bf2d-15938ef3057b')
        cy.getByTestId('page.transactions.closure.date').type('01012025')
        cy.getByTestId('page.transactions.closure.generate').click()
        cy.getByTestId('component.dialog').should('be.visible')

        cy.getByTestId('component.dialog.title').should('have.text', 'Confirmación')

        cy.getByTestId('component.dialog.content').should(
            'have.text',
            'Desea generar el cierre'
        )
        cy.getByTestId('component.dialog.confirm')
            .should('be.visible')
            .should('have.text', 'Confirmar')
        cy.getByTestId('component.dialog.cancel')
            .should('be.visible')
            .should('have.text', 'Cancelar')
            .click()
        cy.getByTestId('component.dialog').should('not.exist')
    })
})
