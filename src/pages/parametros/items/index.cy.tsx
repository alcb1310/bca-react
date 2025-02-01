import Items from '.'
import TestAppWrapper from '../../../components/wrappers/TestAppWraper'

const cols = ['Código', 'Nombre', 'Unidad']
const title = ['code', 'name', 'unit']

describe('<Items />', () => {
    it('should display the page', () => {
        cy.intercept('GET', '**/parametros/rubros', {
            statusCode: 200,
            fixture: 'parameters/rubros/getAllRubros.json',
        }).as('rubros')
        cy.mount(
            <TestAppWrapper>
                <Items />
            </TestAppWrapper>
        )
        cy.wait('@rubros')

        cy.get('[data-testid="component.pagetitle.title"]')
            .should('be.visible')
            .should('have.text', 'Rubros')

        cy.get('[data-testid="component.table.header.toolbar.main"]')
            .should('be.visible')
            .should('have.text', 'Crear Rubro')
        for (var i = 0; i < cols.length; i++) {
            cy.get(`[data-field="${title[i]}"]`)
                .find('.MuiDataGrid-columnHeaderTitle')
                .should('have.text', cols[i])
        }
    })
})
