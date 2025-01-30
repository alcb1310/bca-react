import Categories from '.'
import TestAppWrapper from '../../../components/wrappers/TestAppWraper'

const cols = ['Categoría']
const title = ['name']

describe('<Categories />', () => {
    beforeEach(() => {
        cy.intercept('GET', '**/parametros/categorias', {
            statusCode: 200,
            fixture: 'parameters/categories/getAllCategories.json',
        }).as('categorias')

        cy.mount(
            <TestAppWrapper>
                <Categories />
            </TestAppWrapper>
        )
    })

    it('should display all the fields', () => {
        cy.get('[data-testid="page.parametros.categorias.loading"]').should(
            'be.visible'
        )

        cy.wait('@categorias')

        cy.get('[data-testid="page.parametros.categorias.loading"]').should(
            'not.exist'
        )

        cy.get('[data-testid="component.pagetitle.title"]')
            .should('be.visible')
            .should('have.text', 'Categorias')

        cy.get('[data-testid="component.table.header.toolbar.main"]')
            .should('be.visible')
            .should('have.text', 'Crear Categoria')
        cy.get('[data-testid="component.drawer"]').should('not.exist')
        for (var i = 0; i < cols.length; i++) {
            cy.get(`[data-field="${title[i]}"]`)
                .find('.MuiDataGrid-columnHeaderTitle')
                .should('have.text', cols[i])
        }
    })
})
