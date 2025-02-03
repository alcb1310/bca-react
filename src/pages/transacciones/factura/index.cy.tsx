import Factura from '.'

const cols = ['Fecha', 'Proyecto', 'Proveedor', 'Número', 'Total']
const title = [
    'invoice_date',
    'project_name',
    'supplier_name',
    'invoice_number',
    'invoice_total',
]

describe('<Factura />', () => {
    it('should display the page', () => {
        cy.intercept('GET', '**/transacciones/facturas', {
            statusCode: 200,
        }).as('invoices')
        cy.wrapper(<Factura />)
        cy.getByTestId('page.transactions.invoice.loading').should('be.visible')
        cy.wait('@invoices')
        cy.getByTestId('page.transactions.invoice.loading').should('not.exist')
        cy.getByTestId('component.pagetitle.title')
            .should('be.visible')
            .should('have.text', 'Facturas')
        cy.getByTestId('component.table.header.toolbar.main')
            .should('be.visible')
            .should('have.text', 'Crear Factura')

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
