import ChangePassword from '.'

describe('<ChangePassword />', () => {
    it('should display the page', () => {
        cy.wrapper(<ChangePassword onClose={() => { }} />)

        cy.getByTestId('component.drawertitle.title')
            .should('be.visible')
            .should('have.text', 'Cambiar Contraseña')

        cy.getByTestId('page.user.password.field')
            .should('be.visible')
            .find('label')
            .should('have.text', 'Contraseña')

        cy.getByTestId('component.button.group.save')
            .should('be.visible')
            .should('have.text', 'Guardar')
        cy.getByTestId('component.button.group.cancel')
            .should('be.visible')
            .should('have.text', 'Cancelar')
    })
})
