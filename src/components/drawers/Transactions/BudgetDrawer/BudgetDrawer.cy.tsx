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

            cy.wrapper(
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
            )
        })

        it('should show the drawer', () => {
            cy.wait(['@items', '@projects'])
            cy.getByTestId('component.drawertitle.title')
                .should('be.visible')
                .should('have.text', 'Crear Presupuesto')

            cy.getByTestId('component.drawer.budget.project').should('be.visible')

            cy.getByTestId('component.drawer.budget.budget_item').should('be.visible')

            cy.getByTestId('component.drawer.budget.quantity')
                .should('be.visible')
                .should('not.be.disabled')
            cy.getByTestId('component.drawer.budget.quantity')
                .find('label')
                .should('be.visible')
                .should('have.text', 'Cantidad')
            cy.getByTestId('component.drawer.budget.quantity')
                .find('input')
                .should('be.visible')
                .should('have.value', '0')

            cy.getByTestId('component.drawer.budget.cost')
                .should('be.visible')
                .should('not.be.disabled')
            cy.getByTestId('component.drawer.budget.cost')
                .find('label')
                .should('be.visible')
                .should('have.text', 'Costo')
            cy.getByTestId('component.drawer.budget.cost')
                .find('input')
                .should('be.visible')
                .should('have.value', '0')

            cy.getByTestId('component.drawer.budget.total').should('be.visible')
            cy.getByTestId('component.drawer.budget.total')
                .find('label')
                .should('be.visible')
                .should('have.text', 'Total')
            cy.getByTestId('component.drawer.budget.total')
                .find('input')
                .should('be.visible')
                .should('be.disabled')
                .should('have.value', '0')

            cy.getByTestId('component.button.group.save')
                .should('be.visible')
                .should('have.text', 'Guardar')

            cy.getByTestId('component.button.group.cancel')
                .should('be.visible')
                .should('have.text', 'Cancelar')
        })

        describe('validate input data', () => {
            describe('should multiply the quantity and cost', () => {
                it('should use decimals in both quantity and cost', () => {
                    cy.getByTestId('component.drawer.budget.quantity').type('1.234')
                    cy.getByTestId('component.drawer.budget.cost').type('1.234')

                    cy.getByTestId('component.drawer.budget.total')
                        .find('input')
                        .should('be.visible')
                        .should('be.disabled')
                        .should('have.value', '1.522756')
                })
            })

            describe('before submiting', () => {
                it('enters the quantity wrong', () => {
                    cy.getByTestId('component.drawer.budget.quantity').type('bad')
                    cy.getByTestId('component.drawer.budget.cost').type('1.234')

                    cy.getByTestId('component.drawer.budget.total')
                        .find('input')
                        .should('be.visible')
                        .should('be.disabled')
                        .should('have.value', '0')
                })

                it('enters the cost wrong', () => {
                    cy.getByTestId('component.drawer.budget.quantity').type('1.234')
                    cy.getByTestId('component.drawer.budget.cost').type('bad')

                    cy.getByTestId('component.drawer.budget.total')
                        .find('input')
                        .should('be.visible')
                        .should('be.disabled')
                        .should('have.value', '0')
                })

                it('enters the cost and quantity wrong', () => {
                    cy.getByTestId('component.drawer.budget.quantity').type('bad')
                    cy.getByTestId('component.drawer.budget.cost').type('bad')

                    cy.getByTestId('component.drawer.budget.total')
                        .find('input')
                        .should('be.visible')
                        .should('be.disabled')
                        .should('have.value', '0')
                })
            })

            describe('submit', () => {
                it('should error with all fieds invalid', () => {
                    cy.getByTestId('component.drawer.budget.quantity').type('bad')
                    cy.getByTestId('component.drawer.budget.cost').type('bad')

                    cy.getByTestId('component.button.group.save').click()

                    cy.get('.project_id')
                        .should('be.visible')
                        .should('have.text', 'Seleccione un proyecto')

                    cy.get('.budget_item_id')
                        .should('be.visible')
                        .should('have.text', 'Seleccione una partida')

                    cy.getByTestId('component.drawer.budget.quantity.error')
                        .should('be.visible')
                        .should('have.text', 'La cantidad debe ser un número')

                    cy.getByTestId('component.drawer.budget.cost.error')
                        .should('be.visible')
                        .should('have.text', 'El costo debe ser un número')
                })

                it('should error if only the project is invalid', () => {
                    cy.getByTestId('component.drawer.budget.budget_item')
                        .find('select')
                        .select('Project manager')
                    cy.getByTestId('component.drawer.budget.quantity').type('10')
                    cy.getByTestId('component.drawer.budget.cost').type('10')

                    cy.getByTestId('component.button.group.save').click()

                    cy.get('.project_id')
                        .should('be.visible')
                        .should('have.text', 'Seleccione un proyecto')

                    cy.getByTestId('component.drawer.budget.total')
                        .find('input')
                        .should('be.visible')
                        .should('be.disabled')
                        .should('have.value', '100')
                })

                it('should error if only the budget item is invalid', () => {
                    cy.getByTestId('component.drawer.budget.project')
                        .find('select')
                        .select('Test Project 1')
                    cy.getByTestId('component.drawer.budget.quantity').type('10')
                    cy.getByTestId('component.drawer.budget.cost').type('20')

                    cy.getByTestId('component.button.group.save').click()

                    cy.getByTestId('component.drawer.budget.total')
                        .find('input')
                        .should('be.visible')
                        .should('be.disabled')
                        .should('have.value', '200')

                    cy.get('.budget_item_id')
                        .should('be.visible')
                        .should('have.text', 'Seleccione una partida')
                })

                it('should error if invalid quantity', () => {
                    cy.getByTestId('component.drawer.budget.budget_item')
                        .find('select')
                        .select('Project manager')
                    cy.getByTestId('component.drawer.budget.project')
                        .find('select')
                        .select('Test Project 1')
                    cy.getByTestId('component.drawer.budget.quantity').type('sdkl')
                    cy.getByTestId('component.drawer.budget.cost').type('20')

                    cy.getByTestId('component.button.group.save').click()
                    cy.getByTestId('component.drawer.budget.quantity.error')
                        .should('exist')
                        .should('have.text', 'La cantidad debe ser un número')
                })

                it('should error if invalid cost', () => {
                    cy.getByTestId('component.drawer.budget.budget_item')
                        .find('select')
                        .select('Project manager')
                    cy.getByTestId('component.drawer.budget.project')
                        .find('select')
                        .select('Test Project 1')
                    cy.getByTestId('component.drawer.budget.cost').type('sdkl')
                    cy.getByTestId('component.drawer.budget.quantity').type('20')

                    cy.getByTestId('component.button.group.save').click()
                    cy.getByTestId('component.drawer.budget.cost.error')
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

            cy.wrapper(
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
            )
            cy.getByTestId('component.drawertitle.title')
                .should('be.visible')
                .should('have.text', 'Editar Presupuesto')

            cy.getByTestId('component.drawer.budget.project')
                .find('select')
                .should('be.visible')
                .should('be.disabled')
                .invoke('val')
                .should('eq', 'e4b2eaf2-1d98-4493-bf2d-15938ef3057b')

            cy.getByTestId('component.drawer.budget.budget_item')
                .find('select')
                .should('be.visible')
                .should('be.disabled')
                .invoke('val')
                .should('eq', '3c10969f-b514-4a8c-a934-fc0438766492')

            cy.getByTestId('component.drawer.budget.quantity')
                .find('label')
                .should('be.visible')
                .should('have.text', 'Cantidad')
            cy.getByTestId('component.drawer.budget.quantity')
                .find('input')
                .should('be.visible')
                .should('not.be.disabled')
                .should('have.value', '10')

            cy.getByTestId('component.drawer.budget.cost')
                .find('label')
                .should('be.visible')
                .should('have.text', 'Costo')
            cy.getByTestId('component.drawer.budget.cost')
                .find('input')
                .should('be.visible')
                .should('not.be.disabled')
                .should('have.value', '12.45')

            cy.getByTestId('component.drawer.budget.total')
                .find('label')
                .should('be.visible')
                .should('have.text', 'Total')
            cy.getByTestId('component.drawer.budget.total')
                .find('input')
                .should('be.visible')
                .should('be.disabled')
                .should('have.value', '124.5')

            cy.getByTestId('component.button.group.save')
                .should('be.visible')
                .should('have.text', 'Guardar')

            cy.getByTestId('component.button.group.cancel')
                .should('be.visible')
                .should('have.text', 'Cancelar')
        })
    })
})
