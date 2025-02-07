import Categories from '.'

const cols = ['Categoría']
const title = ['name']

describe('<Categories />', () => {
    beforeEach(() => {
        cy.intercept('GET', '**/parametros/categorias', {
            statusCode: 200,
            fixture: 'parameters/categories/getAllCategories.json',
        }).as('categorias')
        cy.wrapper(<Categories />)
    })

    it('should display all the fields', () => {
        cy.getByTestId('page.parametros.categorias.loading').should('be.visible')

        cy.wait('@categorias')

        cy.getByTestId('page.parametros.categorias.loading').should('not.exist')

        cy.getByTestId('component.pagetitle.title')
            .should('be.visible')
            .should('have.text', 'Categorias')

        cy.getByTestId('component.table.header.toolbar.main')
            .should('be.visible')
            .should('have.text', 'Crear Categoria')
        cy.getByTestId('component.drawer').should('not.exist')
        for (var i = 0; i < cols.length; i++) {
            cy.get(`[data-field="${title[i]}"]`)
                .find('.MuiDataGrid-columnHeaderTitle')
                .should('have.text', cols[i])
        }
    })

    describe('show the drawer', () => {
        it('should open for creation', () => {
            cy.getByTestId('component.table.header.toolbar.main').click()
            cy.getByTestId('component.drawer').should('be.visible')
            cy.getByTestId('component.drawertitle.title').should(
                'have.text',
                'Crear Categorias'
            )
            cy.getByTestId('component.button.group.cancel').click()
            cy.getByTestId('component.drawer').should('not.exist')
        })

        it('should open for edit', () => {
            cy.get('[data-rowindex="0"]').find('[aria-colindex="2"]').click()
            cy.getByTestId('component.drawertitle.title').should(
                'have.text',
                'Editar Categoria'
            )
            cy.getByTestId('component.button.group.cancel').click()
            cy.getByTestId('component.drawer').should('not.exist')
        })
    })
})
