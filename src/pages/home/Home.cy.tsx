import TestAppWrapper from '../../components/wrappers/TestAppWraper'
import Home from './Home'

describe('<Home />', () => {
    it('should display the home page', () => {
        // cy.intercept must be called BEFORE mounting the component
        cy.intercept(
            'GET', // Route all GET requests
            '**/users/me', // that have a URL that matches '/api/v1/users/me'
            {
                statusCode: 200,
                // JSON Response
                body: {
                    name: 'Test User',
                    email: 'test@test.com',
                    role_id: 'a',
                },
            }
        ).as('currentUser') // and assign an alias

        cy.mount(
            <TestAppWrapper>
                <Home />
            </TestAppWrapper>
        )
        cy.wait(['@currentUser'])

        cy.get('[data-testid="pages.home.welcome"]').should(
            'include.text',
            'Bienvenido'
        )
        cy.get('[data-testid="pages.home.username"]').should(
            'have.text',
            'Test User'
        )
    })
})
