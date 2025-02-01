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

    describe('show the drawer', () => {
        it('should open for creation', () => {
            cy.get('[data-testid="component.table.header.toolbar.main"]').click()
            cy.get('[data-testid="component.drawer"]').should('be.visible')
            cy.get('[data-testid="component.drawertitle.title"]').should(
                'have.text',
                'Crear Categorias'
            )
            cy.get('[data-testid="component.button.group.cancel"]').click()
            cy.get('[data-testid="component.drawer"]').should('not.exist')
        })

        it('should open for edit', () => {
            cy.get('[data-rowindex="0"]').find('[aria-colindex="2"]').click()
            cy.get('[data-testid="component.drawertitle.title"]').should(
                'have.text',
                'Editar Categoria'
            )
            cy.get('[data-testid="component.button.group.cancel"]').click()
            cy.get('[data-testid="component.drawer"]').should('not.exist')
        })
    })
})
