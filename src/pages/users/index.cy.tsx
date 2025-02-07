import UsersHome from '.'

describe('<UsersHome />', () => {
    it('should display the page', () => {
        cy.intercept('GET', '**/users/me', {
            statusCode: 200,
            fixture: 'users/me.json',
        }).as('me')
        cy.wrapper(<UsersHome />)
        cy.getByTestId('page.user.loading').should('be.visible')
        cy.wait('@me')
        cy.getByTestId('page.user.loading').should('not.exist')

        cy.getByTestId('component.pagetitle.title')
            .should('be.visible')
            .should('have.text', 'Perfil')

        cy.getByTestId('page.user.name')
            .should('be.visible')
            .should('have.text', 'Test User')
        cy.getByTestId('page.user.email')
            .should('be.visible')
            .should('have.text', 'test@test.com')
    })
})
