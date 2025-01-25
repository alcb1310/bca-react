import TestAppWrapper from '../../../wrappers/TestAppWraper'
import RubroMaterialsDrawer from './RubroMaterialsDrawer'

describe('<RubroMaterialsDrawer />', () => {
    it('should display all the fields', () => {
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
})
