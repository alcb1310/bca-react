import BudgetItems from '.'

const cols = ['Código', 'Nombre', 'Nivel', 'Acumula', 'Padre']
const title = ['code', 'name', 'level', 'accumulate', 'parent_code']

describe('<BudgetItems />', () => {
    beforeEach(() => {
        cy.intercept('GET', '**/parametros/partidas?query=', {
            statusCode: 200,
            fixture: 'parameters/budget_items/getAllBudgetItem.json',
        }).as('partidas')
        cy.wrapper(<BudgetItems />)
    })

    it('should display the page', () => {
        cy.getByTestId('page.parametros.partidas.loading').should('be.visible')

        cy.wait('@partidas')

        cy.getByTestId('page.parametros.partidas.loading').should('not.exist')

        cy.getByTestId('component.pagetitle.title')
            .should('be.visible')
            .should('have.text', 'Partidas')

        cy.getByTestId('component.table.header.toolbar.main')
            .should('be.visible')
            .should('have.text', 'Crear Partida')

        cy.getByTestId('page.parametros.partidas.search')
            .find('input')
            .should('be.visible')

        cy.getByTestId('page.parametros.partidas.search')
            .find('label')
            .should('have.text', 'Buscar')

        cy.getByTestId('component.drawer').should('not.exist')
        for (var i = 0; i < cols.length; i++) {
            cy.get(`[data-field="${title[i]}"]`)
                .find('.MuiDataGrid-columnHeaderTitle')
                .should('have.text', cols[i])

            cy.get(`[data-field="${title[i]}"]`)
                .find('.MuiDataGrid-columnHeaderTitle')
                .click()
        }
    })

    describe('open the drawer', () => {
        it('should open for creation', () => {
            cy.getByTestId('component.table.header.toolbar.main').click()
            cy.getByTestId('component.drawer').should('be.visible')
            cy.getByTestId('component.drawertitle.title')
                .should('be.visible')
                .should('have.text', 'Crear Partida')
            cy.getByTestId('component.button.group.cancel').click()
            cy.getByTestId('component.drawer').should('not.exist')
        })

        it('should enter for edit', () => {
            for (var i = 0; i < cols.length; i++) {
                cy.get(`[data-field="${title[i]}"]`)
                    .find('.MuiDataGrid-columnHeaderTitle')
                    .click()
            }

            cy.get('[data-rowindex="1"]').find('[aria-colindex="6"]').click()
            cy.getByTestId('component.drawer').should('be.visible')
            cy.getByTestId('component.drawertitle.title')
                .should('be.visible')
                .should('have.text', 'Editar Partida')
            cy.getByTestId('component.button.group.cancel').click()
            cy.getByTestId('component.drawer').should('not.exist')
        })
    })
})
