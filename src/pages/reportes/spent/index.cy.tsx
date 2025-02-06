import Spent from '.'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers'

const cols = ['Codigo', 'Nombre', 'Total']
const title = ['code', 'name', 'spent']

describe('<Spent />', () => {
    beforeEach(() => {
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
    })

    it('should display the page', () => {
        cy.getByTestId('page.reports.spent.loading').should('be.visible')
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

    it('should display errors', () => {
        cy.getByTestId('component.table.header.toolbar.main').click()
        cy.get('.project_id')
            .should('be.visible')
            .should('have.text', 'Seleccione un proyecto')
        cy.get('.level')
            .should('be.visible')
            .should('have.text', 'Seleccione un nivel')
    })

    describe('show the report', () => {
        beforeEach(() => {
            cy.intercept(
                'GET',
                '**/reportes/gastado?project_id=e4b2eaf2-1d98-4493-bf2d-15938ef3057b&level=1&date=2024-10-15',
                {
                    statusCode: 200,
                    fixture: 'reports/getSpent.json',
                }
            ).as('spent')
            cy.getByTestId('page.reports.spent.project')
                .find('select')
                .select('Test Project 1')
            cy.getByTestId('page.reports.spent.level').find('select').select('1')
            cy.getByTestId('page.reports.spent.date').find('input').type('10152024')
        })

        it('should show a spinner when loading data', () => {
            cy.getByTestId('component.table.header.toolbar.main').click()
            cy.getByTestId('page.reports.spent.loading').should('be.visible')
            cy.wait('@spent')
            cy.getByTestId('page.reports.spent.loading').should('not.exist')
        })

        it('should open the drawer', () => {
            cy.getByTestId('component.table.header.toolbar.main').click()
            for (var i = 0; i < cols.length; i++) {
                cy.get(`[data-field="${title[i]}"]`)
                    .find('.MuiDataGrid-columnHeaderTitle')
                    .click()
            }

            cy.get('[data-rowindex="0"]')
                .find('[data-testid="VisibilityOutlinedIcon"]')
                .click()
            cy.getByTestId('component.drawer').should('be.visible')
            cy.getByTestId('component.drawertitle.title')
                .should('be.visible')
                .should('have.text', 'Reporte de gastos')

            cy.getByTestId('component.drawers.reports.spent.detail.close').click()
            cy.getByTestId('component.drawer').should('not.exist')
        })
    })
})
