import TestAppWrapper from '../../../wrappers/TestAppWraper'
import ProjectDrawer from './ProjectDrawer'

describe('<ProjectDrawer />', () => {
    it('should display all fields', () => {
        cy.mount(
            <TestAppWrapper>
                <ProjectDrawer
                    open={true}
                    onClose={() => { }}
                    defaultValues={{
                        id: '',
                        name: '',
                        is_active: false,
                    }}
                />
            </TestAppWrapper>
        )

        cy.get('[data-testid="component.drawertitle.title"]')
            .should('be.visible')
            .should('have.text', 'Proyectos')

        cy.get('[data-testid="component.drawer.settings.project.name"] > label')
            .should('exist')
            .should('have.text', 'Nombre')

        cy.get('[data-testid="component.drawer.settings.project.net.area"] > label')
            .should('exist')
            .should('have.text', 'Area Bruta')

        cy.get(
            '[data-testid="component.drawer.settings.project.gross.area"] > label'
        )
            .should('exist')
            .should('have.text', 'Area Util')

        cy.get(
            '[data-testid="component.drawer.settings.project.active"] > .MuiFormControlLabel-label'
        )
            .should('exist')
            .should('have.text', 'Activo')

        cy.get('[data-testid="component.button.group.save"]')
            .should('be.visible')
            .should('have.text', 'Guardar')

        cy.get('[data-testid="component.button.group.cancel"]')
            .should('be.visible')
            .should('have.text', 'Cancelar')
    })
})
