import TestAppWrapper from '../../../wrappers/TestAppWraper'
import RubroMaterialsDrawer from './RubroMaterialsDrawer'

describe('<RubroMaterialsDrawer />', () => {
    beforeEach(() => {
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

        cy.get('[data-testid="component.drawertitle.title"]')
            .should('be.visible')
            .should('have.text', 'Material')

        cy.get(
            '[data-testid="component.drawer.settings.rubro.material.material"] > select'
        ).should('be.visible')

        cy.get(
            '[data-testid="component.drawer.settings.rubro.material.quantity"] > div> input'
        ).should('be.visible')

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
                '[data-testid="component.drawer.settings.rubro.material.quantity"] > div > input'
            ).should('have.value', '01.123')

            cy.get(
                '[data-testid="component.drawer.settings.rubro.material.quantity.error"]'
            ).should('not.be.visible')

            cy.get('.material_id')
                .should('be.visible')
                .should('have.text', 'Seleccione un material')
        })
    })
})
