import BudgetItemDrawer from './BudgetItemDrawer'

describe('<BudgetItemDrawer />', () => {
    describe('Create Budget Item', () => {
        beforeEach(() => {
            cy.wrapper(
                <BudgetItemDrawer
                    open={true}
                    onClose={(): void => { }}
                    defaultValues={{
                        id: '',
                        code: '',
                        name: '',
                        accumulate: false,
                    }}
                />
            )
        })

        it('should display the drawer', () => {
            cy.getByTestId('component.drawertitle.title')
                .should('be.visible')
                .should('have.text', 'Crear Partida')

            cy.getByTestId('component.drawer.settings.budget.item.code')
                .find('label')
                .should('exist')
                .should('have.text', 'Código')

            cy.getByTestId('component.drawer.settings.budget.item.name')
                .find('label')
                .should('exist')
                .should('have.text', 'Nombre')

            cy.getByTestId('component.drawer.settings.budget.item.parent').should(
                'be.visible'
            )

            cy.getByTestId('component.drawer.settings.budget.item.accumulate')
                .should('be.visible')
                .should('have.text', 'Acumula')

            cy.getByTestId('component.button.group.save')
                .should('be.visible')
                .should('have.text', 'Guardar')

            cy.getByTestId('component.button.group.cancel')
                .should('be.visible')
                .should('have.text', 'Cancelar')
        })

        describe('data validation after submit', () => {
            it('show all the errors', () => {
                cy.getByTestId('component.button.group.save').click()

                cy.getByTestId('component.drawer.settings.budget.item.code.error')
                    .should('be.visible')
                    .should('have.text', 'Código es obligatorio')

                cy.getByTestId('component.drawer.settings.budget.item.name.error')
                    .should('be.visible')
                    .should('have.text', 'Nombre es obligatorio')
            })

            it('should show an error if only code is not entered', () => {
                cy.getByTestId('component.drawer.settings.budget.item.name').type(
                    'Budget Item Name'
                )
                cy.getByTestId('component.button.group.save').click()

                cy.getByTestId('component.drawer.settings.budget.item.code.error')
                    .should('be.visible')
                    .should('have.text', 'Código es obligatorio')

                cy.getByTestId(
                    'component.drawer.settings.budget.item.name.error'
                ).should('not.be.visible')
            })

            it('should show an error if only code is not entered', () => {
                cy.getByTestId('component.drawer.settings.budget.item.code').type(
                    'code'
                )
                cy.getByTestId('component.button.group.save').click()

                cy.getByTestId('component.drawer.settings.budget.item.name.error')
                    .should('be.visible')
                    .should('have.text', 'Nombre es obligatorio')

                cy.getByTestId(
                    'component.drawer.settings.budget.item.code.error'
                ).should('not.be.visible')
            })
        })
    })

    describe('Edit a budget item', () => {
        it('should display all the fields with no parent', () => {
            cy.wrapper(
                <BudgetItemDrawer
                    open={true}
                    onClose={(): void => { }}
                    defaultValues={{
                        id: '661129c8-f4ac-4a9a-b484-c40f9ec4d3e4',
                        code: '200',
                        name: 'Gastos Generales',
                        accumulate: true,
                    }}
                />
            )
            cy.getByTestId('component.drawertitle.title')
                .should('be.visible')
                .should('have.text', 'Editar Partida')

            cy.getByTestId('component.drawer.settings.budget.item.code')
                .find('input')
                .should('be.visible')
                .should('have.value', '200')

            cy.getByTestId('component.drawer.settings.budget.item.name')
                .find('input')
                .should('be.visible')
                .should('have.value', 'Gastos Generales')

            cy.getByTestId('component.drawer.settings.budget.item.parent')
                .find('select')
                .should('be.disabled')
                .invoke('val')
                .should('eq', '')

            cy.getByTestId('component.drawer.settings.budget.item.accumulate')
                .find('input')
                .should('be.checked')

            cy.getByTestId('component.button.group.save')
                .should('be.visible')
                .should('have.text', 'Guardar')

            cy.getByTestId('component.button.group.cancel')
                .should('be.visible')
                .should('have.text', 'Cancelar')
        })

        it('should display all the fields with a parent', () => {
            cy.intercept('GET', '**parametros/partidas**', {
                statusCode: 200,
                fixture: 'parameters/budget_items/accum.json',
            }).as('budgetItem')

            cy.wrapper(
                <BudgetItemDrawer
                    open={true}
                    onClose={(): void => { }}
                    defaultValues={{
                        id: '661129c8-f4ac-4a9a-b484-c40f9ec4d3e4',
                        code: '200',
                        name: 'Gastos Generales',
                        accumulate: false,
                        parent_id: '8ba2d916-549f-4e8c-9694-04892ca8f2d8',
                    }}
                />
            )

            cy.wait('@budgetItem')
            cy.getByTestId('component.drawertitle.title')
                .should('be.visible')
                .should('have.text', 'Editar Partida')

            cy.getByTestId('component.drawer.settings.budget.item.code')
                .find('input')
                .should('be.visible')
                .should('have.value', '200')

            cy.getByTestId('component.drawer.settings.budget.item.name')
                .find('input')
                .should('be.visible')
                .should('have.value', 'Gastos Generales')

            cy.getByTestId('component.drawer.settings.budget.item.parent')
                .find('select')
                .should('be.disabled')
                .invoke('val')
                .should('eq', '8ba2d916-549f-4e8c-9694-04892ca8f2d8')

            cy.getByTestId('component.drawer.settings.budget.item.accumulate')
                .find('input')
                .should('not.be.checked')

            cy.getByTestId('component.button.group.save')
                .should('be.visible')
                .should('have.text', 'Guardar')

            cy.getByTestId('component.button.group.cancel')
                .should('be.visible')
                .should('have.text', 'Cancelar')
        })
    })
})
