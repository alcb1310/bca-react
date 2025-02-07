import Suppliers from '.'

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
        cy.wrapper(<Suppliers />)
    })

    it('should display the page', () => {
        cy.getByTestId('page.parameters.suppliers.loading').should('be.visible')
        cy.wait('@suppliers')
        cy.getByTestId('page.parameters.suppliers.loading').should('not.exist')

        cy.getByTestId('component.pagetitle.title')
            .should('be.visible')
            .should('have.text', 'Proveedores')

        cy.getByTestId('component.table.header.toolbar.main')
            .should('be.visible')
            .should('have.text', 'Crear Proveedor')

        cy.getByTestId('page.parameters.suppliers.search')
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
        cy.getByTestId('component.drawer').should('not.exist')
        cy.getByTestId('component.table.header.toolbar.main').click()
        cy.getByTestId('component.drawer').should('be.visible')
        cy.getByTestId('component.drawertitle.title')
            .should('be.visible')
            .should('have.text', 'Crear Proveedor')
        cy.getByTestId('component.button.group.cancel').click()
        cy.getByTestId('component.drawer').should('not.exist')
    })

    it('should open the drawer on edit mode', () => {
        for (var i = 0; i < cols.length; i++) {
            cy.get(`[data-field="${title[i]}"]`)
                .find('.MuiDataGrid-columnHeaderTitle')
                .click()
        }

        cy.getByTestId('component.drawer').should('not.exist')
        cy.get('[data-rowindex="1"]').find('[aria-label="Edit"]').click()

        cy.getByTestId('component.drawer').should('be.visible')
        cy.getByTestId('component.drawertitle.title')
            .should('be.visible')
            .should('have.text', 'Editar Proveedor')
        cy.getByTestId('component.button.group.cancel').click()
        cy.getByTestId('component.drawer').should('not.exist')
    })
})
