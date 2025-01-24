import TestAppWrapper from '../../../wrappers/TestAppWraper'
import BudgetItemDrawer from './BudgetItemDrawer'

describe('<BudgetItemDrawer />', () => {
    it('should display the drawer', () => {
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
})
