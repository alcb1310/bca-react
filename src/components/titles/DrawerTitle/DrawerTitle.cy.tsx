import DrawerTitle from './DrawerTitle'

describe('<DrawerTitle />', () => {
    it("should display the title's test", () => {
        cy.wrapper(<DrawerTitle title='Drawer Title' close={() => { }} />)

        cy.getByTestId('component.drawertitle.title')
            .should('be.visible')
            .should('have.text', 'Drawer Title')
        cy.getByTestId('component.drawertitle.close').should('be.visible')
    })
})
