import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Balance from '.'

const cols = ['Fecha', 'Proveedor', 'Factura', 'Total']
const title = ['date', 'supplier', 'invoice_number', 'invoice_total']

describe('<Balance />', () => {
    beforeEach(() => {
        cy.intercept('GET', '**/parametros/proyectos?active=true', {
            statusCode: 200,
            fixture: 'parameters/projects/active.json',
        }).as('projects')
        cy.intercept('GET', '**/reportes/cuadre?project_id=&date=', {
            statusCode: 204,
        }).as('balance-load')

        cy.wrapper(
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Balance />
            </LocalizationProvider>
        )
    })

    it('should display the page', () => {
        cy.getByTestId('page.reports.balance.loading').should('be.visible')
        cy.wait(['@projects', '@balance-load'])
        cy.getByTestId('page.reports.balance.loading').should('not.exist')

        cy.getByTestId('page.reports.balance.project')
            .should('be.visible')
            .find('select')
            .should('not.have.value')
        cy.getByTestId('page.reports.balance.date').should('be.visible')

        cy.getByTestId('component.table.header.toolbar.main')
            .should('be.visible')
            .should('have.text', 'Generar')
        cy.getByTestId('component.table.header.toolbar.export')
            .should('be.visible')
            .should('have.text', 'Exportar')

        for (var i = 1; i < cols.length; i++) {
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
    })

    it('should show spinner on fetch data', () => {
        const project_id = 'e4b2eaf2-1d98-4493-bf2d-15938ef3057b'
        const date = '2024-12-15'

        cy.getByTestId('page.reports.balance.project')
            .find('select')
            .select('Test Project 1')
        cy.getByTestId('page.reports.balance.date').find('input').type('12152024')

        cy.intercept(
            'GET',
            `**/reportes/cuadre?project_id=${project_id}&date=${date}`,
            {
                statusCode: 200,
                body: {
                    invoices: [],
                    total: 0,
                },
            }
        ).as('balance')
        cy.getByTestId('component.table.header.toolbar.main').click()

        cy.getByTestId('page.reports.balance.loading').should('be.visible')
        cy.wait('@balance')
        cy.getByTestId('page.reports.balance.loading').should('not.exist')
    })
})
