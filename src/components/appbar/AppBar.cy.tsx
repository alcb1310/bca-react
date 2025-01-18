import ApplicationBar from './AppBar'
import TestAppWrapper from '../wrappers/TestAppWraper'

describe('<ApplicationBar />', () => {
    beforeEach(() => {
        cy.mount(
            <TestAppWrapper>
                <ApplicationBar />
            </TestAppWrapper>
        )
    })

    it('renders', () => {
        cy.get('[data-testid="title"]').should(
            'have.text',
            'Sistema Control Prespuestario'
        )
    })

    it('should display the user menu', () => {
        cy.get('[data-testid="user-menu"]').should('not.exist')
        cy.get('[data-testid="user-icon"]').trigger('click')
        cy.get('[data-testid="user-menu"]').should('be.visible')
        cy.get('[data-testid="user-profile"]').should('be.visible')
        cy.get('[data-testid="user-admin"]').should('be.visible')
        cy.get('[data-testid="user-password"]').should('be.visible')
    })
})
