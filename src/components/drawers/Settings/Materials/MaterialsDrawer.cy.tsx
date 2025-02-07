import MaterialsDrawer from './MaterialsDrawer'

describe('<MaterialsDrawer />', () => {
    describe('Create a material', () => {
        beforeEach(() => {
            cy.intercept('GET', '**parametros/categorias**', {
                statusCode: 200,
                fixture: 'parameters/categories/getAllCategories.json',
            }).as('categorias')

            cy.wrapper(
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
            )
        })

        it('should display all the fields', () => {
            cy.wait('@categorias')
            cy.getByTestId('component.drawertitle.title')
                .should('be.visible')
                .should('have.text', 'Crear Material')

            cy.getByTestId('component.drawer.setting.materials.code')
                .find('label')
                .should('exist')
                .should('have.text', 'Código')

            cy.getByTestId('component.drawer.setting.materials.name')
                .find('label')
                .should('exist')
                .should('have.text', 'Nombre')

            cy.getByTestId('component.drawer.setting.materials.unit')
                .find('label')
                .should('exist')
                .should('have.text', 'Unidad')

            cy.getByTestId('component.drawer.setting.materials.category').should(
                'be.visible'
            )

            cy.getByTestId('component.button.group.save')
                .should('be.visible')
                .should('have.text', 'Guardar')

            cy.getByTestId('component.button.group.cancel')
                .should('be.visible')
                .should('have.text', 'Cancelar')
        })

        describe('data validation', () => {
            it('should display errors in all the fields', () => {
                cy.getByTestId('component.button.group.save').click()

                cy.getByTestId('component.drawer.setting.materials.code.error')
                    .should('be.visible')
                    .should('have.text', 'Código es obligatorio')

                cy.getByTestId('component.drawer.setting.materials.name.error')
                    .should('be.visible')
                    .should('have.text', 'Nombre es obligatorio')

                cy.getByTestId('component.drawer.setting.materials.unit.error')
                    .should('be.visible')
                    .should('have.text', 'Unidad es obligatorio')

                cy.getByTestId('component.drawer.setting.materials.category')
                    .next()
                    .should('have.text', 'Seleccione una categoría')
            })

            it('should display errors if only the code is invalid', () => {
                cy.getByTestId('component.drawer.setting.materials.name').type('name')

                cy.getByTestId('component.drawer.setting.materials.unit').type('unit')

                cy.getByTestId('component.drawer.setting.materials.category')
                    .find('select')
                    .select('Material')

                cy.getByTestId('component.button.group.save').click()

                cy.getByTestId('component.drawer.setting.materials.code.error')
                    .should('be.visible')
                    .should('have.text', 'Código es obligatorio')

                cy.getByTestId('component.drawer.setting.materials.name.error').should(
                    'not.be.visible'
                )

                cy.getByTestId('component.drawer.setting.materials.unit.error').should(
                    'not.be.visible'
                )
            })

            it('should display errors if only the name is invalid', () => {
                cy.getByTestId('component.drawer.setting.materials.code').type('code')

                cy.getByTestId('component.drawer.setting.materials.unit').type('unit')

                cy.getByTestId('component.drawer.setting.materials.category')
                    .find('select')
                    .select('Material')

                cy.getByTestId('component.button.group.save').click()

                cy.getByTestId('component.drawer.setting.materials.name.error')
                    .should('be.visible')
                    .should('have.text', 'Nombre es obligatorio')

                cy.getByTestId('component.drawer.setting.materials.code.error').should(
                    'not.be.visible'
                )

                cy.getByTestId('component.drawer.setting.materials.unit.error').should(
                    'not.be.visible'
                )
            })

            it('should display error if only the unit is invalid', () => {
                cy.getByTestId('component.drawer.setting.materials.code').type('code')

                cy.getByTestId('component.drawer.setting.materials.name').type('name')

                cy.getByTestId('component.drawer.setting.materials.category')
                    .find('select')
                    .select('Material')

                cy.getByTestId('component.button.group.save').click()

                cy.getByTestId('component.drawer.setting.materials.unit.error')
                    .should('be.visible')
                    .should('have.text', 'Unidad es obligatorio')

                cy.getByTestId('component.drawer.setting.materials.code.error').should(
                    'not.be.visible'
                )

                cy.getByTestId('component.drawer.setting.materials.name.error').should(
                    'not.be.visible'
                )
            })

            it('should display error if only the category is invalid', () => {
                cy.getByTestId('component.drawer.setting.materials.code').type('code')

                cy.getByTestId('component.drawer.setting.materials.name').type('name')

                cy.getByTestId('component.drawer.setting.materials.unit').type('unit')

                cy.getByTestId('component.button.group.save').click()

                cy.getByTestId('component.drawer.setting.materials.code.error').should(
                    'not.be.visible'
                )

                cy.getByTestId('component.drawer.setting.materials.name.error').should(
                    'not.be.visible'
                )

                cy.getByTestId('component.drawer.setting.materials.unit.error').should(
                    'not.be.visible'
                )

                cy.getByTestId('component.drawer.setting.materials.category')
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

            cy.wrapper(
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
            )

            cy.getByTestId('component.drawertitle.title')
                .should('be.visible')
                .should('have.text', 'Editar Material')

            cy.getByTestId('component.drawer.setting.materials.code')
                .find('input')
                .should('be.visible')
                .should('not.be.disabled')
                .should('have.value', 'cem')

            cy.getByTestId('component.drawer.setting.materials.name')
                .find('input')
                .should('be.visible')
                .should('not.be.disabled')
                .should('have.value', 'Cement')

            cy.getByTestId('component.drawer.setting.materials.unit')
                .find('input')
                .should('be.visible')
                .should('not.be.disabled')
                .should('have.value', 'qq')

            cy.getByTestId('component.drawer.setting.materials.category')
                .find('select')
                .should('be.visible')
                .should('not.be.disabled')
                .invoke('val')
                .should('eq', '547c3c15-d285-4f6d-890f-de6acc962e79')

            cy.getByTestId('component.button.group.save')
                .should('be.visible')
                .should('have.text', 'Guardar')

            cy.getByTestId('component.button.group.cancel')
                .should('be.visible')
                .should('have.text', 'Cancelar')
        })
    })
})
