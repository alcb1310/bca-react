import { SidebarProvider } from '@/components/ui/sidebar'
import AnalysisMenu from './Analysis'

describe('<AnalysisMenu />', () => {
    beforeEach(() => {
        cy.wrapper(
            <SidebarProvider>
                <AnalysisMenu />
            </SidebarProvider>
        )
    })

    it('should display the menu correctly', () => {
        cy.getByTestId('menu.analysis').should('have.text', 'Analisis')
        cy.get('[data-testid="menu.analysis.closed-chevron"]').should('be.visible')

        cy.getByTestId('menu.analysis.quantities')
            .should('be.visible')
            .should('have.text', 'Cantidades')

        cy.getByTestId('menu.analysis.analysis')
            .should('be.visible')
            .should('have.text', 'Analisis')
    })

    describe('should toggle the menu when clicking', () => {
        beforeEach(() => {
            cy.getByTestId('menu.analysis').click()
        })

        it('should hide the menu when clicking it', () => {
            cy.getByTestId('menu.analysis.closed-chevron').should('be.visible')

            cy.getByTestId('menu.analysis.quantities').should('not.exist')
            cy.getByTestId('menu.analysis.analysis').should('not.exist')
        })

        it('should open the menu when clicking it', () => {
            cy.getByTestId('menu.analysis').click()
            cy.get('[data-testid="menu.analysis.closed-chevron"]').should(
                'be.visible'
            )

            cy.getByTestId('menu.analysis.quantities').should('be.visible')
            cy.getByTestId('menu.analysis.analysis').should('be.visible')
        })
    })
})
