import TestAppWrapper from '../../../wrappers/TestAppWraper'
import BudgetItemDrawer from './BudgetItemDrawer'

describe('<BudgetItemDrawer />', () => {
    beforeEach(() => {
        cy.mount(
            <TestAppWrapper>
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
            </TestAppWrapper>
        )
    })

    it('should display the drawer', () => {
        cy.get('[data-testid="component.drawertitle.title"]')
            .should('be.visible')
            .should('have.text', 'Crear Partida')

        cy.get('[data-testid="component.drawer.settings.budget.item.code"] > label')
            .should('exist')
            .should('have.text', 'Código')

        cy.get('[data-testid="component.drawer.settings.budget.item.name"] > label')
            .should('exist')
            .should('have.text', 'Nombre')

        cy.get(
            '[data-testid="component.drawer.settings.budget.item.parent"]'
        ).should('be.visible')

        cy.get('[data-testid="component.drawer.settings.budget.item.accumulate"]')
            .should('be.visible')
            .should('have.text', 'Acumula')

        cy.get('[data-testid="component.button.group.save"]')
            .should('be.visible')
            .should('have.text', 'Guardar')

        cy.get('[data-testid="component.button.group.cancel"]')
            .should('be.visible')
            .should('have.text', 'Cancelar')
    })

    describe('data validation after submit', () => {
        it('show all the errors', () => {
            cy.get('[data-testid="component.button.group.save"]').click()

            cy.get('[data-testid="component.drawer.settings.budget.item.code.error"]')
                .should('be.visible')
                .should('have.text', 'Código es obligatorio')

            cy.get('[data-testid="component.drawer.settings.budget.item.name.error"]')
                .should('be.visible')
                .should('have.text', 'Nombre es obligatorio')
        })

        it('should show an error if only code is not entered', () => {
            cy.get('[data-testid="component.drawer.settings.budget.item.name"]').type(
                'Budget Item Name'
            )
            cy.get('[data-testid="component.button.group.save"]').click()

            cy.get('[data-testid="component.drawer.settings.budget.item.code.error"]')
                .should('be.visible')
                .should('have.text', 'Código es obligatorio')

            cy.get(
                '[data-testid="component.drawer.settings.budget.item.name.error"]'
            ).should('not.be.visible')
        })
    })
})
