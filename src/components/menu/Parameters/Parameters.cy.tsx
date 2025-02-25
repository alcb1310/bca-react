import { SidebarProvider } from '@/components/ui/sidebar'
import ParametersMenu from './Parameters'

describe('<ParametersMenu />', () => {
    beforeEach(() => {
        cy.wrapper(
            <SidebarProvider>
                <ParametersMenu />
            </SidebarProvider>
        )
    })

    it('should display the menu', () => {
        cy.getByTestId('menu.parameters').should('have.text', 'Parametros')
        cy.getByTestId('menu.parameters.closed-chevron').should('be.visible')

        cy.getByTestId('menu.parameters.budget-items')
            .should('be.visible')
            .should('have.text', 'Partidas')

        cy.getByTestId('menu.parameters.categories')
            .should('be.visible')
            .should('have.text', 'Categorias')

        cy.getByTestId('menu.parameters.materials')
            .should('be.visible')
            .should('have.text', 'Materiales')

        cy.getByTestId('menu.parameters.projects')
            .should('be.visible')
            .should('have.text', 'Proyectos')

        cy.getByTestId('menu.parameters.suppliers')
            .should('be.visible')
            .should('have.text', 'Proveedores')

        cy.getByTestId('menu.parameters.items')
            .should('be.visible')
            .should('have.text', 'Rubros')
    })

    describe('should toggle the menu', () => {
        beforeEach(() => {
            cy.getByTestId('menu.parameters').click()
        })

        it('should close the menu when clickig it', () => {
            cy.getByTestId('menu.parameters.closed-chevron').should('be.visible')

            cy.getByTestId('menu.parameters.budget-items').should('not.exist')
            cy.getByTestId('menu.parameters.categories').should('not.exist')
            cy.getByTestId('menu.parameters.materials').should('not.exist')
            cy.getByTestId('menu.parameters.projects').should('not.exist')
            cy.getByTestId('menu.parameters.suppliers').should('not.exist')
            cy.getByTestId('menu.parameters.items').should('not.exist')
        })

        it('should open the menu when clickig it', () => {
            cy.getByTestId('menu.parameters').click()
            cy.getByTestId('menu.parameters.closed-chevron').should('be.visible')

            cy.getByTestId('menu.parameters.budget-items').should('be.visible')
            cy.getByTestId('menu.parameters.categories').should('be.visible')
            cy.getByTestId('menu.parameters.materials').should('be.visible')
            cy.getByTestId('menu.parameters.projects').should('be.visible')
            cy.getByTestId('menu.parameters.suppliers').should('be.visible')
            cy.getByTestId('menu.parameters.items').should('be.visible')
        })
    })
})
