import Items from '.'

const cols = ['Código', 'Nombre', 'Unidad']
const title = ['code', 'name', 'unit']

describe('<Items />', () => {
    it('should display the page', () => {
        cy.intercept('GET', '**/parametros/rubros', {
            statusCode: 200,
            fixture: 'parameters/rubros/getAllRubros.json',
        }).as('rubros')
        cy.wrapper(<Items />)

        cy.wait('@rubros')

        cy.getByTestId('component.pagetitle.title')
            .should('be.visible')
            .should('have.text', 'Rubros')

        cy.getByTestId('component.table.header.toolbar.main')
            .should('be.visible')
            .should('have.text', 'Crear Rubro')
        for (var i = 0; i < cols.length; i++) {
            cy.get(`[data-field="${title[i]}"]`)
                .find('.MuiDataGrid-columnHeaderTitle')
                .should('have.text', cols[i])
        }
    })
})
