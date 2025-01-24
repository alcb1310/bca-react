import TestAppWrapper from '../../../wrappers/TestAppWraper'
import CategoriesDrawer from './CategoriesDrawer'

describe('<CategoriesDrawer />', () => {
    beforeEach(() => {
        cy.mount(
            <TestAppWrapper>
                <CategoriesDrawer
                    open={true}
                    onClose={() => { }}
                    defaultValues={{
                        id: '',
                        name: '',
                    }}
                />
            </TestAppWrapper>
        )
    })

    it('should display the screen', () => {
        cy.get('[data-testid="component.drawer.settings.category.name"] > label')
            .should('exist')
            .should('have.text', 'Categoría')

        cy.get('[data-testid="component.drawertitle.title"]')
            .should('be.visible')
            .should('have.text', 'Crear Categorias')

        cy.get('[data-testid="component.button.group.save"]')
            .should('be.visible')
            .should('have.text', 'Guardar')

        cy.get('[data-testid="component.button.group.cancel"]')
            .should('be.visible')
            .should('have.text', 'Cancelar')
    })
})
