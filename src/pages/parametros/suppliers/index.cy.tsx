import Suppliers from '.'
import TestAppWrapper from '../../../components/wrappers/TestAppWraper'

const cols = [
    'RUC',
    'Nombre',
    'Nombre Contacto',
    'Email Contacto',
    'Telefono Contacto',
]
const title = [
    'supplier_id',
    'name',
    'contact_name',
    'contact_email',
    'contact_phone',
]

describe('<Suppliers />', () => {
    beforeEach(() => {
        cy.intercept('GET', '**/parametros/proveedores?query=', {
            statusCode: 200,
            fixture: 'parameters/suppliers/getAllSuppliers.json',
        }).as('suppliers')
        cy.mount(
            <TestAppWrapper>
                <Suppliers />
            </TestAppWrapper>
        )
    })

    it('should display the page', () => {
        cy.get('[data-testid="page.parameters.suppliers.loading"]').should(
            'be.visible'
        )
        cy.wait('@suppliers')
        cy.get('[data-testid="page.parameters.suppliers.loading"]').should(
            'not.exist'
        )

        cy.get('[data-testid="component.pagetitle.title"]')
            .should('be.visible')
            .should('have.text', 'Proveedores')

        cy.get('[data-testid="component.table.header.toolbar.main"]')
            .should('be.visible')
            .should('have.text', 'Crear Proveedor')

        cy.get('[data-testid="page.parameters.suppliers.search"]')
            .should('be.visible')
            .find('label')
            .should('have.text', 'Buscar')

        for (var i = 0; i < cols.length; i++) {
            cy.get(`[data-field="${title[i]}"]`)
                .find('.MuiDataGrid-columnHeaderTitle')
                .should('have.text', cols[i])

            cy.get(`[data-field="${title[i]}"]`)
                .find('.MuiDataGrid-columnHeaderTitle')
                .click()
        }
    })

    it('should open the drawer on create mode', () => {
        cy.get('[data-testid="component.drawer"]').should('not.exist')
        cy.get('[data-testid="component.table.header.toolbar.main"]').click()
        cy.get('[data-testid="component.drawer"]').should('be.visible')
        cy.get('[data-testid="component.drawertitle.title"]')
            .should('be.visible')
            .should('have.text', 'Crear Proveedor')
        cy.get('[data-testid="component.button.group.cancel"]').click()
        cy.get('[data-testid="component.drawer"]').should('not.exist')
    })
})
