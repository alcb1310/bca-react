import TestAppWrapper from '../../wrappers/TestAppWraper'
import InvoiceDetailsDrawer from './InvoiceDetailsDrawer'

describe('<InvoiceDetailsDrawer />', () => {
    beforeEach(() => {
        cy.intercept('GET', '**/parametros/partidas**', {
            statusCode: 200,
            fixture: 'parameters/budget_items/nonaccum.json',
        }).as('items')

        cy.mount(
            <TestAppWrapper>
                <InvoiceDetailsDrawer open={true} onClose={() => { }} invoiceId={''} />
            </TestAppWrapper>
        )
    })

    it('should display the screen', () => {
        cy.wait('@items')
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

    describe('data validation', () => {
        describe('before submit', () => {
            it('should be able to enter decimal numbers in both quantity and cost', () => {
                cy.get(
                    '[data-testid="component.drawer.transaction.invoice.details.quantity"]'
                ).type('1.123')

                cy.get(
                    '[data-testid="component.drawer.transaction.invoice.details.cost"]'
                ).type('1.123')

                cy.get(
                    '[data-testid="component.drawer.transaction.invoice.details.total"] > .MuiInputBase-root > input'
                )
                    .should('be.visible')
                    .should('be.disabled')
                    .should('have.value', '1.261129')
            })

            it('should total to 0 when invalid quantity', () => {
                cy.get(
                    '[data-testid="component.drawer.transaction.invoice.details.quantity"]'
                ).type('ñkldjf')

                cy.get(
                    '[data-testid="component.drawer.transaction.invoice.details.cost"]'
                ).type('1.123')

                cy.get(
                    '[data-testid="component.drawer.transaction.invoice.details.total"] > .MuiInputBase-root > input'
                )
                    .should('be.visible')
                    .should('be.disabled')
                    .should('have.value', '0')
            })

            it('should total to 0 when invalid cost', () => {
                cy.get(
                    '[data-testid="component.drawer.transaction.invoice.details.quantity"]'
                ).type('1.123')

                cy.get(
                    '[data-testid="component.drawer.transaction.invoice.details.cost"]'
                ).type('ñldfj')

                cy.get(
                    '[data-testid="component.drawer.transaction.invoice.details.total"] > .MuiInputBase-root > input'
                )
                    .should('be.visible')
                    .should('be.disabled')
                    .should('have.value', '0')
            })
        })

        describe('after submit', () => {
            it('should display error when all fields are invalid', () => {
                cy.get(
                    '[data-testid="component.drawer.transaction.invoice.details.quantity"]'
                ).type('ñkldjf')

                cy.get(
                    '[data-testid="component.drawer.transaction.invoice.details.cost"]'
                ).type('ñldfj')

                cy.get('[data-testid="component.button.group.save"]').click()

                cy.get('.budget_item_id')
                    .should('be.visible')
                    .should('have.text', 'Seleccione una partida')

                cy.get(
                    '[data-testid="component.drawer.transaction.invoice.details.quantity"] > .MuiFormHelperText-root'
                )
                    .should('be.visible')
                    .should('have.text', 'La cantidad debe ser un número')

                cy.get(
                    '[data-testid="component.drawer.transaction.invoice.details.cost"] > .MuiFormHelperText-root'
                )
                    .should('be.visible')
                    .should('have.text', 'El costo debe ser un número')
            })

            it('should display error when only budget item is invalid', () => {
                cy.get(
                    '[data-testid="component.drawer.transaction.invoice.details.quantity"]'
                ).type('1.123')

                cy.get(
                    '[data-testid="component.drawer.transaction.invoice.details.cost"]'
                ).type('1.123')

                cy.get('[data-testid="component.button.group.save"]').click()

                cy.get('.budget_item_id')
                    .should('be.visible')
                    .should('have.text', 'Seleccione una partida')

                cy.get(
                    '[data-testid="component.drawer.transaction.invoice.details.total"] > .MuiInputBase-root > input'
                )
                    .should('be.visible')
                    .should('be.disabled')
                    .should('have.value', '1.261129')
            })

            it('should display error when only quantity is invalid', () => {
                cy.get(
                    '[data-testid="component.drawer.transaction.invoid.details.budget-item"] > .MuiNativeSelect-select'
                ).select('Project manager')

                cy.get(
                    '[data-testid="component.drawer.transaction.invoice.details.quantity"]'
                ).type('añkdfj')

                cy.get(
                    '[data-testid="component.drawer.transaction.invoice.details.cost"]'
                ).type('1.123')

                cy.get('[data-testid="component.button.group.save"]').click()

                cy.get(
                    '[data-testid="component.drawer.transaction.invoice.details.quantity"] > .MuiFormHelperText-root'
                )
                    .should('be.visible')
                    .should('have.text', 'La cantidad debe ser un número')

                cy.get(
                    '[data-testid="component.drawer.transaction.invoice.details.total"] > .MuiInputBase-root > input'
                )
                    .should('be.visible')
                    .should('be.disabled')
                    .should('have.value', '0')
            })

            it('should display error when only cost is invalid', () => {
                cy.get(
                    '[data-testid="component.drawer.transaction.invoid.details.budget-item"] > .MuiNativeSelect-select'
                ).select('Project manager')

                cy.get(
                    '[data-testid="component.drawer.transaction.invoice.details.quantity"]'
                ).type('1.123')

                cy.get(
                    '[data-testid="component.drawer.transaction.invoice.details.cost"]'
                ).type('Fadj')

                cy.get('[data-testid="component.button.group.save"]').click()

                cy.get(
                    '[data-testid="component.drawer.transaction.invoice.details.cost"] > .MuiFormHelperText-root'
                )
                    .should('be.visible')
                    .should('have.text', 'El costo debe ser un número')

                cy.get(
                    '[data-testid="component.drawer.transaction.invoice.details.total"] > .MuiInputBase-root > input'
                )
                    .should('be.visible')
                    .should('be.disabled')
                    .should('have.value', '0')
            })
        })
    })
})
