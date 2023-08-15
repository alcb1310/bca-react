describe("Supplier", () => {
    beforeEach(() => {
        cy.intercept({
            method: 'GET',
            url: '**/api/validate',
        }, { fixture: '../../src/mocks/bca/fixtures/validate.json' }).as('validate')
        cy.visit('/')
    })

    it("should open the page", () => {
        cy.intercept({
            method: 'GET',
            url: '**/api/suppliers',
        }, { fixture: '../../src/mocks/bca/fixtures/suppliers.json' }).as('suppliers')

        cy.get('[data-testid="menu.settings"]').should('have.text', 'Parámetros')
        cy.get('[data-testid="menu.settings"]').click()
        cy.get('[data-testid="menu.settings.suppliers"]').should('have.text', 'Proveedores')
        cy.get('[data-testid="menu.settings.suppliers"]').click()

        cy.get('[data-testid="pagetitle"]').should('exist')
        cy.get('[data-testid="pagetitle"]').should('have.text', 'Proveedores')
        cy.get('[data-testid="supplier.create"]').should('exist')
        cy.get('[data-testid="supplier.create"]').should('have.text', "Crear")

        cy.get('[aria-colindex="1"] > .MuiDataGrid-columnHeaderDraggableContainer > .MuiDataGrid-columnHeaderTitleContainer').should('have.text', 'RUC')
        cy.get('[aria-colindex="2"] > .MuiDataGrid-columnHeaderDraggableContainer > .MuiDataGrid-columnHeaderTitleContainer').should('have.text', 'Nombre')
        cy.get('[aria-colindex="3"] > .MuiDataGrid-columnHeaderDraggableContainer > .MuiDataGrid-columnHeaderTitleContainer').should('have.text', 'Nombre Contacto')
        cy.get('[aria-colindex="4"] > .MuiDataGrid-columnHeaderDraggableContainer > .MuiDataGrid-columnHeaderTitleContainer').should('have.text', 'Email Contacto')
        cy.get('[aria-colindex="5"] > .MuiDataGrid-columnHeaderDraggableContainer > .MuiDataGrid-columnHeaderTitleContainer').should('have.text', 'Teléfono Contacto')
    })
})
