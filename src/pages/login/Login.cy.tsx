import TestAppWrapper from '../../components/wrappers/TestAppWraper'
import Login from './Login'

describe('<Login />', () => {
    beforeEach(() => {
        cy.mount(
            <TestAppWrapper>
                <Login />
            </TestAppWrapper>
        )
    })

    it('should display the login screen', () => {
        cy.get('[data-testid="pages.login.title"]')
            .should('be.visible')
            .should('have.text', 'Login')

        cy.get('[data-testid="pages.login.error"]').should('not.exist')
        cy.get('[data-testid="pages.login.form.email.error"]').should('not.exist')
        cy.get('[data-testid="pages.login.form.passord.error"]').should('not.exist')

        cy.get('[data-testid="pages.login.form.email"]').should('be.visible')
        cy.get('[data-testid="pages.login.form.password"]').should('be.visible')
        cy.get('[data-testid="pages.login.form.submit"]')
            .should('be.visible')
            .should('have.text', 'Login')
    })

    describe('should display error on bad credentials', () => {
        it('should validate email and password', () => {
            cy.get('[data-testid="pages.login.form.email"]').type('test')
            cy.get('[data-testid="pages.login.form.submit"]').click()

            cy.get('[data-testid="pages.login.form.email.error"]')
                .should('be.visible')
                .should('have.text', 'Email no es valido')

            cy.get('[data-testid="pages.login.form.password.error"]')
                .should('be.visible')
                .should('have.text', 'Contraseña es obligatoria')
        })

        it('should validate password', () => {
            cy.get('[data-testid="pages.login.form.email"]').type('test@test.com')
            cy.get('[data-testid="pages.login.form.submit"]').click()

            cy.get('[data-testid="pages.login.form.email.error"]').should('not.exist')

            cy.get('[data-testid="pages.login.form.password.error"]')
                .should('be.visible')
                .should('have.text', 'Contraseña es obligatoria')
        })

        it('should validate email', () => {
            cy.get('[data-testid="pages.login.form.email"]').type('test')
            cy.get('[data-testid="pages.login.form.password"]').type('password')
            cy.get('[data-testid="pages.login.form.submit"]').click()

            cy.get('[data-testid="pages.login.form.email.error"]')
                .should('be.visible')
                .should('have.text', 'Email no es valido')

            cy.get('[data-testid="pages.login.form.password.error"]').should(
                'not.exist'
            )
        })
    })

    describe('it should parse api response', () => {
        it('should display invalid credentials when apropriate', () => {
            cy.intercept('POST', '**/login', {
                statusCode: 400,
                fixture: 'users/login_error.json',
            }).as('login')

            cy.get('[data-testid="pages.login.form.email"]').type('test@test.com')
            cy.get('[data-testid="pages.login.form.password"]').type('password')
            cy.get('[data-testid="pages.login.form.submit"]').click()
            cy.wait('@login')

            cy.get('[data-testid="pages.login.error"]')
                .should('be.visible')
                .should('have.text', 'credenciales inválidas')
        })

        it('should correctly login', () => {
            cy.intercept('POST', '**/login', {
                statusCode: 200,
                fixture: 'users/login_success.json',
            }).as('login')

            cy.get('[data-testid="pages.login.form.email"]').type('test@test.com')
            cy.get('[data-testid="pages.login.form.password"]').type('password')
            cy.get('[data-testid="pages.login.form.submit"]').click()
            cy.wait('@login')

            cy.get('[data-testid="pages.login.error"]').should('not.exist')

            cy.url().should('eq', 'http://localhost:5173/')
        })
    })
})
