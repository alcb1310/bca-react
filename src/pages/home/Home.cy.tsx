import TestAppWrapper from '../../components/wrappers/TestAppWraper'
import Home from './Home'

describe('<Home />', () => {
    it('should display the home page', () => {
        // cy.intercept must be called BEFORE mounting the component
        cy.intercept('GET', '**/users/me', { fixture: 'users/me.json' }).as(
            'currentUser'
        )

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
