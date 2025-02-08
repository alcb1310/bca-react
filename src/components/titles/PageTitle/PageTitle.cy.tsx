import PageTitle from '../PageTitle/PageTitle'

describe('<PageTitle />', () => {
    it('should display the corret page ttle', () => {
        cy.wrapper(<PageTitle title='Test Page Title' />)

        cy.getByTestId('component.pagetitle.title')
            .should('be.visible')
            .should('have.text', 'Test Page Title')
    })
})
