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
})
