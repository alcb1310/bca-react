import TestAppWrapper from '../../../wrappers/TestAppWraper'
import CategoriesDrawer from './CategoriesDrawer'

describe('<CategoriesDrawer />', () => {
    describe('Create category', () => {
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
            cy.get('[data-testid="component.drawer.settings.category.name"]')
                .find('label')
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

        it('should validate the information when submit', () => {
            cy.get('[data-testid="component.button.group.save"]').click()

            cy.get('[data-testid="component.drawer.settings.category.name.error"]')
                .should('be.visible')
                .should('have.text', 'Categoría es obligatoria')
        })
    })

    describe('Update a category', () => {
        it('should display the category', () => {
            cy.mount(
                <TestAppWrapper>
                    <CategoriesDrawer
                        open={true}
                        onClose={() => { }}
                        defaultValues={{
                            id: '0def04ec-6c8a-4d3e-bbb2-f95dce319fce',
                            name: 'Categoria',
                        }}
                    />
                </TestAppWrapper>
            )

            cy.get('[data-testid="component.drawertitle.title"]')
                .should('be.visible')
                .should('have.text', 'Editar Categoria')

            cy.get('[data-testid="component.drawer.settings.category.name"]')
                .find('input')
                .should('be.visible')
                .should('not.be.disabled')
                .should('have.value', 'Categoria')

            cy.get('[data-testid="component.button.group.save"]')
                .should('be.visible')
                .should('have.text', 'Guardar')

            cy.get('[data-testid="component.button.group.cancel"]')
                .should('be.visible')
                .should('have.text', 'Cancelar')
        })
    })
})
