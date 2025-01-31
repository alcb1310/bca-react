import TestAppWrapper from '../wrappers/TestAppWraper'
import ReportsMenu from './Reports'

describe('<ReportesMenu />', () => {
    beforeEach(() => {
        cy.mount(
            <TestAppWrapper>
                <ReportsMenu />
            </TestAppWrapper>
        )
    })

    it('should display the reports menu', () => {
        cy.get('[data-testid="menu.reports"]').should('have.text', 'Reportes')
        cy.get('[data-testid="menu.reports.open-chevron"]').should('be.visible')
        cy.get('[data-testid="menu.reports.closed-chevron"]').should('not.exist')

        cy.get('[data-testid="menu.reports.actual"]').should('be.visible')
        cy.get('[data-testid="menu.reports.actual"]').should('have.text', 'Actual')

        cy.get('[data-testid="menu.reports.balance"]').should('be.visible')
        cy.get('[data-testid="menu.reports.balance"]').should('have.text', 'Cuadre')

        cy.get('[data-testid="menu.reports.spent"]').should('be.visible')
        cy.get('[data-testid="menu.reports.spent"]').should(
            'have.text',
            'Gastado por Partida'
        )

        cy.get('[data-testid="menu.reports.historic"]').should('be.visible')
        cy.get('[data-testid="menu.reports.historic"]').should(
            'have.text',
            'Historico'
        )
    })

    describe('toggle the menu', () => {
        beforeEach(() => {
            cy.get('[data-testid="menu.reports"]').click()
        })

        it('should hide the menu when click the title', () => {
            cy.get('[data-testid="menu.reports.closed-chevron"]').should('be.visible')
            cy.get('[data-testid="menu.reports.open-chevron"]').should('not.exist')

            cy.get('[data-testid="menu.reports.actual"]').should('not.exist')
            cy.get('[data-testid="menu.reports.balance"]').should('not.exist')
            cy.get('[data-testid="menu.reports.spent"]').should('not.exist')
            cy.get('[data-testid="menu.reports.historic"]').should('not.exist')
        })

        it('should show the menu when click the title', () => {
            cy.get('[data-testid="menu.reports"]').click()
            cy.get('[data-testid="menu.reports.open-chevron"]').should('be.visible')
            cy.get('[data-testid="menu.reports.closed-chevron"]').should('not.exist')

            cy.get('[data-testid="menu.reports.actual"]').should('be.visible')
            cy.get('[data-testid="menu.reports.balance"]').should('be.visible')
            cy.get('[data-testid="menu.reports.spent"]').should('be.visible')
            cy.get('[data-testid="menu.reports.historic"]').should('be.visible')
        })
    })
})
