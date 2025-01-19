import TestAppWrapper from '../wrappers/TestAppWraper'
import TransactionsMenu from './Transactions'

describe('<TransactionsMenu />', () => {
    beforeEach(() => {
        cy.mount(
            <TestAppWrapper>
                <TransactionsMenu />
            </TestAppWrapper>
        )
    })

    it('should display the transactions menu', () => {
        cy.get('[data-testid="menu.transactions"]').should(
            'have.text',
            'Transacciones'
        )
        cy.get('[data-testid="menu.transactions.open-chevron"]').should(
            'be.visible'
        )
        cy.get('[data-testid="menu.transactions.closed-chevron"]').should(
            'not.exist'
        )

        cy.get('[data-testid="menu.transactions.budget"]').should('be.visible')
        cy.get('[data-testid="menu.transactions.budget"]').should(
            'have.text',
            'Presupuesto'
        )

        cy.get('[data-testid="menu.transactions.invoices"]').should('be.visible')
        cy.get('[data-testid="menu.transactions.invoices"]').should(
            'have.text',
            'Facturas'
        )

        cy.get('[data-testid="menu.transactions.closure"]').should('be.visible')
        cy.get('[data-testid="menu.transactions.closure"]').should(
            'have.text',
            'Cierre Mensual'
        )
    })

    describe('should toggle the menu when clickig the title', () => {
        beforeEach(() => {
            cy.get('[data-testid="menu.transactions"]').click()
        })

        it('should hide the menu', () => {
            cy.get('[data-testid="menu.transactions.open-chevron"]').should(
                'not.exist'
            )
            cy.get('[data-testid="menu.transactions.closed-chevron"]').should(
                'be.visible'
            )

            cy.get('[data-testid="menu.transactions.budget"]').should('not.exist')
            cy.get('[data-testid="menu.transactions.invoices"]').should('not.exist')
            cy.get('[data-testid="menu.transactions.closure"]').should('not.exist')
        })
    })
})
