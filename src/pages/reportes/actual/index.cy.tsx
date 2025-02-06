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
    beforeEach(() => {
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
    })

    it('should display the page', () => {
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

    it('should show errors', () => {
        cy.getByTestId('component.table.header.toolbar.main').click()

        cy.get('.project_id')
            .should('be.visible')
            .should('have.text', 'Seleccione un proyecto')
        cy.get('.level')
            .should('be.visible')
            .should('have.text', 'Seleccione un nivel')
    })

    it('should show spinner when fetching data', () => {
        const project_id = 'e4b2eaf2-1d98-4493-bf2d-15938ef3057b'
        const level = '1'

        cy.getByTestId('page.reports.actual.project')
            .find('select')
            .select('Test Project 1')
        cy.getByTestId('page.reports.actual.level').find('select').select('1')

        cy.intercept(
            'GET',
            `**/reportes/actual?project_id=${project_id}&level=${level}`,
            {
                statusCode: 200,
                body: [],
            }
        ).as('actual')
        cy.getByTestId('component.table.header.toolbar.main').click()

        cy.getByTestId('page.reports.actual.loading').should('be.visible')
        cy.wait('@actual')
        cy.getByTestId('page.reports.actual.loading').should('not.exist')
    })
})
