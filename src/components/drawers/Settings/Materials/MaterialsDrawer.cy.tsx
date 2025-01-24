import TestAppWrapper from '../../../wrappers/TestAppWraper'
import MaterialsDrawer from './MaterialsDrawer'

describe('<MaterialsDrawer />', () => {
    beforeEach(() => {
        cy.mount(
            <TestAppWrapper>
                <MaterialsDrawer
                    open={true}
                    onClose={() => { }}
                    defaultValues={{
                        id: '',
                        code: '',
                        name: '',
                        unit: '',
                        category: {
                            id: '',
                            name: '',
                        },
                    }}
                />
            </TestAppWrapper>
        )
    })

    it('should display all the fields', () => {
        cy.wait('@categorias')
        cy.get('[data-testid="component.drawertitle.title"]')
            .should('be.visible')
            .should('have.text', 'Crear Material')

        cy.get('[data-testid="component.drawer.setting.materials.code"] > label')
            .should('exist')
            .should('have.text', 'Código')

        cy.get('[data-testid="component.drawer.setting.materials.name"] > label')
            .should('exist')
            .should('have.text', 'Nombre')

        cy.get('[data-testid="component.drawer.setting.materials.unit"] > label')
            .should('exist')
            .should('have.text', 'Unidad')

        cy.get(
            '[data-testid="component.drawer.setting.materials.category"]'
        ).should('be.visible')

        cy.get('[data-testid="component.button.group.save"]')
            .should('be.visible')
            .should('have.text', 'Guardar')

        cy.get('[data-testid="component.button.group.cancel"]')
            .should('be.visible')
            .should('have.text', 'Cancelar')
    })
})
