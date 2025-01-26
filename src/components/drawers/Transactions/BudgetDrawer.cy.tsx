import TestAppWrapper from '../../wrappers/TestAppWraper'
import BudgetDrawer from './BudgetDrawer'

describe('<BudgetDrawer />', () => {
    describe('create budget', () => {
        beforeEach(() => {
            cy.intercept('GET', '**/parametros/proyectos**', {
                statusCode: 200,
                fixture: 'parameters/projects/active.json',
            }).as('projects')

            cy.intercept('GET', '**/parametros/partidas**', {
                statusCode: 200,
                fixture: 'parameters/budget_items/nonaccum.json',
            }).as('items')

            cy.mount(
                <TestAppWrapper>
                    <BudgetDrawer
                        open={true}
                        onClose={() => { }}
                        defaultValues={{
                            project_id: '',
                            budget_item_id: '',
                            quantity: 0,
                            cost: 0,
                            total: 0,
                        }}
                    />
                </TestAppWrapper>
            )
        })

        it('should show the drawer', () => {
            cy.wait(['@items', '@projects'])
            cy.get('[data-testid="component.drawertitle.title"]')
                .should('be.visible')
                .should('have.text', 'Crear Presupuesto')

            cy.get('[data-testid="component.drawer.budget.project"]').should(
                'be.visible'
            )

            cy.get('[data-testid="component.drawer.budget.budget_item"]').should(
                'be.visible'
            )

            cy.get('[data-testid="component.drawer.budget.quantity"]')
                .should('be.visible')
                .should('not.be.disabled')
            cy.get('[data-testid="component.drawer.budget.quantity"]')
                .find('label')
                .should('be.visible')
                .should('have.text', 'Cantidad')
            cy.get('[data-testid="component.drawer.budget.quantity"]')
                .find('input')
                .should('be.visible')
                .should('have.value', '0')

            cy.get('[data-testid="component.drawer.budget.cost"]')
                .should('be.visible')
                .should('not.be.disabled')
            cy.get('[data-testid="component.drawer.budget.cost"]')
                .find('label')
                .should('be.visible')
                .should('have.text', 'Costo')
            cy.get('[data-testid="component.drawer.budget.cost"]')
                .find('input')
                .should('be.visible')
                .should('have.value', '0')

            cy.get('[data-testid="component.drawer.budget.total"]').should(
                'be.visible'
            )
            cy.get('[data-testid="component.drawer.budget.total"]')
                .find('label')
                .should('be.visible')
                .should('have.text', 'Total')
            cy.get('[data-testid="component.drawer.budget.total"]')
                .find('input')
                .should('be.visible')
                .should('be.disabled')
                .should('have.value', '0')

            cy.get('[data-testid="component.button.group.save"]')
                .should('be.visible')
                .should('have.text', 'Guardar')

            cy.get('[data-testid="component.button.group.cancel"]')
                .should('be.visible')
                .should('have.text', 'Cancelar')
        })

        describe('validate input data', () => {
            describe('should multiply the quantity and cost', () => {
                it('should use decimals in both quantity and cost', () => {
                    cy.get('[data-testid="component.drawer.budget.quantity"]').type(
                        '1.234'
                    )
                    cy.get('[data-testid="component.drawer.budget.cost"]').type('1.234')

                    cy.get('[data-testid="component.drawer.budget.total"]')
                        .find('input')
                        .should('be.visible')
                        .should('be.disabled')
                        .should('have.value', '1.522756')
                })
            })

            describe('before submiting', () => {
                it('enters the quantity wrong', () => {
                    cy.get('[data-testid="component.drawer.budget.quantity"]').type('bad')
                    cy.get('[data-testid="component.drawer.budget.cost"]').type('1.234')

                    cy.get('[data-testid="component.drawer.budget.total"]')
                        .find('input')
                        .should('be.visible')
                        .should('be.disabled')
                        .should('have.value', '0')
                })

                it('enters the cost wrong', () => {
                    cy.get('[data-testid="component.drawer.budget.quantity"]').type(
                        '1.234'
                    )
                    cy.get('[data-testid="component.drawer.budget.cost"]').type('bad')

                    cy.get('[data-testid="component.drawer.budget.total"]')
                        .find('input')
                        .should('be.visible')
                        .should('be.disabled')
                        .should('have.value', '0')
                })

                it('enters the cost and quantity wrong', () => {
                    cy.get('[data-testid="component.drawer.budget.quantity"]').type('bad')
                    cy.get('[data-testid="component.drawer.budget.cost"]').type('bad')

                    cy.get('[data-testid="component.drawer.budget.total"]')
                        .find('input')
                        .should('be.visible')
                        .should('be.disabled')
                        .should('have.value', '0')
                })
            })

            describe('submit', () => {
                it('should error with all fieds invalid', () => {
                    cy.get('[data-testid="component.drawer.budget.quantity"]').type('bad')
                    cy.get('[data-testid="component.drawer.budget.cost"]').type('bad')

                    cy.get('[data-testid="component.button.group.save"]').click()

                    cy.get('.project_id')
                        .should('be.visible')
                        .should('have.text', 'Seleccione un proyecto')

                    cy.get('.budget_item_id')
                        .should('be.visible')
                        .should('have.text', 'Seleccione una partida')

                    cy.get('[data-testid="component.drawer.budget.quantity.error"]')
                        .should('be.visible')
                        .should('have.text', 'La cantidad debe ser un número')

                    cy.get('[data-testid="component.drawer.budget.cost.error"]')
                        .should('be.visible')
                        .should('have.text', 'El costo debe ser un número')
                })

                it('should error if only the project is invalid', () => {
                    cy.get('[data-testid="component.drawer.budget.budget_item"]')
                        .find('select')
                        .select('Project manager')
                    cy.get('[data-testid="component.drawer.budget.quantity"]').type('10')
                    cy.get('[data-testid="component.drawer.budget.cost"]').type('10')

                    cy.get('[data-testid="component.button.group.save"]').click()

                    cy.get('.project_id')
                        .should('be.visible')
                        .should('have.text', 'Seleccione un proyecto')

                    cy.get('[data-testid="component.drawer.budget.total"]')
                        .find('input')
                        .should('be.visible')
                        .should('be.disabled')
                        .should('have.value', '100')
                })

                it('should error if only the budget item is invalid', () => {
                    cy.get('[data-testid="component.drawer.budget.project"]')
                        .find('select')
                        .select('Test Project 1')
                    cy.get('[data-testid="component.drawer.budget.quantity"]').type('10')
                    cy.get('[data-testid="component.drawer.budget.cost"]').type('20')

                    cy.get('[data-testid="component.button.group.save"]').click()

                    cy.get('[data-testid="component.drawer.budget.total"]')
                        .find('input')
                        .should('be.visible')
                        .should('be.disabled')
                        .should('have.value', '200')

                    cy.get('.budget_item_id')
                        .should('be.visible')
                        .should('have.text', 'Seleccione una partida')
                })

                it('should error if invalid quantity', () => {
                    cy.get('[data-testid="component.drawer.budget.budget_item"]')
                        .find('select')
                        .select('Project manager')
                    cy.get('[data-testid="component.drawer.budget.project"]')
                        .find('select')
                        .select('Test Project 1')
                    cy.get('[data-testid="component.drawer.budget.quantity"]').type(
                        'sdkl'
                    )
                    cy.get('[data-testid="component.drawer.budget.cost"]').type('20')

                    cy.get('[data-testid="component.button.group.save"]').click()
                    cy.get('[data-testid="component.drawer.budget.quantity.error"]')
                        .should('exist')
                        .should('have.text', 'La cantidad debe ser un número')
                })

                it('should error if invalid cost', () => {
                    cy.get('[data-testid="component.drawer.budget.budget_item"]')
                        .find('select')
                        .select('Project manager')
                    cy.get('[data-testid="component.drawer.budget.project"]')
                        .find('select')
                        .select('Test Project 1')
                    cy.get('[data-testid="component.drawer.budget.cost"]').type('sdkl')
                    cy.get('[data-testid="component.drawer.budget.quantity"]').type('20')

                    cy.get('[data-testid="component.button.group.save"]').click()
                    cy.get('[data-testid="component.drawer.budget.cost.error"]')
                        .should('exist')
                        .should('have.text', 'El costo debe ser un número')
                })
            })
        })
    })

    describe('create budget', () => {
        it('should display all values', () => {
            cy.intercept('GET', '**/parametros/proyectos**', {
                statusCode: 200,
                fixture: 'parameters/projects/active.json',
            }).as('projects')

            cy.intercept('GET', '**/parametros/partidas**', {
                statusCode: 200,
                fixture: 'parameters/budget_items/nonaccum.json',
            }).as('items')

            cy.mount(
                <TestAppWrapper>
                    <BudgetDrawer
                        open={true}
                        onClose={() => { }}
                        defaultValues={{
                            project_id: 'e4b2eaf2-1d98-4493-bf2d-15938ef3057b',
                            budget_item_id: '3c10969f-b514-4a8c-a934-fc0438766492',
                            quantity: 10,
                            cost: 12.45,
                            total: 124.5,
                        }}
                    />
                </TestAppWrapper>
            )
            cy.get('[data-testid="component.drawertitle.title"]')
                .should('be.visible')
                .should('have.text', 'Editar Presupuesto')

            cy.get('[data-testid="component.drawer.budget.project"]')
                .find('select')
                .should('be.visible')
                .should('be.disabled')
                .invoke('val')
                .should('eq', 'e4b2eaf2-1d98-4493-bf2d-15938ef3057b')

            cy.get('[data-testid="component.drawer.budget.budget_item"]')
                .find('select')
                .should('be.visible')
                .should('be.disabled')
                .invoke('val')
                .should('eq', '3c10969f-b514-4a8c-a934-fc0438766492')

            cy.get('[data-testid="component.drawer.budget.quantity"]')
                .find('label')
                .should('be.visible')
                .should('have.text', 'Cantidad')
            cy.get('[data-testid="component.drawer.budget.quantity"]')
                .find('input')
                .should('be.visible')
                .should('not.be.disabled')
                .should('have.value', '10')

            cy.get('[data-testid="component.drawer.budget.cost"]')
                .find('label')
                .should('be.visible')
                .should('have.text', 'Costo')
            cy.get('[data-testid="component.drawer.budget.cost"]')
                .find('input')
                .should('be.visible')
                .should('not.be.disabled')
                .should('have.value', '12.45')

            cy.get('[data-testid="component.drawer.budget.total"]')
                .find('label')
                .should('be.visible')
                .should('have.text', 'Total')
            cy.get('[data-testid="component.drawer.budget.total"]')
                .find('input')
                .should('be.visible')
                .should('be.disabled')
                .should('have.value', '124.5')

            cy.get('[data-testid="component.button.group.save"]')
                .should('be.visible')
                .should('have.text', 'Guardar')

            cy.get('[data-testid="component.button.group.cancel"]')
                .should('be.visible')
                .should('have.text', 'Cancelar')
        })
    })
})
