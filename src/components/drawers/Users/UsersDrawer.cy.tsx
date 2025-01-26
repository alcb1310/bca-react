import TestAppWrapper from '../../wrappers/TestAppWraper'
import UsersDrawer from './UsersDrawer'

describe('<UsersDrawer />', () => {
    describe('creating a user', () => {
        it('should display all the fields', () => {
            cy.mount(
                <TestAppWrapper>
                    <UsersDrawer
                        open={true}
                        onClose={() => { }}
                        userData={{
                            name: '',
                            email: '',
                            password: '',
                        }}
                    />
                </TestAppWrapper>
            )

            cy.get('[data-testid="component.drawertitle.title"]')
                .should('be.visible')
                .should('have.text', 'Crear usuario')

            cy.get('[data-testid="component.drawer.user.email"] > label')
                .should('exist')
                .should('have.text', 'Email')

            cy.get('[data-testid="component.drawer.user.name"] > label')
                .should('exist')
                .should('have.text', 'Nombre')

            cy.get('[data-testid="component.drawer.user.password"] > label')
                .should('exist')
                .should('have.text', 'Contraseña')

            cy.get('[data-testid="component.button.group.save"]')
                .should('be.visible')
                .should('have.text', 'Guardar')

            cy.get('[data-testid="component.button.group.cancel"]')
                .should('be.visible')
                .should('have.text', 'Cancelar')
        })
    })
})
