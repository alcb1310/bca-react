import IndividualItem from '.'
import TestAppWrapper from '../../../../components/wrappers/TestAppWraper'

describe('<IndividualItem />', () => {
    describe('Create an item', () => {
        it('should display the page', () => {
            cy.intercept('GET', '**/parametros/rubros/undefined', {
                statusCode: 200,
            }).as('item')
            cy.mount(
                <TestAppWrapper>
                    <IndividualItem />
                </TestAppWrapper>
            )
            cy.get('[data-testid="page.parameters.item.detail.loading"]').should(
                'be.visible'
            )

            cy.wait('@item')
            cy.get('[data-testid="page.parameters.item.detail.loading"]').should(
                'not.exist'
            )
            cy.get('[data-testid="component.pagetitle.title"]')
                .should('be.visible')
                .should('have.text', 'Crear Rubro')

            cy.get('[data-testid="component.form.rubro.code"]')
                .should('be.visible')
                .find('label')
                .should('have.text', 'Código')

            cy.get('[data-testid="component.form.rubro.name"]')
                .should('be.visible')
                .find('label')
                .should('have.text', 'Nombre')

            cy.get('[data-testid="component.form.rubro.unit"]')
                .should('be.visible')
                .find('label')
                .should('have.text', 'Unidad')

            cy.get('[data-testid="component.button.group.save"]')
                .should('be.visible')
                .should('have.text', 'Guardar')

            cy.get('[data-testid="component.button.group.cancel"]')
                .should('be.visible')
                .should('have.text', 'Cancelar')
        })
    })
})
