import TestAppWrapper from '../../../wrappers/TestAppWraper'
import MaterialsDrawer from './MaterialsDrawer'

describe('<MaterialsDrawer />', () => {
    beforeEach(() => {
        cy.intercept('GET', '**parametros/categorias**', {
            statusCode: 200,
            fixture: 'parameters/categories/getAllCategories.json',
        }).as('categorias')

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

    describe('data validation', () => {
        it('should display errors in all the fields', () => {
            cy.get('[data-testid="component.button.group.save"]').click()

            cy.get('[data-testid="component.drawer.setting.materials.code.error"]')
                .should('be.visible')
                .should('have.text', 'Código es obligatorio')

            cy.get('[data-testid="component.drawer.setting.materials.name.error"]')
                .should('be.visible')
                .should('have.text', 'Nombre es obligatorio')

            cy.get('[data-testid="component.drawer.setting.materials.unit.error"]')
                .should('be.visible')
                .should('have.text', 'Unidad es obligatorio')

            cy.get('[data-testid="component.drawer.setting.materials.category"]')
                .next()
                .should('have.text', 'Seleccione una categoría')
        })

        it('should display errors if only the code is invalid', () => {
            cy.get('[data-testid="component.drawer.setting.materials.name"]').type(
                'name'
            )

            cy.get('[data-testid="component.drawer.setting.materials.unit"]').type(
                'unit'
            )

            cy.get(
                '[data-testid="component.drawer.setting.materials.category"] > .MuiNativeSelect-select'
            ).select('Material')

            cy.get('[data-testid="component.button.group.save"]').click()

            cy.get('[data-testid="component.drawer.setting.materials.code.error"]')
                .should('be.visible')
                .should('have.text', 'Código es obligatorio')

            cy.get(
                '[data-testid="component.drawer.setting.materials.name.error"]'
            ).should('not.be.visible')

            cy.get(
                '[data-testid="component.drawer.setting.materials.unit.error"]'
            ).should('not.be.visible')
        })

        it('should display errors if only the name is invalid', () => {
            cy.get('[data-testid="component.drawer.setting.materials.code"]').type(
                'code'
            )

            cy.get('[data-testid="component.drawer.setting.materials.unit"]').type(
                'unit'
            )

            cy.get(
                '[data-testid="component.drawer.setting.materials.category"] > .MuiNativeSelect-select'
            ).select('Material')

            cy.get('[data-testid="component.button.group.save"]').click()

            cy.get('[data-testid="component.drawer.setting.materials.name.error"]')
                .should('be.visible')
                .should('have.text', 'Nombre es obligatorio')

            cy.get(
                '[data-testid="component.drawer.setting.materials.code.error"]'
            ).should('not.be.visible')

            cy.get(
                '[data-testid="component.drawer.setting.materials.unit.error"]'
            ).should('not.be.visible')
        })

        it('should display error if only the unit is invalid', () => {
            cy.get('[data-testid="component.drawer.setting.materials.code"]').type(
                'code'
            )

            cy.get('[data-testid="component.drawer.setting.materials.name"]').type(
                'name'
            )

            cy.get(
                '[data-testid="component.drawer.setting.materials.category"] > .MuiNativeSelect-select'
            ).select('Material')

            cy.get('[data-testid="component.button.group.save"]').click()

            cy.get('[data-testid="component.drawer.setting.materials.unit.error"]')
                .should('be.visible')
                .should('have.text', 'Unidad es obligatorio')

            cy.get(
                '[data-testid="component.drawer.setting.materials.code.error"]'
            ).should('not.be.visible')

            cy.get(
                '[data-testid="component.drawer.setting.materials.name.error"]'
            ).should('not.be.visible')
        })

        it('should display error if only the category is invalid', () => {
            cy.get('[data-testid="component.drawer.setting.materials.code"]').type(
                'code'
            )

            cy.get('[data-testid="component.drawer.setting.materials.name"]').type(
                'name'
            )

            cy.get('[data-testid="component.drawer.setting.materials.unit"]').type(
                'unit'
            )

            cy.get('[data-testid="component.button.group.save"]').click()

            cy.get(
                '[data-testid="component.drawer.setting.materials.code.error"]'
            ).should('not.be.visible')

            cy.get(
                '[data-testid="component.drawer.setting.materials.name.error"]'
            ).should('not.be.visible')

            cy.get(
                '[data-testid="component.drawer.setting.materials.unit.error"]'
            ).should('not.be.visible')

            cy.get('[data-testid="component.drawer.setting.materials.category"]')
                .next()
                .should('have.text', 'Seleccione una categoría')
        })
    })
})
