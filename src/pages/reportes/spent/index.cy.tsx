import Spent from '.'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers'

const cols = ['Codigo', 'Nombre', 'Total']
const title = ['code', 'name', 'spent']

describe('<Spent />', () => {
    it('should display the page', () => {
        cy.intercept('GET', '**/reportes/levels', {
            statusCode: 200,
            fixture: 'reports/levels/getAllLevels.json',
        }).as('levels')
        cy.intercept('GET', '**/parametros/proyectos?', {
            statusCode: 200,
            fixture: 'parameters/projects/getAllProjects.json',
        }).as('projects')
        cy.intercept('GET', '**/reportes/gastado?project_id=&level=&date=', {
            statusCode: 204,
        }).as('spent-load')

        cy.wrapper(
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Spent />
            </LocalizationProvider>
        )

        cy.wait(['@levels', '@projects', '@spent-load'])

        cy.getByTestId('component.pagetitle.title')
            .should('be.visible')
            .should('have.text', 'Gastado por partida')

        cy.getByTestId('page.reports.spent.project')
            .should('be.visible')
            .find('select')
            .should('not.have.value')

        cy.getByTestId('page.reports.spent.level')
            .should('be.visible')
            .find('select')
            .should('not.have.value')

        cy.getByTestId('page.reports.spent.date')
            .should('be.visible')
            .find('label')
            .should('have.text', 'Fecha')

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
