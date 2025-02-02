import Login from './Login'

describe('<Login />', () => {
    beforeEach(() => {
        cy.wrapper(<Login />)
    })

    it('should display the login screen', () => {
        cy.getByTestId('pages.login.title')
            .should('be.visible')
            .should('have.text', 'Login')

        cy.getByTestId('pages.login.error').should('not.exist')
        cy.getByTestId('pages.login.form.email.error').should('not.exist')
        cy.getByTestId('pages.login.form.passord.error').should('not.exist')

        cy.getByTestId('pages.login.form.email').should('be.visible')
        cy.getByTestId('pages.login.form.password').should('be.visible')
        cy.getByTestId('pages.login.form.submit')
            .should('be.visible')
            .should('have.text', 'Login')
    })

    describe('should display error on bad credentials', () => {
        it('should validate email and password', () => {
            cy.getByTestId('pages.login.form.email').type('test')
            cy.getByTestId('pages.login.form.submit').click()

            cy.getByTestId('pages.login.form.email.error')
                .should('be.visible')
                .should('have.text', 'Email no es valido')

            cy.getByTestId('pages.login.form.password.error')
                .should('be.visible')
                .should('have.text', 'Contraseña es obligatoria')
        })

        it('should validate password', () => {
            cy.getByTestId('pages.login.form.email').type('test@test.com')
            cy.getByTestId('pages.login.form.submit').click()

            cy.getByTestId('pages.login.form.email.error').should('not.exist')

            cy.getByTestId('pages.login.form.password.error')
                .should('be.visible')
                .should('have.text', 'Contraseña es obligatoria')
        })

        it('should validate email', () => {
            cy.getByTestId('pages.login.form.email').type('test')
            cy.getByTestId('pages.login.form.password').type('password')
            cy.getByTestId('pages.login.form.submit').click()

            cy.getByTestId('pages.login.form.email.error')
                .should('be.visible')
                .should('have.text', 'Email no es valido')

            cy.getByTestId('pages.login.form.password.error').should('not.exist')
        })
    })

    describe('it should parse api response', () => {
        it('should display invalid credentials when apropriate', () => {
            cy.intercept('POST', '**/login', {
                statusCode: 400,
                fixture: 'users/login_error.json',
            }).as('login')

            cy.getByTestId('pages.login.form.email').type('test@test.com')
            cy.getByTestId('pages.login.form.password').type('password')
            cy.getByTestId('pages.login.form.submit').click()
            cy.wait('@login')

            cy.getByTestId('pages.login.error')
                .should('be.visible')
                .should('have.text', 'credenciales inválidas')
        })

        it('should correctly login', () => {
            cy.intercept('POST', '**/login', {
                statusCode: 200,
                fixture: 'users/login_success.json',
            }).as('login')

            cy.getByTestId('pages.login.form.email').type('test@test.com')
            cy.getByTestId('pages.login.form.password').type('password')
            cy.getByTestId('pages.login.form.submit').click()
            cy.wait('@login')

            cy.getByTestId('pages.login.error').should('not.exist')

            cy.url().should('eq', 'http://localhost:5173/')
        })
    })
})
