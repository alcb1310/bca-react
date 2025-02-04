import Admin from '.'

const cols = ['Nombre', 'Email']
const title = ['name', 'email']

describe('<Admin />', () => {
    beforeEach(() => {
        cy.intercept('GET', '**/users/me', {
            statusCode: 200,
            fixture: '/users/me.json',
        }).as('me')
        cy.intercept('GET', '**/users', {
            statusCode: 200,
            fixture: '/users/getAllUsers.json',
        }).as('users')
        cy.wrapper(<Admin />)
    })

    it('should display the page', () => {
        cy.getByTestId('component.users.table.loading').should('be.visible')

        cy.wait(['@me', '@users'])
        cy.getByTestId('component.users.table.loading').should('not.exist')

        cy.getByTestId('component.pagetitle.title')
            .should('be.visible')
            .should('have.text', 'Administración de usuarios')
        cy.getByTestId('component.table.header.toolbar.main')
            .should('be.visible')
            .should('have.text', 'Crear Usuario')

        for (var i = 0; i < cols.length; i++) {
            cy.get(`[data-field="${title[i]}"]`)
                .find('.MuiDataGrid-columnHeaderTitle')
                .should('have.text', cols[i])

            cy.get(`[data-field="${title[i]}"]`)
                .find('.MuiDataGrid-columnHeaderTitle')
                .click()
        }
    })

    it('should open the drawer', () => {
        cy.getByTestId('component.drawer').should('not.exist')
        cy.getByTestId('component.table.header.toolbar.main').click()
        cy.getByTestId('component.drawer').should('be.visible')
        cy.getByTestId('component.drawertitle.title')
            .should('be.visible')
            .should('have.text', 'Crear usuario')
        cy.getByTestId('component.button.group.cancel').click()
        cy.getByTestId('component.drawer').should('not.exist')
    })
})
