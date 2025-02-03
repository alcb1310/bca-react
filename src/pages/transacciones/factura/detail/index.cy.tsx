import { LocalizationProvider } from '@mui/x-date-pickers'
import IndividualInvoice from '.'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

describe('<IndividualInvoice />', () => {
    beforeEach(() => {
        cy.intercept('GET', '**/parametros/proyectos?active=true', {
            statusCode: 200,
            fixture: 'parameters/projects/active.json',
        }).as('projects')
        cy.intercept('GET', '**/parametros/proveedores?query=', {
            statusCode: 200,
            fixture: 'parameters/suppliers/getAllSuppliers.json',
        }).as('suppliers')
        cy.intercept('GET', '**/transacciones/facturas/crear', {
            statusCode: 200,
            body: {
                id: '',
                supplier_id: '',
                project_id: '',
                invoice_number: '',
                invoice_date: '',
                invoice_total: 0,
            },
        }).as('invoices')
        cy.intercept('GET', '**/transacciones/facturas/crear/detalle', {
            statusCode: 200,
            body: [],
        }).as('details')

        cy.pageWrapper(
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <IndividualInvoice />
            </LocalizationProvider>,
            ['/transacciones/facturas/crear']
        )
    })

    it('should display the page', () => {
        cy.getByTestId('page.transactions.invoice.details.loading').should(
            'be.visible'
        )
        cy.wait(['@projects', '@suppliers', '@invoices', '@details'])
        cy.getByTestId('page.transactions.invoice.details.loading').should(
            'not.exist'
        )

        cy.getByTestId('component.pagetitle.title')
            .should('be.visible')
            .should('have.text', 'Crear Factura')

        cy.getByTestId('components.forms.invoice.project')
            .should('be.visible')
            .find('select')
            .should('not.have.value')

        cy.getByTestId('components.forms.invoice.supplier')
            .should('be.visible')
            .find('select')
            .should('not.have.value')

        cy.getByTestId('components.forms.invoice.number')
            .should('be.visible')
            .find('label')
            .should('have.text', 'Número de Factura')

        cy.getByTestId('components.forms.invoice.total')
            .should('be.visible')
            .find('label')
            .should('have.text', 'Total')

        cy.getByTestId('components.forms.invoice.total')
            .find('input')
            .should('be.disabled')
            .should('have.value', '0')

        cy.getByTestId('components.forms.invoice.date')
            .should('be.visible')
            .find('label')
            .should('have.text', 'Fecha de Factura')

        cy.getByTestId('components.forms.invoice.date')
            .find('input')
            .should('have.value', 'MM/DD/YYYY')

        cy.getByTestId('component.button.group.save')
            .should('be.visible')
            .should('have.text', 'Guardar')
        cy.getByTestId('component.button.group.cancel')
            .should('be.visible')
            .should('have.text', 'Cancelar')
    })

    describe('validate data', () => {
        it('should display all the error messages', () => {
            cy.getByTestId('component.button.group.save').click()
            cy.get('.project_id')
                .should('be.visible')
                .should('have.text', 'Seleccione un proyecto')
            cy.get('.supplier_id')
                .should('be.visible')
                .should('have.text', 'Seleccione un proveedor')
            cy.getByTestId('components.forms.invoice.number.error')
                .should('be.visible')
                .should('have.text', 'Ingrese el numero de la Factura')
            cy.getByTestId('components.forms.invoice.date')
                .find('.MuiFormHelperText-root')
                .should('have.text', 'Invalid date')
        })
    })
})
