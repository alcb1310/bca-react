describe('Navbar test', () => {
    beforeEach(() => {
        cy.intercept({
            method: 'POST',
            url: '**/api/login',
        }, { fixture: '../../src/mocks/bca/fixtures/login.json' }).as('login')
        cy.intercept({
            method: 'GET',
            url: '**/api/validate',
        }, { fixture: '../../src/mocks/bca/fixtures/validate.json' }).as('validate')
        cy.visit('/')
    })

    describe('Should have all menu items', () => {
        it('Should manage the transactions menu', () => {
            cy.get('[data-testid="menu.transactions"]').should('exist')
            cy.get('[data-testid="menu.transactions"]').should('have.text', 'Transacciones')
            cy.get('[data-testid="menu.transactions.budget"]').should('not.be.visible')
            cy.get('[data-testid="menu.transactions.invoices"]').should('not.be.visible')
            cy.get('[data-testid="menu.transactions.closure"]').should('not.be.visible')
            cy.get('[data-testid="menu.transactions"]').click()
            cy.get('[data-testid="menu.transactions.budget"]').should('be.visible')
            cy.get('[data-testid="menu.transactions.budget"]').should('have.text', "Presupuesto")
            cy.get('[data-testid="menu.transactions.invoices"]').should('be.visible')
            cy.get('[data-testid="menu.transactions.invoices"]').should('have.text', "Facturas")
            cy.get('[data-testid="menu.transactions.closure"]').should('be.visible')
            cy.get('[data-testid="menu.transactions.closure"]').should('have.text', "Cierre mensual")
        })

        it('Should manage the reports menu', () => {
            cy.get('[data-testid="menu.reports"]').should('exist')
            cy.get('[data-testid="menu.reports"]').should('have.text', 'Reportes')
            cy.get('[data-testid="menu.reports.actual"]').should('not.be.visible')
            cy.get('[data-testid="menu.reports.balance"]').should('not.be.visible')
            cy.get('[data-testid="menu.reports.historic"]').should('not.be.visible')
            cy.get('[data-testid="menu.reports.spent"]').should('not.be.visible')
            cy.get('[data-testid="menu.reports"]').click()
            cy.get('[data-testid="menu.reports.actual"]').should('be.visible')
            cy.get('[data-testid="menu.reports.actual"]').should('have.text', 'Presupuesto Actual')
            cy.get('[data-testid="menu.reports.balance"]').should('be.visible')
            cy.get('[data-testid="menu.reports.balance"]').should('have.text', "Cuadre")
            cy.get('[data-testid="menu.reports.historic"]').should('be.visible')
            cy.get('[data-testid="menu.reports.historic"]').should('have.text', "Presupuesto Histórico")
            cy.get('[data-testid="menu.reports.spent"]').should('be.visible')
            cy.get('[data-testid="menu.reports.spent"]').should('have.text', "Gastado Por Partida")
        })

        it('Should manage the settings menu', () => {
            cy.get('[data-testid="menu.settings"]').should('exist')
            cy.get('[data-testid="menu.settings"]').should('have.text', 'Parámetros')
            cy.get('[data-testid="menu.settings.suppliers"]').should('not.be.visible')
            cy.get('[data-testid="menu.settings.budgetItems"]').should('not.be.visible')
            cy.get('[data-testid="menu.settings.projects"]').should('not.be.visible')
            cy.get('[data-testid="menu.settings"]').click()
            cy.get('[data-testid="menu.settings.suppliers"]').should('be.visible')
            cy.get('[data-testid="menu.settings.suppliers"]').should('have.text', 'Proveedores')
            cy.get('[data-testid="menu.settings.budgetItems"]').should('be.visible')
            cy.get('[data-testid="menu.settings.budgetItems"]').should('have.text', "Partidas")
            cy.get('[data-testid="menu.settings.projects"]').should('be.visible')
            cy.get('[data-testid="menu.settings.projects"]').should('have.text', "Proyectos")
        })

        it('Should manage the users menu', () => {
            cy.get('[data-testid="menu.users"]').should('exist')
            cy.get('[data-testid="menu.users"]').should('have.text', 'Usuarios')
            cy.get('[data-testid="menu.users.list"]').should('not.be.visible')
            cy.get('[data-testid="menu.users.change"]').should('not.be.visible')
            cy.get('[data-testid="menu.users"]').click()
            cy.get('[data-testid="menu.users.list"]').should('be.visible')
            cy.get('[data-testid="menu.users.list"]').should('have.text', 'Listar')
            cy.get('[data-testid="menu.users.change"]').should('be.visible')
            cy.get('[data-testid="menu.users.change"]').should('have.text', "Cambiar Contraseña")
        })
    })
})
