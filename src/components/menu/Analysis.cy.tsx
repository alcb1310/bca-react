import TestAppWrapper from '../wrappers/TestAppWraper'
import AnalysisMenu from './Analysis'

describe('<AnalysisMenu />', () => {
    beforeEach(() => {
        cy.mount(
            <TestAppWrapper>
                <AnalysisMenu />
            </TestAppWrapper>
        )
    })

    it('should display the menu correctly', () => {
        cy.get('[data-testid="menu.analysis"]').should('have.text', 'Analisis')
        cy.get('[data-testid="menu.analysis.open-chevron"]').should('be.visible')
        cy.get('[data-testid="menu.analysis.closed-chevron"]').should('not.exist')

        cy.get('[data-testid="menu.analysis.quantities"]').should('be.visible')
        cy.get('[data-testid="menu.analysis.quantities"]').should(
            'have.text',
            'Cantidades'
        )

        cy.get('[data-testid="menu.analysis.analysis"]').should('be.visible')
        cy.get('[data-testid="menu.analysis.analysis"]').should(
            'have.text',
            'Analisis'
        )
    })

    describe('should toggle the menu when clicking', () => {
        beforeEach(() => {
            cy.get('[data-testid="menu.analysis"]').click()
        })

        it('should hide the menu when clicking it', () => {
            cy.get('[data-testid="menu.analysis.closed-chevron"]').should(
                'be.visible'
            )
            cy.get('[data-testid="menu.analysis.open-chevron"]').should('not.exist')

            cy.get('[data-testid="menu.analysis.quantities"]').should('not.exist')
            cy.get('[data-testid="menu.analysis.analysis"]').should('not.exist')
        })

        it('should open the menu when clicking it', () => {
            cy.get('[data-testid="menu.analysis"]').click()

            cy.get('[data-testid="menu.analysis.open-chevron"]').should('be.visible')
            cy.get('[data-testid="menu.analysis.closed-chevron"]').should('not.exist')

            cy.get('[data-testid="menu.analysis.quantities"]').should('be.visible')
            cy.get('[data-testid="menu.analysis.analysis"]').should('be.visible')
        })
    })
})
