import UsersDrawer from './UsersDrawer'

describe('<UsersDrawer />', () => {
    describe('creating a user', () => {
        beforeEach(() => {
            cy.wrapper(
                <UsersDrawer
                    open={true}
                    onClose={() => { }}
                    userData={{
                        name: '',
                        email: '',
                        password: '',
                    }}
                />
            )
        })

        it('should display all the fields', () => {
            cy.getByTestId('component.drawertitle.title')
                .should('be.visible')
                .should('have.text', 'Crear usuario')

            cy.getByTestId('component.drawer.user.email')
                .find('label')
                .should('exist')
                .should('have.text', 'Email')

            cy.getByTestId('component.drawer.user.name')
                .find('label')
                .should('exist')
                .should('have.text', 'Nombre')

            cy.getByTestId('component.drawer.user.password')
                .find('label')
                .should('exist')
                .should('have.text', 'Contraseña')

            cy.getByTestId('component.button.group.save')
                .should('be.visible')
                .should('have.text', 'Guardar')

            cy.getByTestId('component.button.group.cancel')
                .should('be.visible')
                .should('have.text', 'Cancelar')
        })

        it('should validate all fields', () => {
            cy.getByTestId('component.button.group.save').click()

            cy.getByTestId('component.drawer.user.email.error')
                .should('be.visible')
                .should('have.text', 'Email es obligatorio')

            cy.getByTestId('component.drawer.user.name.error')
                .should('be.visible')
                .should('have.text', 'Nombre es obligatorio')

            cy.getByTestId('component.drawer.user.password.error')
                .should('be.visible')
                .should('have.text', 'Contraseña es obligatoria')
        })

        it('should require a name', () => {
            cy.getByTestId('component.drawer.user.email').type('email@test.com')
            cy.getByTestId('component.drawer.user.password').type('password')

            cy.getByTestId('component.button.group.save').click()

            cy.getByTestId('component.drawer.user.email.error').should(
                'not.be.visible'
            )

            cy.getByTestId('component.drawer.user.name.error')
                .should('be.visible')
                .should('have.text', 'Nombre es obligatorio')

            cy.getByTestId('component.drawer.user.password.error').should(
                'not.be.visible'
            )
        })

        describe('email', () => {
            it('should validate valid email', () => {
                cy.getByTestId('component.drawer.user.email').type('email')
                cy.getByTestId('component.drawer.user.name').type('name')
                cy.getByTestId('component.drawer.user.password').type('password')

                cy.getByTestId('component.button.group.save').click()

                cy.getByTestId('component.drawer.user.email.error')
                    .should('be.visible')
                    .should('have.text', 'Email no es valido')

                cy.getByTestId('component.drawer.user.name.error').should(
                    'not.be.visible'
                )

                cy.getByTestId('component.drawer.user.password.error').should(
                    'not.be.visible'
                )
            })

            it('error if only email is missing', () => {
                cy.getByTestId('component.drawer.user.name').type('name')
                cy.getByTestId('component.drawer.user.password').type('password')

                cy.getByTestId('component.button.group.save').click()

                cy.getByTestId('component.drawer.user.email.error')
                    .should('be.visible')
                    .should('have.text', 'Email es obligatorio')

                cy.getByTestId('component.drawer.user.name.error').should(
                    'not.be.visible'
                )

                cy.getByTestId('component.drawer.user.password.error').should(
                    'not.be.visible'
                )
            })
        })

        describe('password', () => {
            it('requires a password', () => {
                cy.getByTestId('component.drawer.user.email').type('email@test.com')
                cy.getByTestId('component.drawer.user.name').type('name')

                cy.getByTestId('component.button.group.save').click()

                cy.getByTestId('component.drawer.user.email.error').should(
                    'not.be.visible'
                )

                cy.getByTestId('component.drawer.user.name.error').should(
                    'not.be.visible'
                )

                cy.getByTestId('component.drawer.user.password.error')
                    .should('be.visible')
                    .should('have.text', 'Contraseña es obligatoria')
            })

            it('should require at least 8 char password', () => {
                cy.getByTestId('component.drawer.user.email').type('email@test.com')
                cy.getByTestId('component.drawer.user.name').type('name')
                cy.getByTestId('component.drawer.user.password').type('pas')

                cy.getByTestId('component.button.group.save').click()

                cy.getByTestId('component.drawer.user.email.error').should(
                    'not.be.visible'
                )

                cy.getByTestId('component.drawer.user.name.error').should(
                    'not.be.visible'
                )

                cy.getByTestId('component.drawer.user.password.error')
                    .should('be.visible')
                    .should('have.text', 'Contraseña debe ser mayor a 8 caracteres')
            })
        })
    })

    describe('Update user', () => {
        beforeEach(() => {
            cy.wrapper(
                <UsersDrawer
                    open={true}
                    onClose={() => { }}
                    userData={{
                        id: '',
                        name: 'Test',
                        email: 'email@test.com',
                        company_id: '',
                        role_id: 'a',
                    }}
                />
            )
        })

        it('should display all fieds', () => {
            cy.getByTestId('component.drawertitle.title')
                .should('be.visible')
                .should('have.text', 'Editar usuario')

            cy.getByTestId('component.drawer.user.email')
                .find('label')
                .should('exist')
                .should('have.text', 'Email')

            cy.getByTestId('component.drawer.user.email')
                .find('input')
                .should('be.visible')
                .should('have.value', 'email@test.com')
                .should('not.be.enabled')

            cy.getByTestId('component.drawer.user.name')
                .find('label')
                .should('exist')
                .should('have.text', 'Nombre')

            cy.getByTestId('component.drawer.user.name')
                .find('input')
                .should('be.visible')
                .should('have.value', 'Test')

            cy.getByTestId('component.button.group.save')
                .should('be.visible')
                .should('have.text', 'Guardar')

            cy.getByTestId('component.button.group.cancel')
                .should('be.visible')
                .should('have.text', 'Cancelar')
        })

        it('should validate name', () => {
            cy.getByTestId('component.drawer.user.name').find('input').clear()

            cy.getByTestId('component.button.group.save').click()

            cy.getByTestId('component.drawer.user.email.error').should(
                'not.be.visible'
            )

            cy.getByTestId('component.drawer.user.name.error')
                .should('be.visible')
                .should('have.text', 'Nombre es obligatorio')
        })
    })
})
