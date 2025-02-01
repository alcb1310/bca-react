import Materials from '.'
import TestAppWrapper from '../../../components/wrappers/TestAppWraper'

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

        cy.mount(
            <TestAppWrapper>
                <Materials />
            </TestAppWrapper>
        )
    })

    it('should display the page', () => {
        cy.get('[data-testid="page.parameters.materials.loading"]').should(
            'be.visible'
        )

        cy.wait(['@materials', '@categories'])
        cy.get('[data-testid="page.parameters.materials.loading"]').should(
            'not.exist'
        )

        cy.get('[data-testid="component.pagetitle.title"]')
            .should('be.visible')
            .should('have.text', 'Materiales')

        cy.get('[data-testid="component.table.header.toolbar.main"]')
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
        cy.get('[data-testid="component.table.header.toolbar.main"]').click()
        cy.get('[data-testid="component.drawer"]').should('be.visible')

        cy.get('[data-testid="component.drawertitle.title"]')
            .should('be.visible')
            .should('have.text', 'Crear Material')

        cy.get('[data-testid="component.button.group.cancel"]').click()
        cy.get('[data-testid="component.drawer"]').should('not.exist')
    })
})
