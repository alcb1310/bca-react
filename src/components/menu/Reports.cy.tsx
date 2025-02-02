import ReportsMenu from './Reports'

describe('<ReportesMenu />', () => {
    beforeEach(() => {
        cy.wrapper(<ReportsMenu />)
    })

    it('should display the reports menu', () => {
        cy.getByTestId('menu.reports').should('have.text', 'Reportes')
        cy.getByTestId('menu.reports.open-chevron').should('be.visible')
        cy.getByTestId('menu.reports.closed-chevron').should('not.exist')

        cy.getByTestId('menu.reports.actual')
            .should('be.visible')
            .should('have.text', 'Actual')

        cy.getByTestId('menu.reports.balance')
            .should('be.visible')
            .should('have.text', 'Cuadre')

        cy.getByTestId('menu.reports.spent').should('be.visible')
        cy.getByTestId('menu.reports.spent').should(
            'have.text',
            'Gastado por Partida'
        )

        cy.getByTestId('menu.reports.historic').should('be.visible')
        cy.getByTestId('menu.reports.historic').should('have.text', 'Historico')
    })

    describe('toggle the menu', () => {
        beforeEach(() => {
            cy.getByTestId('menu.reports').click()
        })

        it('should hide the menu when click the title', () => {
            cy.getByTestId('menu.reports.closed-chevron').should('be.visible')
            cy.getByTestId('menu.reports.open-chevron').should('not.exist')

            cy.getByTestId('menu.reports.actual').should('not.exist')
            cy.getByTestId('menu.reports.balance').should('not.exist')
            cy.getByTestId('menu.reports.spent').should('not.exist')
            cy.getByTestId('menu.reports.historic').should('not.exist')
        })

        it('should show the menu when click the title', () => {
            cy.getByTestId('menu.reports').click()
            cy.getByTestId('menu.reports.open-chevron').should('be.visible')
            cy.getByTestId('menu.reports.closed-chevron').should('not.exist')

            cy.getByTestId('menu.reports.actual').should('be.visible')
            cy.getByTestId('menu.reports.balance').should('be.visible')
            cy.getByTestId('menu.reports.spent').should('be.visible')
            cy.getByTestId('menu.reports.historic').should('be.visible')
        })
    })
})
