import Materials from '.'

const cols = ['Código', 'Nombre', 'Unidad', 'Categoría']
const title = ['code', 'name', 'unit', 'category']

describe('<Materials />', () => {
    beforeEach(() => {
        cy.intercept('GET', '**/parametros/materiales', {
            statusCode: 200,
            fixture: 'parameters/materials/getAllMaterials.json',
        }).as('materials')
        cy.intercept('GET', '**/parametros/categorias', {
            statusCode: 200,
            fixture: 'parameters/categories/getAllCategories.json',
        }).as('categories')
        cy.wrapper(<Materials />)
    })

    it('should display the page', () => {
        cy.getByTestId('page.parameters.materials.loading').should('be.visible')

        cy.wait(['@materials', '@categories'])
        cy.getByTestId('page.parameters.materials.loading').should('not.exist')

        cy.getByTestId('component.pagetitle.title')
            .should('be.visible')
            .should('have.text', 'Materiales')

        cy.getByTestId('component.table.header.toolbar.main')
            .should('be.visible')
            .should('have.text', 'Crear Material')

        for (var i = 0; i < cols.length; i++) {
            cy.get(`[data-field="${title[i]}"]`)
                .find('.MuiDataGrid-columnHeaderTitle')
                .should('have.text', cols[i])

            cy.get(`[data-field="${title[i]}"]`)
                .find('.MuiDataGrid-columnHeaderTitle')
                .click()
        }
    })

    it('should open the drawer for creation', () => {
        cy.getByTestId('component.table.header.toolbar.main').click()
        cy.getByTestId('component.drawer').should('be.visible')

        cy.getByTestId('component.drawertitle.title')
            .should('be.visible')
            .should('have.text', 'Crear Material')

        cy.getByTestId('component.button.group.cancel').click()
        cy.getByTestId('component.drawer').should('not.exist')
    })

    it('should open the drawer for edition', () => {
        for (var i = 0; i < cols.length; i++) {
            cy.get(`[data-field="${title[i]}"]`)
                .find('.MuiDataGrid-columnHeaderTitle')
                .click()
        }

        cy.get('[data-rowindex="0"]')
            .find('[data-testid="EditOutlinedIcon"]')
            .click()

        cy.getByTestId('component.drawertitle.title')
            .should('be.visible')
            .should('have.text', 'Editar Material')

        cy.getByTestId('component.button.group.cancel').click()
        cy.getByTestId('component.drawer').should('not.exist')
    })
})
