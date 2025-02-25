import { SidebarProvider } from '@/components/ui/sidebar'
import TransactionsMenu from '../Transactions/Transactions'

describe('<TransactionsMenu />', () => {
    beforeEach(() => {
        cy.wrapper(
            <SidebarProvider>
                <TransactionsMenu />
            </SidebarProvider>
        )
    })

    it('should display the transactions menu', () => {
        cy.getByTestId('menu.transactions').should('have.text', 'Transacciones')
        cy.getByTestId('menu.transactions.closed-chevron').should('be.visible')

        cy.getByTestId('menu.transactions.budget')
            .should('be.visible')
            .should('have.text', 'Presupuesto')

        cy.getByTestId('menu.transactions.invoices')
            .should('be.visible')
            .should('have.text', 'Facturas')

        cy.getByTestId('menu.transactions.closure')
            .should('be.visible')
            .should('have.text', 'Cierre Mensual')
    })

    describe('should toggle the menu when clickig the title', () => {
        beforeEach(() => {
            cy.getByTestId('menu.transactions').click()
        })

        it('should hide the menu', () => {
            cy.getByTestId('menu.transactions.closed-chevron').should('be.visible')

            cy.getByTestId('menu.transactions.budget').should('not.exist')
            cy.getByTestId('menu.transactions.invoices').should('not.exist')
            cy.getByTestId('menu.transactions.closure').should('not.exist')
        })

        it('should show the menu', () => {
            cy.getByTestId('menu.transactions').click()
            cy.getByTestId('menu.transactions.closed-chevron').should('be.visible')

            cy.getByTestId('menu.transactions.budget')
                .should('be.visible')
                .should('have.text', 'Presupuesto')

            cy.getByTestId('menu.transactions.invoices')
                .should('be.visible')
                .should('have.text', 'Facturas')

            cy.getByTestId('menu.transactions.closure')
                .should('be.visible')
                .should('have.text', 'Cierre Mensual')
        })
    })
})
