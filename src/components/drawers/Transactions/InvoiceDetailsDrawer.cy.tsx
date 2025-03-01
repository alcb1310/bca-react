import InvoiceDetailsDrawer from './InvoiceDetailsDrawer'

describe('<InvoiceDetailsDrawer />', () => {
    beforeEach(() => {
        cy.intercept('GET', '**/parametros/partidas**', {
            statusCode: 200,
            fixture: 'parameters/budget_items/nonaccum.json',
        }).as('items')
        cy.wrapper(
            <InvoiceDetailsDrawer open={true} onClose={() => { }} invoiceId={''} />
        )
    })

    it('should display the screen', () => {
        cy.wait('@items')
        cy.getByTestId('component.drawertitle.title')
            .should('be.visible')
            .should('have.text', 'Crear Detalle')

        cy.getByTestId('component.drawer.transaction.invoice.details.quantity')
            .find('label')
            .should('be.visible')
            .should('have.text', 'Cantidad')

        cy.getByTestId('component.drawer.transaction.invoice.details.quantity')
            .find('input')
            .should('be.visible')
            .should('not.be.disabled')
            .should('have.value', '0')

        cy.getByTestId('component.drawer.transaction.invoice.details.cost')
            .find('input')
            .should('be.visible')
            .should('not.be.disabled')
            .should('have.value', '0')

        cy.getByTestId('component.drawer.transaction.invoice.details.total')
            .find('input')
            .should('be.visible')
            .should('be.disabled')
            .should('have.value', '0')

        cy.getByTestId('component.button.group.save')
            .should('be.visible')
            .should('have.text', 'Guardar')

        cy.getByTestId('component.button.group.cancel')
            .should('be.visible')
            .should('have.text', 'Cancelar')
    })

    describe('data validation', () => {
        describe('before submit', () => {
            it('should be able to enter decimal numbers in both quantity and cost', () => {
                cy.getByTestId(
                    'component.drawer.transaction.invoice.details.quantity'
                ).type('1.123')

                cy.getByTestId(
                    'component.drawer.transaction.invoice.details.cost'
                ).type('1.123')

                cy.getByTestId('component.drawer.transaction.invoice.details.total')
                    .find('input')
                    .should('be.visible')
                    .should('be.disabled')
                    .should('have.value', '1.261129')
            })

            it('should total to 0 when invalid quantity', () => {
                cy.getByTestId(
                    'component.drawer.transaction.invoice.details.quantity'
                ).type('ñkldjf')

                cy.getByTestId(
                    'component.drawer.transaction.invoice.details.cost'
                ).type('1.123')

                cy.getByTestId('component.drawer.transaction.invoice.details.total')
                    .find('input')
                    .should('be.visible')
                    .should('be.disabled')
                    .should('have.value', '0')
            })

            it('should total to 0 when invalid cost', () => {
                cy.getByTestId(
                    'component.drawer.transaction.invoice.details.quantity'
                ).type('1.123')

                cy.getByTestId(
                    'component.drawer.transaction.invoice.details.cost'
                ).type('ñldfj')

                cy.getByTestId('component.drawer.transaction.invoice.details.total')
                    .find('input')
                    .should('be.visible')
                    .should('be.disabled')
                    .should('have.value', '0')
            })
        })

        describe('after submit', () => {
            it('should display error when all fields are invalid', () => {
                cy.getByTestId(
                    'component.drawer.transaction.invoice.details.quantity'
                ).type('ñkldjf')

                cy.getByTestId(
                    'component.drawer.transaction.invoice.details.cost'
                ).type('ñldfj')

                cy.getByTestId('component.button.group.save').click()

                cy.get('.budget_item_id')
                    .should('be.visible')
                    .should('have.text', 'Seleccione una partida')

                cy.getByTestId(
                    'component.drawer.transaction.invoice.details.quantity.error'
                )
                    .should('be.visible')
                    .should('have.text', 'La cantidad debe ser un número')

                cy.getByTestId(
                    'component.drawer.transaction.invoice.details.cost.error'
                )
                    .should('be.visible')
                    .should('have.text', 'El costo debe ser un número')
            })

            it('should display error when only budget item is invalid', () => {
                cy.getByTestId(
                    'component.drawer.transaction.invoice.details.quantity'
                ).type('1.123')

                cy.getByTestId(
                    'component.drawer.transaction.invoice.details.cost'
                ).type('1.123')

                cy.getByTestId('component.button.group.save').click()

                cy.get('.budget_item_id')
                    .should('be.visible')
                    .should('have.text', 'Seleccione una partida')

                cy.getByTestId('component.drawer.transaction.invoice.details.total')
                    .find('input')
                    .should('be.visible')
                    .should('be.disabled')
                    .should('have.value', '1.261129')
            })

            it('should display error when only quantity is invalid', () => {
                cy.getByTestId(
                    'component.drawer.transaction.invoid.details.budget-item'
                )
                    .find('select')
                    .select('Project manager')

                cy.getByTestId(
                    'component.drawer.transaction.invoice.details.quantity'
                ).type('añkdfj')

                cy.getByTestId(
                    'component.drawer.transaction.invoice.details.cost'
                ).type('1.123')

                cy.getByTestId('component.button.group.save').click()

                cy.getByTestId(
                    'component.drawer.transaction.invoice.details.quantity.error'
                )
                    .should('be.visible')
                    .should('have.text', 'La cantidad debe ser un número')

                cy.getByTestId('component.drawer.transaction.invoice.details.total')
                    .find('input')
                    .should('be.visible')
                    .should('be.disabled')
                    .should('have.value', '0')
            })

            it('should display error when only cost is invalid', () => {
                cy.get(
                    '[data-testid="component.drawer.transaction.invoid.details.budget-item"]'
                )
                    .find('select')
                    .select('Project manager')

                cy.getByTestId(
                    'component.drawer.transaction.invoice.details.quantity'
                ).type('1.123')

                cy.getByTestId(
                    'component.drawer.transaction.invoice.details.cost'
                ).type('Fadj')

                cy.getByTestId('component.button.group.save').click()

                cy.getByTestId(
                    'component.drawer.transaction.invoice.details.cost.error'
                )
                    .should('be.visible')
                    .should('have.text', 'El costo debe ser un número')

                cy.getByTestId('component.drawer.transaction.invoice.details.total')
                    .find('input')
                    .should('be.visible')
                    .should('be.disabled')
                    .should('have.value', '0')
            })
        })
    })
})
