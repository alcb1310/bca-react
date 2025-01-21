import { BudgetEditType } from '../../../types/budget'
import TestAppWrapper from '../../wrappers/TestAppWraper'
import BudgetDrawer from './BudgetDrawer'

var defaultValues: BudgetEditType = {
    project_id: '',
    budget_item_id: '',
    quantity: 0,
    cost: 0,
    total: 0,
}

describe('<BudgetDrawer />', () => {
    beforeEach(() => {
        cy.mount(
            <TestAppWrapper>
                <BudgetDrawer
                    open={true}
                    onClose={() => { }}
                    defaultValues={defaultValues}
                />
            </TestAppWrapper>
        )
    })

    it('should show the drawer', () => {
        cy.get('[data-testid="component.drawertitle.title"]')
            .should('be.visible')
            .should('have.text', 'Proyectos')

        cy.get('[data-testid="component.drawer.budget.project"]')
            .should('be.visible')
            .should('have.text', 'Seleccione un proyecto')

        cy.get('[data-testid="component.drawer.budget.budget_item"]')
            .should('be.visible')
            .should('have.text', 'Seleccione una partida')

        cy.get('[data-testid="component.drawer.budget.quantity"]')
            .should('be.visible')
            .should('not.be.disabled')
        cy.get('[data-testid="component.drawer.budget.quantity"] > label')
            .should('be.visible')
            .should('have.text', 'Cantidad')
        cy.get(
            '[data-testid="component.drawer.budget.quantity"] > .MuiInputBase-root > input'
        )
            .should('be.visible')
            .should('have.value', '0')

        cy.get('[data-testid="component.drawer.budget.cost"]')
            .should('be.visible')
            .should('not.be.disabled')
        cy.get('[data-testid="component.drawer.budget.cost"] > label')
            .should('be.visible')
            .should('have.text', 'Costo')
        cy.get(
            '[data-testid="component.drawer.budget.cost"] > .MuiInputBase-root > input'
        )
            .should('be.visible')
            .should('have.value', '0')

        cy.get('[data-testid="component.drawer.budget.total"]').should('be.visible')
        cy.get('[data-testid="component.drawer.budget.total"] > label')
            .should('be.visible')
            .should('have.text', 'Total')
        cy.get(
            '[data-testid="component.drawer.budget.total"] > .MuiInputBase-root > input'
        )
            .should('be.visible')
            .should('have.class', 'Mui-disabled')
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
                cy.get('[data-testid="component.drawer.budget.quantity"]').type('1.234')
                cy.get('[data-testid="component.drawer.budget.cost"]').type('1.234')

                cy.get(
                    '[data-testid="component.drawer.budget.total"] > .MuiInputBase-root > input'
                )
                    .should('be.visible')
                    .should('have.class', 'Mui-disabled')
                    .should('have.value', '1.522756')
            })
        })

        describe('should total 0 if a non number is entered either in quantity or cost', () => {
            it('enters the quantity wrong', () => {
                cy.get('[data-testid="component.drawer.budget.quantity"]').type('bad')
                cy.get('[data-testid="component.drawer.budget.cost"]').type('1.234')

                cy.get(
                    '[data-testid="component.drawer.budget.total"] > .MuiInputBase-root > input'
                )
                    .should('be.visible')
                    .should('have.class', 'Mui-disabled')
                    .should('have.value', '0')
            })

            it('enters the cost wrong', () => {
                cy.get('[data-testid="component.drawer.budget.quantity"]').type('1.234')
                cy.get('[data-testid="component.drawer.budget.cost"]').type('bad')

                cy.get(
                    '[data-testid="component.drawer.budget.total"] > .MuiInputBase-root > input'
                )
                    .should('be.visible')
                    .should('have.class', 'Mui-disabled')
                    .should('have.value', '0')
            })

            it('enters the cost and quantity wrong', () => {
                cy.get('[data-testid="component.drawer.budget.quantity"]').type('bad')
                cy.get('[data-testid="component.drawer.budget.cost"]').type('bad')

                cy.get(
                    '[data-testid="component.drawer.budget.total"] > .MuiInputBase-root > input'
                )
                    .should('be.visible')
                    .should('have.class', 'Mui-disabled')
                    .should('have.value', '0')
            })
        })
    })
})
