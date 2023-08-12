describe("Login to the app", () => {
    it("should be able to login and logout", () => {
        cy.visit("/")

        cy.get('[data-testid="login.title"]', { timeout: 10000 }).should('exist')
        cy.get('[data-testid="login.title"]').should('have.text', "Login")

        // cy.get('[data-testid="login.email"]').clear()
        cy.get('[data-testid="login.email"]').type("andres@andrescourt.com")
        cy.get('[data-testid="login.password"]').type("password123")
        cy.get('[data-testid="login.button"]').click()

        cy.get('[data-testid="landing.title"]').should('exist')

        cy.get('[data-testid="site.title"]').should('have.text', "Sistema de control presupuestario")
        cy.get('[data-testid="site.logout"]').should('exist')
        cy.get('[data-testid="site.logout"]').click()

        cy.get('[data-testid="login.title"]', { timeout: 10000 }).should('exist')
        cy.get('[data-testid="login.title"]').should('have.text', "Login")
    })

    it("should go to the caller page when login", () => {
        cy.visit("/settings/suppliers")
    })
})
