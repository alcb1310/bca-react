import Actual from '.'

const cols = [
    'Codigo',
    'Partida',
    'Cant. Gastada',
    'Total Gastado',
    'Cant. Disponible',
    'Costo Disponible',
    'Total Disponible',
    'Presupuesto Actualizado',
]
const title = [
    'budget_item_code',
    'budget_item_name',
    'spent_quantity',
    'spent_total',
    'remaining_quantity',
    'remaining_cost',
    'remaining_total',
    'updated_budget',
]

describe('<Actual />', () => {
    it('should display the page', () => {
        cy.intercept('GET', '**/parametros/proyectos?active=true', {
            statusCode: 200,
            fixture: 'parameters/projects/active.json',
        }).as('projects')
        cy.intercept('GET', '**/reportes/levels', {
            statusCode: 200,
            fixture: 'reports/levels/getAllLevels.json',
        }).as('levels')
        cy.intercept('GET', '**/reportes/actual?project_id=&level=', {
            statusCode: 204,
        }).as('actual-load')

        cy.wrapper(<Actual />)

        cy.getByTestId('page.reports.actual.loading').should('be.visible')
        cy.wait(['@projects', '@levels', '@actual-load'])
        cy.getByTestId('page.reports.actual.loading').should('not.exist')

        cy.getByTestId('page.reports.actual.project')
            .should('be.visible')
            .find('select')
            .should('not.have.value')
        cy.getByTestId('page.reports.actual.level')
            .should('be.visible')
            .find('select')
            .should('not.have.value')

        cy.getByTestId('component.table.header.toolbar.main')
            .should('be.visible')
            .should('have.text', 'Generar')
        cy.getByTestId('component.table.header.toolbar.export')
            .should('be.visible')
            .should('have.text', 'Exportar')

        for (var i = 0; i < cols.length; i++) {
            cy.get(`[data-field="${title[i]}"]`)
                .find('.MuiDataGrid-columnHeaderTitle')
                .should('have.text', cols[i])

            cy.get(`[data-field="${title[i]}"]`)
                .find('.MuiDataGrid-columnHeaderTitle')
                .click()
        }
    })
})
