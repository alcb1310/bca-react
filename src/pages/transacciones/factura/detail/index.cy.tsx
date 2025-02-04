import { LocalizationProvider } from '@mui/x-date-pickers'
import IndividualInvoice from '.'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

describe('<IndividualInvoice />', () => {
    describe('Create Invoice', () => {
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

    describe('Edit invoice', () => {
        const id = '9c092514-1755-49c7-a94a-79093f0f150a'
        const supplier_id = '81065ab9-cce2-4bdb-ab8a-0cd326924c47'
        const project_id = 'e4b2eaf2-1d98-4493-bf2d-15938ef3057b'
        beforeEach(() => {
            cy.intercept('GET', `**/transacciones/facturas/${id}`, {
                statusCode: 200,
                body: {
                    id,
                    supplier_id,
                    project_id,
                    invoice_number: '123-456-789',
                    invoice_date: '01/10/2025',
                    invoice_total: 0,
                },
            }).as('invoices')
            cy.intercept('GET', `**/transacciones/facturas/${id}/detalle`, {
                statusCode: 200,
                body: [],
            }).as('details')
            cy.intercept('GET', '**/parametros/partidas?accum=false', {
                statusCode: 200,
                fixture: 'parameters/budget_items/nonaccum.json',
            }).as('budget_items')

            cy.pageWrapper(
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <IndividualInvoice />
                </LocalizationProvider>,
                [`/transacciones/facturas/${id}`]
            )
        })
        it('should display the page', () => {
            cy.getByTestId('page.transactions.invoice.details.loading').should(
                'be.visible'
            )
            cy.wait(['@invoices', '@details', '@budget_items'])
            cy.getByTestId('page.transactions.invoice.details.loading').should(
                'not.exist'
            )

            cy.getByTestId('component.pagetitle.title')
                .should('be.visible')
                .should('have.text', 'Editar Factura')

            cy.getByTestId('components.forms.invoice.project')
                .should('be.visible')
                .find('select')
                .should('have.value', project_id)

            cy.getByTestId('components.forms.invoice.supplier')
                .should('be.visible')
                .find('select')
                .should('have.value', supplier_id)

            cy.getByTestId('components.forms.invoice.number')
                .should('be.visible')
                .find('input')
                .should('have.value', '123-456-789')

            cy.getByTestId('components.forms.invoice.total')
                .find('input')
                .should('be.disabled')
                .should('have.value', '0')

            cy.getByTestId('components.forms.invoice.date')
                .find('input')
                .should('have.value', '01/10/2025')

            cy.getByTestId('component.button.group.save')
                .should('be.visible')
                .should('have.text', 'Guardar')
            cy.getByTestId('component.button.group.cancel')
                .should('be.visible')
                .should('have.text', 'Cancelar')
        })
    })
})
