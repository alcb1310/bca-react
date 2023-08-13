describe('Login test', () => {
	it('Should be able to login and logout', () => {
		cy.intercept({
			method: 'POST',
			url: '**/api/login',
		},{fixture: '../../src/mocks/bca/fixtures/login.json'}).as('login')
		cy.intercept({
			method: 'GET',
			url: '**/api/validate',
		},{fixture: '../../src/mocks/bca/fixtures/validate.json'}).as('validate')
		cy.visit('/login')

		cy.get('[data-testid="login.title"]').should('exist')
		cy.get('[data-testid="login.title"]').should('have.text', "Login")

		cy.get('[data-testid="login.email"]').type('andres@andrescourt.com')
		cy.get('[data-testid="login.password"]').type('password123')
		cy.get('[data-testid="login.button"]').should('exist')
		cy.get('[data-testid="login.button"]').click()

		cy.wait('@login')

		cy.get('[data-testid="landing.title"]').should("have.text", "Bienvenido")

		cy.get('[data-testid="titlebar.title"]').should("have.text", "Sistema de control presupuestario")
		cy.get('[data-testid="titlebar.logout"]').should('exist')
		cy.get('[data-testid="titlebar.logout"]').should('have.text', "Salir")
		cy.get('[data-testid="titlebar.logout"]').click()

		cy.get('[data-testid="login.title"]').should('have.text', "Login")
	})
})
