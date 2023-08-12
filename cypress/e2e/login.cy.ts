describe('template spec', () => {
    it('passes', () => {
        cy.visit('/')

        cy.get('[data-testid="login.title"]').should('exist')
        cy.get('[data-testid="login.title"]').should('have.text', "Login")

        cy.get('[data-testid="login.email"]').type('andres@andrescourt.com')
        cy.get('[data-testid="login.password"]').type('password123')
        cy.get('[data-testid="login.button"]').click()
    })
})
