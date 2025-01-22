import TestAppWrapper from '../../wrappers/TestAppWraper'
import InvoiceDetailsDrawer from './InvoiceDetailsDrawer'

describe('<InvoiceDetailsDrawer />', () => {
    beforeEach(() => {
        cy.mount(
            <TestAppWrapper>
                <InvoiceDetailsDrawer open={true} onClose={() => { }} invoiceId={''} />
            </TestAppWrapper>
        )
    })

    it('should display the screen', () => {
        cy.get('[data-testid="component.drawertitle.title"]')
            .should('be.visible')
            .should('have.text', 'Detalle')

        cy.get(
            '[data-testid="component.drawer.transaction.invoice.details.quantity"] > label'
        )
            .should('be.visible')
            .should('have.text', 'Cantidad')

        cy.get(
            '[data-testid="component.drawer.transaction.invoice.details.quantity"] > .MuiInputBase-root > input'
        )
            .should('be.visible')
            .should('not.be.disabled')
            .should('have.value', '0')

        cy.get(
            '[data-testid="component.drawer.transaction.invoice.details.cost"] > .MuiInputBase-root > input'
        )
            .should('be.visible')
            .should('not.be.disabled')
            .should('have.value', '0')

        cy.get(
            '[data-testid="component.drawer.transaction.invoice.details.total"] > .MuiInputBase-root > input'
        )
            .should('be.visible')
            .should('be.disabled')
            .should('have.value', '0')

        cy.get('[data-testid="component.button.group.save"]')
            .should('be.visible')
            .should('have.text', 'Guardar')

        cy.get('[data-testid="component.button.group.cancel"]')
            .should('be.visible')
            .should('have.text', 'Cancelar')
    })
})
