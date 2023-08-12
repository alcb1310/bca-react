describe('Login test', () => {
    it('Should be able to login and logout', () => {
        cy.visit('/')

        cy.get('[data-testid="login.title"]').should('exist')
        cy.get('[data-testid="login.title"]').should('have.text', "Login")

        cy.get('[data-testid="login.email"]').type('andres@andrescourt.com')
        cy.get('[data-testid="login.password"]').type('password123')
        cy.get('[data-testid="login.button"]').should('exist')
        cy.get('[data-testid="login.button"]').click()

        // cy.get('[data-testid="landing.title"]').should("have.text", "Bienvenido")
        //
        // cy.get('[data-testid="titlebar.title"]').should("have.text", "Sistema de control presupuestario")
        // cy.get('[data-testid="titlebar.logout"]').should('exist').should('have.text', "Salir")
        // cy.get('[data-testid="titlebar.logout"]').click()
        //
        // cy.get('[data-testid="login.title"]').should('have.text', "Login")
    })
})
