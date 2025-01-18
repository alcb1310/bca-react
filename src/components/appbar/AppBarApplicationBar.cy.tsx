import ApplicationBar from './AppBar'

describe('<ApplicationBar />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-react
        cy.mount(<ApplicationBar />)
    })
})
