import TestAppWrapper from '../../../wrappers/TestAppWraper'
import RubroMaterialsDrawer from './RubroMaterialsDrawer'

describe('<RubroMaterialsDrawer />', () => {
    describe('Create Rubro Material', () => {
        beforeEach(() => {
            cy.intercept('GET', '**/parametros/materiales**', {
                statusCode: 200,
                fixture: 'parameters/materials/getAllMaterials.json',
            }).as('materials')

            cy.mount(
                <TestAppWrapper>
                    <RubroMaterialsDrawer
                        open={true}
                        onClose={() => { }}
                        defaultValues={{
                            item_id: '06aea29a-aa9e-4d33-9ccb-78b38833e33b',
                            material_id: '',
                            quantity: 0,
                        }}
                    />
                </TestAppWrapper>
            )
        })

        it('should display all the fields', () => {
            cy.wait('@materials')

            cy.get('[data-testid="component.drawertitle.title"]')
                .should('be.visible')
                .should('have.text', 'Crear Material')

            cy.get(
                '[data-testid="component.drawer.settings.rubro.material.material"]'
            )
                .find('select')
                .should('be.visible')

            cy.get(
                '[data-testid="component.drawer.settings.rubro.material.quantity"]'
            )
                .find('input')
                .should('be.visible')

            cy.get('[data-testid="component.button.group.save"]')
                .should('be.visible')
                .should('have.text', 'Guardar')

            cy.get('[data-testid="component.button.group.cancel"]')
                .should('be.visible')
                .should('have.text', 'Cancelar')
        })

        describe('data validation on submit', () => {
            it('should display all the errors', () => {
                cy.get(
                    '[data-testid="component.drawer.settings.rubro.material.quantity"]'
                ).type('lkadjf')

                cy.get('[data-testid="component.button.group.save"]').click()

                cy.get('.material_id')
                    .should('be.visible')
                    .should('have.text', 'Seleccione un material')

                cy.get(
                    '[data-testid="component.drawer.settings.rubro.material.quantity.error"]'
                )
                    .should('be.visible')
                    .should('have.text', 'La cantidad deber ser un  número')
            })

            it('should display error if material is invalid', () => {
                cy.get(
                    '[data-testid="component.drawer.settings.rubro.material.quantity"]'
                ).type('1.123')

                cy.get('[data-testid="component.button.group.save"]').click()

                cy.get(
                    '[data-testid="component.drawer.settings.rubro.material.quantity"]'
                )
                    .find('input')
                    .should('have.value', '01.123')

                cy.get(
                    '[data-testid="component.drawer.settings.rubro.material.quantity.error"]'
                ).should('not.be.visible')

                cy.get('.material_id')
                    .should('be.visible')
                    .should('have.text', 'Seleccione un material')
            })

            it('should display error if quantity is invalid', () => {
                cy.get(
                    '[data-testid="component.drawer.settings.rubro.material.material"]'
                )
                    .find('select')
                    .select('Cemento')

                cy.get(
                    '[data-testid="component.drawer.settings.rubro.material.quantity"]'
                ).type('lkadjf')

                cy.get('[data-testid="component.button.group.save"]').click()

                cy.get(
                    '[data-testid="component.drawer.settings.rubro.material.quantity.error"]'
                )
                    .should('be.visible')
                    .should('have.text', 'La cantidad deber ser un  número')
            })
        })
    })

    describe('Edit a Rubro Material', () => {
        it('should display all the values', () => {
            cy.intercept('GET', '**/parametros/materiales**', {
                statusCode: 200,
                fixture: 'parameters/materials/getAllMaterials.json',
            }).as('materials')

            cy.mount(
                <TestAppWrapper>
                    <RubroMaterialsDrawer
                        open={true}
                        onClose={() => { }}
                        defaultValues={{
                            item_id: '06aea29a-aa9e-4d33-9ccb-78b38833e33b',
                            material_id: '11321ee2-274c-47ce-bb06-e8b131dbca12',
                            quantity: 20.43,
                        }}
                    />
                </TestAppWrapper>
            )

            cy.get('[data-testid="component.drawertitle.title"]')
                .should('be.visible')
                .should('have.text', 'Editar Material')

            cy.get(
                '[data-testid="component.drawer.settings.rubro.material.material"]'
            )
                .find('select')
                .should('be.visible')
                .should('be.disabled')
                .invoke('val')
                .should('eq', '11321ee2-274c-47ce-bb06-e8b131dbca12')

            cy.get(
                '[data-testid="component.drawer.settings.rubro.material.quantity"]'
            )
                .find('input')
                .should('be.visible')
                .invoke('val')
                .should('eq', '20.43')

            cy.get('[data-testid="component.button.group.save"]')
                .should('be.visible')
                .should('have.text', 'Guardar')

            cy.get('[data-testid="component.button.group.cancel"]')
                .should('be.visible')
                .should('have.text', 'Cancelar')
        })
    })
})
