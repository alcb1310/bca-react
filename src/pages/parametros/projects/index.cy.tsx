import Projects from '.'

const cols = ['Nombre', 'Area Bruta', 'Area Util', 'Activo']
const title = ['name', 'net_area', 'gross_area', 'is_active']

describe('<Projects />', () => {
    beforeEach(() => {
        cy.intercept('GET', '**/parametros/proyectos?query=', {
            statusCode: 200,
            fixture: 'parameters/projects/getAllProjects.json',
        }).as('projects')
        cy.wrapper(<Projects />)
    })

    it('should display the page', () => {
        cy.getByTestId('page.parameters.projects.loading').should('be.visible')
        cy.wait('@projects')
        cy.getByTestId('page.parameters.projects.loading').should('not.exist')

        cy.getByTestId('component.pagetitle.title')
            .should('be.visible')
            .should('have.text', 'Proyectos')

        cy.getByTestId('component.table.header.toolbar.main')
            .should('be.visible')
            .should('have.text', 'Crear Proyecto')

        cy.getByTestId('page.parameters.projects.search')
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

    it('should display the drawer in create mode', () => {
        cy.getByTestId('component.drawer').should('not.exist')

        cy.getByTestId('component.table.header.toolbar.main').click()
        cy.getByTestId('component.drawer').should('be.visible')

        cy.getByTestId('component.drawertitle.title')
            .should('be.visible')
            .should('have.text', 'Crear Proyecto')

        cy.getByTestId('component.button.group.cancel').click()
        cy.getByTestId('component.drawer').should('not.exist')
    })

    it('should display the drawer in edit mode', () => {
        cy.getByTestId('component.drawer').should('not.exist')

        for (var i = 0; i < cols.length; i++) {
            cy.get(`[data-field="${title[i]}"]`)
                .find('.MuiDataGrid-columnHeaderTitle')
                .click()
        }

        cy.get('[data-rowindex="2"]')
            .find('[data-testid="EditOutlinedIcon"]')
            .click()
        cy.getByTestId('component.drawer').should('be.visible')

        cy.getByTestId('component.drawertitle.title')
            .should('be.visible')
            .should('have.text', 'Editar Proyecto')

        cy.getByTestId('component.button.group.cancel').click()
        cy.getByTestId('component.drawer').should('not.exist')
    })
})
