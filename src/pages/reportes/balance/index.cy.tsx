import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Balance from '.'

const cols = ['Fecha', 'Proveedor', 'Factura', 'Total']
const title = ['date', 'supplier', 'invoice_number', 'invoice_total']

describe('<Balance />', () => {
    it('should display the page', () => {
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
})
