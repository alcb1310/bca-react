import Projects from '.'
import TestAppWrapper from '../../../components/wrappers/TestAppWraper'

const cols = ['Nombre', 'Area Bruta', 'Area Util', 'Activo']
const title = ['name', 'net_area', 'gross_area', 'is_active']

describe('<Projects />', () => {
    it('should display the page', () => {
        cy.intercept('GET', '**/parametros/proyectos?query=', {
            statusCode: 200,
            fixture: 'parameters/projects/getAllProjects.json',
        }).as('projects')
        cy.mount(
            <TestAppWrapper>
                <Projects />
            </TestAppWrapper>
        )

        cy.get('[data-testid="page.parameters.projects.loading"]').should(
            'be.visible'
        )
        cy.wait('@projects')
        cy.get('[data-testid="page.parameters.projects.loading"]').should(
            'not.exist'
        )

        cy.get('[data-testid="component.pagetitle.title"]')
            .should('be.visible')
            .should('have.text', 'Proyectos')

        cy.get('[data-testid="component.table.header.toolbar.main"]')
            .should('be.visible')
            .should('have.text', 'Crear Proyecto')

        cy.get('[data-testid="page.parameters.projects.search"]')
            .should('be.visible')
            .find('label')
            .should('have.text', 'Buscar')

        for (var i = 0; i < cols.length; i++) {
            cy.get(`[data-field="${title[i]}"]`)
                .find('.MuiDataGrid-columnHeaderTitle')
                .should('have.text', cols[i])

            cy.get(`[data-field="${title[i]}"]`)
                .find('.MuiDataGrid-columnHeaderTitle')
                .click()
        }
    })
})
