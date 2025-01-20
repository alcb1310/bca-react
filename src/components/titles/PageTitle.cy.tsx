import TestAppWrapper from '../wrappers/TestAppWraper'
import PageTitle from './PageTitle'

describe('<PageTitle />', () => {
    it('should display the corret page ttle', () => {
        cy.mount(
            <TestAppWrapper>
                <PageTitle title='Test Page Title' />
            </TestAppWrapper>
        )

        cy.get('[data-testid="component.pagetitle.title"]')
            .should('be.visible')
            .should('have.text', 'Test Page Title')
    })
})
