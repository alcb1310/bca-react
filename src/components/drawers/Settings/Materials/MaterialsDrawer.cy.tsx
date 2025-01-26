import TestAppWrapper from '../../../wrappers/TestAppWraper'
import MaterialsDrawer from './MaterialsDrawer'

describe('<MaterialsDrawer />', () => {
    describe('Create a material', () => {
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

            cy.get('[data-testid="component.drawer.setting.materials.code"]')
                .find('label')
                .should('exist')
                .should('have.text', 'Código')

            cy.get('[data-testid="component.drawer.setting.materials.name"]')
                .find('label')
                .should('exist')
                .should('have.text', 'Nombre')

            cy.get('[data-testid="component.drawer.setting.materials.unit"]')
                .find('label')
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

                cy.get('[data-testid="component.drawer.setting.materials.category"]')
                    .find('select')
                    .select('Material')

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

                cy.get('[data-testid="component.drawer.setting.materials.category"]')
                    .find('select')
                    .select('Material')

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

                cy.get('[data-testid="component.drawer.setting.materials.category"]')
                    .find('select')
                    .select('Material')

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

    describe('Edit a material', () => {
        it('should display all the information', () => {
            cy.intercept('GET', '**parametros/categorias**', {
                statusCode: 200,
                fixture: 'parameters/categories/getAllCategories.json',
            })

            cy.mount(
                <TestAppWrapper>
                    <MaterialsDrawer
                        open={true}
                        onClose={() => { }}
                        defaultValues={{
                            id: 'd8fb01ee-14f0-4c45-88eb-179281aaf703',
                            code: 'cem',
                            name: 'Cement',
                            unit: 'qq',
                            category: {
                                id: '547c3c15-d285-4f6d-890f-de6acc962e79',
                                name: 'Material',
                            },
                        }}
                    />
                </TestAppWrapper>
            )

            cy.get('[data-testid="component.drawertitle.title"]')
                .should('be.visible')
                .should('have.text', 'Editar Material')

            cy.get('[data-testid="component.drawer.setting.materials.code"]')
                .find('input')
                .should('be.visible')
                .should('not.be.disabled')
                .should('have.value', 'cem')

            cy.get('[data-testid="component.drawer.setting.materials.name"]')
                .find('input')
                .should('be.visible')
                .should('not.be.disabled')
                .should('have.value', 'Cement')

            cy.get('[data-testid="component.drawer.setting.materials.unit"]')
                .find('input')
                .should('be.visible')
                .should('not.be.disabled')
                .should('have.value', 'qq')

            cy.get('[data-testid="component.drawer.setting.materials.category"]')
                .find('select')
                .should('be.visible')
                .should('not.be.disabled')
                .invoke('val')
                .should('eq', '547c3c15-d285-4f6d-890f-de6acc962e79')

            cy.get('[data-testid="component.button.group.save"]')
                .should('be.visible')
                .should('have.text', 'Guardar')

            cy.get('[data-testid="component.button.group.cancel"]')
                .should('be.visible')
                .should('have.text', 'Cancelar')
        })
    })
})
