import { Provider } from 'react-redux'
import IndividualItem from '.'
import { testStore } from '../../../../redux/testStore'
import { MemoryRouter } from 'react-router-dom'

const cols = ['Código', 'Nombre', 'Unidad', 'Cantidad']
const title = ['code', 'name', 'unit', 'quantity']

describe('<IndividualItem />', () => {
    describe('Create an item', () => {
        beforeEach(() => {
            cy.intercept('GET', '**/parametros/rubros/crear', {
                statusCode: 200,
            }).as('item')
            cy.mount(
                <Provider store={testStore}>
                    <MemoryRouter initialEntries={['/parametros/rubros/crear']}>
                        <IndividualItem />
                    </MemoryRouter>
                </Provider>
            )
        })

        it('should display the page', () => {
            cy.get('[data-testid="page.parameters.item.detail.loading"]').should(
                'be.visible'
            )

            cy.wait('@item')
            cy.get('[data-testid="page.parameters.item.detail.loading"]').should(
                'not.exist'
            )
            cy.get('[data-testid="component.pagetitle.title"]')
                .should('be.visible')
                .should('have.text', 'Crear Rubro')

            cy.get('[data-testid="component.form.rubro.code"]')
                .should('be.visible')
                .find('label')
                .should('have.text', 'Código')

            cy.get('[data-testid="component.form.rubro.name"]')
                .should('be.visible')
                .find('label')
                .should('have.text', 'Nombre')

            cy.get('[data-testid="component.form.rubro.unit"]')
                .should('be.visible')
                .find('label')
                .should('have.text', 'Unidad')

            cy.get('[data-testid="component.button.group.save"]')
                .should('be.visible')
                .should('have.text', 'Guardar')

            cy.get('[data-testid="component.button.group.cancel"]')
                .should('be.visible')
                .should('have.text', 'Cancelar')
        })

        describe('should validate', () => {
            it('should validate all fields', () => {
                cy.get('[data-testid="component.button.group.save"]').click()

                cy.get('[data-testid="component.form.rubro.code.error"]')
                    .should('be.visible')
                    .should('have.text', 'Código es obligatorio')

                cy.get('[data-testid="component.form.rubro.name.error"]')
                    .should('be.visible')
                    .should('have.text', 'Nombre es obligatorio')

                cy.get('[data-testid="component.form.rubro.unit.error"]')
                    .should('be.visible')
                    .should('have.text', 'Unidad es obligatorio')
            })

            it('should validate only code', () => {
                cy.get('[data-testid="component.form.rubro.name"]').type('name')
                cy.get('[data-testid="component.form.rubro.unit"]').type('unit')

                cy.get('[data-testid="component.button.group.save"]').click()

                cy.get('[data-testid="component.form.rubro.code.error"]')
                    .should('be.visible')
                    .should('have.text', 'Código es obligatorio')

                cy.get('[data-testid="component.form.rubro.name.error"]').should(
                    'not.be.visible'
                )

                cy.get('[data-testid="component.form.rubro.unit.error"]').should(
                    'not.be.visible'
                )
            })

            it('should validate only name', () => {
                cy.get('[data-testid="component.form.rubro.code"]').type('code')
                cy.get('[data-testid="component.form.rubro.unit"]').type('unit')

                cy.get('[data-testid="component.button.group.save"]').click()

                cy.get('[data-testid="component.form.rubro.name.error"]')
                    .should('be.visible')
                    .should('have.text', 'Nombre es obligatorio')

                cy.get('[data-testid="component.form.rubro.code.error"]').should(
                    'not.be.visible'
                )

                cy.get('[data-testid="component.form.rubro.unit.error"]').should(
                    'not.be.visible'
                )
            })

            it('should validate only unit', () => {
                cy.get('[data-testid="component.form.rubro.code"]').type('code')
                cy.get('[data-testid="component.form.rubro.name"]').type('name')

                cy.get('[data-testid="component.button.group.save"]').click()

                cy.get('[data-testid="component.form.rubro.unit.error"]')
                    .should('be.visible')
                    .should('have.text', 'Unidad es obligatorio')

                cy.get('[data-testid="component.form.rubro.code.error"]').should(
                    'not.be.visible'
                )

                cy.get('[data-testid="component.form.rubro.name.error"]').should(
                    'not.be.visible'
                )
            })
        })
    })

    describe('update an item', () => {
        it('should display the page', () => {
            cy.intercept(
                'GET',
                '**/parametros/rubros/df344545-d20b-4e4c-97c6-6a8f65743abb',
                {
                    statusCode: 200,
                    fixture: 'parameters/rubros/getOneRubro.json',
                }
            ).as('item')
            cy.mount(
                <Provider store={testStore}>
                    <MemoryRouter
                        initialEntries={[
                            '/parametros/rubros/df344545-d20b-4e4c-97c6-6a8f65743abb',
                        ]}
                    >
                        <IndividualItem />
                    </MemoryRouter>
                </Provider>
            )
            cy.get('[data-testid="page.parameters.item.detail.loading"]').should(
                'be.visible'
            )

            cy.wait('@item')
            cy.get('[data-testid="page.parameters.item.detail.loading"]').should(
                'not.exist'
            )
            cy.get('[data-testid="component.pagetitle.title"]')
                .should('be.visible')
                .should('have.text', 'Editar Rubro')

            cy.get('[data-testid="component.form.rubro.code"]')
                .should('be.visible')
                .find('input')
                .should('have.value', 'h210')

            cy.get('[data-testid="component.form.rubro.name"]')
                .should('be.visible')
                .find('input')
                .should('have.value', 'Hormigon fc=210 kg/cm2')

            cy.get('[data-testid="component.form.rubro.unit"]')
                .should('be.visible')
                .find('input')
                .should('have.value', 'm3')

            cy.get('[data-testid="component.button.group.save"]')
                .should('be.visible')
                .should('have.text', 'Guardar')

            cy.get('[data-testid="component.button.group.cancel"]')
                .should('be.visible')
                .should('have.text', 'Cancelar')

            cy.get('[data-testid="component.table.header.toolbar.main"]')
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
