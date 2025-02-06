import Historic from '.'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

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

describe('<Historic />', () => {
    beforeEach(() => {
        cy.intercept('GET', '**/parametros/proyectos?', {
            statusCode: 200,
            fixture: 'parameters/projects/getAllProjects.json',
        }).as('projects')
        cy.intercept('GET', '**/reportes/levels', {
            statusCode: 200,
            fixture: 'reports/levels/getAllLevels.json',
        }).as('levels')
        cy.intercept('GET', '**/reportes/historico?project_id=&level=&date=', {
            statusCode: 204,
        }).as('histoirc-load')

        cy.wrapper(
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Historic />
            </LocalizationProvider>
        )
    })

    it('should display the page', () => {
        cy.getByTestId('pages.reports.historic.loading').should('be.visible')
        cy.wait(['@projects', '@levels', '@histoirc-load'])
        cy.getByTestId('pages.reports.historic.loading').should('not.exist')

        cy.getByTestId('component.pagetitle.title')
            .should('be.visible')
            .should('have.text', 'Historico')

        cy.getByTestId('pages.reports.historic.project')
            .should('be.visible')
            .find('select')
            .should('not.have.value')

        cy.getByTestId('pages.reports.historic.level')
            .should('be.visible')
            .find('select')
            .should('not.have.value')

        cy.getByTestId('pages.reports.historic.date')
            .find('label')
            .should('have.text', 'Fecha')
            .should('be.visible')

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

    it('should display errors', () => {
        cy.getByTestId('component.table.header.toolbar.main').click()

        cy.get('.project_id')
            .should('be.visible')
            .should('have.text', 'Seleccione un proyecto')

        cy.get('.level')
            .should('be.visible')
            .should('have.text', 'Seleccione un nivel')
    })
})
