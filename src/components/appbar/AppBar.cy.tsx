import ApplicationBar from './AppBar'

describe('<ApplicationBar />', () => {
    beforeEach(() => {
        cy.wrapper(<ApplicationBar />)
    })

    it('renders', () => {
        cy.getByTestId('title').should('have.text', 'Sistema Control Prespuestario')
    })

    it('should display the user menu', () => {
        cy.getByTestId('user-menu').should('not.exist')
        cy.getByTestId('user-icon').click()
        cy.getByTestId('user-menu').should('be.visible')
        cy.getByTestId('user-profile').should('be.visible')
        cy.getByTestId('user-admin').should('be.visible')
        cy.getByTestId('user-password').should('be.visible')
    })
})
