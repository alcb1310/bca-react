import BudgetItems from '.'
import TestAppWrapper from '../../../components/wrappers/TestAppWraper'

const cols = ['Código', 'Nombre', 'Nivel', 'Acumula', 'Padre']
const title = ['code', 'name', 'level', 'accumulate', 'parent_code']

describe('<BudgetItems />', () => {
    beforeEach(() => {
        cy.intercept('GET', '**/parametros/partidas?query=', {
            statusCode: 200,
            fixture: 'parameters/budget_items/getAllBudgetItem.json',
        }).as('partidas')

        cy.mount(
            <TestAppWrapper>
                <BudgetItems />
            </TestAppWrapper>
        )
    })

    it('should display the page', () => {
        cy.get('[data-testid="page.parametros.partidas.loading"]').should(
            'be.visible'
        )

        cy.wait('@partidas')

        cy.get('[data-testid="page.parametros.partidas.loading"]').should(
            'not.exist'
        )

        cy.get('[data-testid="component.pagetitle.title"]')
            .should('be.visible')
            .should('have.text', 'Partidas')

        cy.get('[data-testid="component.table.header.toolbar.main"]')
            .should('be.visible')
            .should('have.text', 'Crear Partida')

        cy.get('[data-testid="page.parametros.partidas.search"]')
            .find('input')
            .should('be.visible')

        cy.get('[data-testid="page.parametros.partidas.search"]')
            .find('label')
            .should('have.text', 'Buscar')

        cy.get('[data-testid="component.drawer"]').should('not.exist')
        cy.get('.MuiDataGrid-scrollbar').click()
        for (var i = 0; i < cols.length; i++) {
            cy.get(`[data-field="${title[i]}"]`)
                .find('.MuiDataGrid-columnHeaderTitle')
                .should('have.text', cols[i])

            cy.get(`[data-field="${title[i]}"]`)
                .find('.MuiDataGrid-columnHeaderTitle')
                .click()
        }
    })

    it('should open the drawer', () => {
        cy.get('[data-testid="component.table.header.toolbar.main"]').click()
        cy.get('[data-testid="component.drawer"]').should('be.visible')
        cy.get('[data-testid="component.drawertitle.title"]')
            .should('be.visible')
            .should('have.text', 'Crear Partida')
        cy.get('[data-testid="component.button.group.cancel"]').click()
        cy.get('[data-testid="component.drawer"]').should('not.exist')
    })
})
