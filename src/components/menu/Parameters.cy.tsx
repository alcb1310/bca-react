import TestAppWrapper from '../wrappers/TestAppWraper'
import ParametersMenu from './Parameters'

describe('<ParametersMenu />', () => {
    beforeEach(() => {
        cy.mount(
            <TestAppWrapper>
                <ParametersMenu />
            </TestAppWrapper>
        )
    })

    it('should display the menu', () => {
        cy.get('[data-testid="menu.parameters"]').should('have.text', 'Parametros')
        cy.get('[data-testid="menu.parameters.open-chevron"]').should('be.visible')
        cy.get('[data-testid="menu.parameters.closed-chevron"]').should('not.exist')

        cy.get('[data-testid="menu.parameters.budget-items"]').should('be.visible')
        cy.get('[data-testid="menu.parameters.budget-items"]').should(
            'have.text',
            'Partidas'
        )

        cy.get('[data-testid="menu.parameters.categories"]').should('be.visible')
        cy.get('[data-testid="menu.parameters.categories"]').should(
            'have.text',
            'Categorias'
        )

        cy.get('[data-testid="menu.parameters.materials"]').should('be.visible')
        cy.get('[data-testid="menu.parameters.materials"]').should(
            'have.text',
            'Materiales'
        )

        cy.get('[data-testid="menu.parameters.projects"]').should('be.visible')
        cy.get('[data-testid="menu.parameters.projects"]').should(
            'have.text',
            'Proyectos'
        )

        cy.get('[data-testid="menu.parameters.suppliers"]').should('be.visible')
        cy.get('[data-testid="menu.parameters.suppliers"]').should(
            'have.text',
            'Proveedores'
        )

        cy.get('[data-testid="menu.parameters.items"]').should('be.visible')
        cy.get('[data-testid="menu.parameters.items"]').should(
            'have.text',
            'Rubros'
        )
    })

    describe('should toggle the menu', () => {
        beforeEach(() => {
            cy.get('[data-testid="menu.parameters"]').click()
        })

        it('should close the menu when clickig it', () => {
            cy.get('[data-testid="menu.parameters.closed-chevron"]').should(
                'be.visible'
            )
            cy.get('[data-testid="menu.parameters.open-chevron"]').should('not.exist')

            cy.get('[data-testid="menu.parameters.budget-items"]').should('not.exist')
            cy.get('[data-testid="menu.parameters.categories"]').should('not.exist')
            cy.get('[data-testid="menu.parameters.materials"]').should('not.exist')
            cy.get('[data-testid="menu.parameters.projects"]').should('not.exist')
            cy.get('[data-testid="menu.parameters.suppliers"]').should('not.exist')
            cy.get('[data-testid="menu.parameters.items"]').should('not.exist')
        })

        it('should open the menu when clickig it', () => {
            cy.get('[data-testid="menu.parameters"]').click()
            cy.get('[data-testid="menu.parameters.open-chevron"]').should(
                'be.visible'
            )
            cy.get('[data-testid="menu.parameters.closed-chevron"]').should(
                'not.exist'
            )

            cy.get('[data-testid="menu.parameters.budget-items"]').should(
                'be.visible'
            )
            cy.get('[data-testid="menu.parameters.categories"]').should('be.visible')
            cy.get('[data-testid="menu.parameters.materials"]').should('be.visible')
            cy.get('[data-testid="menu.parameters.projects"]').should('be.visible')
            cy.get('[data-testid="menu.parameters.suppliers"]').should('be.visible')
            cy.get('[data-testid="menu.parameters.items"]').should('be.visible')
        })
    })
})
