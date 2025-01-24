import TestAppWrapper from '../wrappers/TestAppWraper'
import DrawerTitle from './DrawerTitle'

describe('<DrawerTitle />', () => {
    it("should display the title's test", () => {
        cy.mount(
            <TestAppWrapper>
                <DrawerTitle title='Drawer Title' close={() => { }} />
            </TestAppWrapper>
        )

        cy.get('[data-testid="component.drawertitle.title"]')
            .should('be.visible')
            .should('have.text', 'Drawer Title')
        cy.get('[data-testid="component.drawertitle.close"]').should('be.visible')
    })
})
