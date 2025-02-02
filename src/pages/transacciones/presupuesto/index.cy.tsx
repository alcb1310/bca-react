import Presupuesto from '.'

const cols = [
    'Proyecto',
    'Partida',
    'Cant. Disponible',
    'Costo Disponible',
    'Total Disponible',
    'Presupuesto Actualizado',
]
const title = [
    'project_name',
    'budget_item_name',
    'remaining_quantity',
    'remaining_cost',
    'remaining_total',
    'updated_budget',
]

describe('<Presupuesto />', () => {
    it('should display the page', () => {
        cy.intercept('GET', '**/parametros/proyectos?active=true', {
            statusCode: 200,
            fixture: 'parameters/projects/active.json',
        }).as('projects')
        cy.intercept('GET', '**/parametros/partidas?accum=false', {
            statusCode: 200,
            fixture: 'parameters/budget_items/nonaccum.json',
        }).as('budget_items')
        cy.intercept('GET', '**/transacciones/presupuestos?**', {
            statusCode: 200,
        }).as('budget')

        cy.wrapper(<Presupuesto />)

        cy.getByTestId('page.transactions.budget.loading').should('be.visible')
        cy.wait(['@projects', '@budget_items', '@budget'])
        cy.getByTestId('page.transactions.budget.loading').should('not.exist')

        cy.getByTestId('component.pagetitle.title')
            .should('be.visible')
            .should('have.text', 'Presupuesto')
        cy.getByTestId('component.table.header.toolbar.main')
            .should('be.visible')
            .should('have.text', 'Agregar Presupuesto')

        cy.getByTestId('page.transactions.budget.filter.project')
            .should('be.visible')
            .find('select')
            .should('not.have.value')
        cy.getByTestId('page.transactions.budget.filter.search')
            .should('be.visible')
            .find('label')
            .should('have.text', 'Buscar')

        for (var i = 1; i < cols.length; i++) {
            cy.get(`[data-field="${title[i]}"]`)
                .find('.MuiDataGrid-columnHeaderTitle')
                .should('have.text', cols[i])

            cy.get(`[data-field="${title[i]}"]`)
                .find('.MuiDataGrid-columnHeaderTitle')
                .click()
        }
    })
})
