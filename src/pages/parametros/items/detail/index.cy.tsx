import IndividualItem from '.'

const cols = ['Código', 'Nombre', 'Unidad', 'Cantidad']
const title = ['code', 'name', 'unit', 'quantity']

describe('<IndividualItem />', () => {
    describe('Create an item', () => {
        beforeEach(() => {
            cy.intercept('GET', '**/parametros/rubros/crear', {
                statusCode: 200,
            }).as('item')
            cy.pageWrapper(<IndividualItem />, ['/parametros/rubros/crear'])
        })

        it('should display the page', () => {
            cy.getByTestId('page.parameters.item.detail.loading').should('be.visible')

            cy.wait('@item')
            cy.getByTestId('page.parameters.item.detail.loading').should('not.exist')
            cy.getByTestId('component.pagetitle.title')
                .should('be.visible')
                .should('have.text', 'Crear Rubro')

            cy.getByTestId('component.form.rubro.code')
                .should('be.visible')
                .find('label')
                .should('have.text', 'Código')

            cy.getByTestId('component.form.rubro.name')
                .should('be.visible')
                .find('label')
                .should('have.text', 'Nombre')

            cy.getByTestId('component.form.rubro.unit')
                .should('be.visible')
                .find('label')
                .should('have.text', 'Unidad')

            cy.getByTestId('component.button.group.save')
                .should('be.visible')
                .should('have.text', 'Guardar')

            cy.getByTestId('component.button.group.cancel')
                .should('be.visible')
                .should('have.text', 'Cancelar')
        })

        describe('should validate', () => {
            it('should validate all fields', () => {
                cy.getByTestId('component.button.group.save').click()

                cy.getByTestId('component.form.rubro.code.error')
                    .should('be.visible')
                    .should('have.text', 'Código es obligatorio')

                cy.getByTestId('component.form.rubro.name.error')
                    .should('be.visible')
                    .should('have.text', 'Nombre es obligatorio')

                cy.getByTestId('component.form.rubro.unit.error')
                    .should('be.visible')
                    .should('have.text', 'Unidad es obligatorio')
            })

            it('should validate only code', () => {
                cy.getByTestId('component.form.rubro.name').type('name')
                cy.getByTestId('component.form.rubro.unit').type('unit')

                cy.getByTestId('component.button.group.save').click()

                cy.getByTestId('component.form.rubro.code.error')
                    .should('be.visible')
                    .should('have.text', 'Código es obligatorio')

                cy.getByTestId('component.form.rubro.name.error').should(
                    'not.be.visible'
                )

                cy.getByTestId('component.form.rubro.unit.error').should(
                    'not.be.visible'
                )
            })

            it('should validate only name', () => {
                cy.getByTestId('component.form.rubro.code').type('code')
                cy.getByTestId('component.form.rubro.unit').type('unit')

                cy.getByTestId('component.button.group.save').click()

                cy.getByTestId('component.form.rubro.name.error')
                    .should('be.visible')
                    .should('have.text', 'Nombre es obligatorio')

                cy.getByTestId('component.form.rubro.code.error').should(
                    'not.be.visible'
                )

                cy.getByTestId('component.form.rubro.unit.error').should(
                    'not.be.visible'
                )
            })

            it('should validate only unit', () => {
                cy.getByTestId('component.form.rubro.code').type('code')
                cy.getByTestId('component.form.rubro.name').type('name')

                cy.getByTestId('component.button.group.save').click()

                cy.getByTestId('component.form.rubro.unit.error')
                    .should('be.visible')
                    .should('have.text', 'Unidad es obligatorio')

                cy.getByTestId('component.form.rubro.code.error').should(
                    'not.be.visible'
                )

                cy.getByTestId('component.form.rubro.name.error').should(
                    'not.be.visible'
                )
            })
        })
    })

    describe('update an item', () => {
        it('should display the page', () => {
            cy.intercept('GET', '**/parametros/materiales', {
                statusCode: 200,
                fixture: 'parameters/materials/getAllMaterials.json',
            }).as('material')

            cy.intercept(
                'GET',
                '**/parametros/rubros/df344545-d20b-4e4c-97c6-6a8f65743abb/materiales',
                {
                    statusCode: 200,
                    fixture: 'parameters/rubros/getAllRubroMaterial.json',
                }
            ).as('rubromaterial')

            cy.intercept(
                'GET',
                '**/parametros/rubros/df344545-d20b-4e4c-97c6-6a8f65743abb',
                {
                    statusCode: 200,
                    fixture: 'parameters/rubros/getOneRubro.json',
                }
            ).as('item')
            cy.pageWrapper(<IndividualItem />, [
                '/parametros/rubros/df344545-d20b-4e4c-97c6-6a8f65743abb',
            ])

            cy.getByTestId('page.parameters.item.detail.loading').should('be.visible')

            cy.wait(['@item', '@rubromaterial', '@material'])
            cy.getByTestId('page.parameters.item.detail.loading').should('not.exist')
            cy.getByTestId('component.pagetitle.title')
                .should('be.visible')
                .should('have.text', 'Editar Rubro')

            cy.getByTestId('component.form.rubro.code')
                .should('be.visible')
                .find('input')
                .should('have.value', 'h210')

            cy.getByTestId('component.form.rubro.name')
                .should('be.visible')
                .find('input')
                .should('have.value', 'Hormigon fc=210 kg/cm2')

            cy.getByTestId('component.form.rubro.unit')
                .should('be.visible')
                .find('input')
                .should('have.value', 'm3')

            cy.getByTestId('component.button.group.save')
                .should('be.visible')
                .should('have.text', 'Guardar')

            cy.getByTestId('component.button.group.cancel')
                .should('be.visible')
                .should('have.text', 'Cancelar')

            cy.getByTestId('component.table.header.toolbar.main')
                .should('be.visible')
                .should('have.text', 'Agregar Material')

            for (var i = 0; i < cols.length; i++) {
                cy.get(`[data-field="${title[i]}"]`)
                    .find('.MuiDataGrid-columnHeaderTitle')
                    .should('have.text', cols[i])
            }
        })
    })
})
