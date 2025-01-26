import TestAppWrapper from '../../../wrappers/TestAppWraper'
import ProjectDrawer from './ProjectDrawer'

describe('<ProjectDrawer />', () => {
    beforeEach(() => {
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
    })

    it('should display all fields', () => {
        cy.get('[data-testid="component.drawertitle.title"]')
            .should('be.visible')
            .should('have.text', 'Proyectos')

        cy.get('[data-testid="component.drawer.settings.project.name"]')
            .find('label')
            .should('exist')
            .should('have.text', 'Nombre')

        cy.get('[data-testid="component.drawer.settings.project.net.area"]')
            .find('label')
            .should('exist')
            .should('have.text', 'Area Bruta')

        cy.get('[data-testid="component.drawer.settings.project.gross.area"]')
            .find('label')
            .should('exist')
            .should('have.text', 'Area Util')

        cy.get('[data-testid="component.drawer.settings.project.active"]')
            .should('exist')
            .should('have.text', 'Activo')

        cy.get('[data-testid="component.button.group.save"]')
            .should('be.visible')
            .should('have.text', 'Guardar')

        cy.get('[data-testid="component.button.group.cancel"]')
            .should('be.visible')
            .should('have.text', 'Cancelar')
    })

    describe('data validation on submit', () => {
        it('should show all the errors with every value invalid', () => {
            cy.get('[data-testid="component.drawer.settings.project.net.area"]').type(
                'lkdf'
            )
            cy.get(
                '[data-testid="component.drawer.settings.project.gross.area"]'
            ).type('lkdf')

            cy.get('[data-testid="component.button.group.save"]').click()

            cy.get('[data-testid="component.drawer.settings.project.name.error"]')
                .should('be.visible')
                .should('have.text', 'El nombre es requerido')

            cy.get('[data-testid="component.drawer.settings.project.net.area.error"]')
                .should('be.visible')
                .should('have.text', 'El valor debe ser un número')

            cy.get(
                '[data-testid="component.drawer.settings.project.gross.area.error"]'
            )
                .should('be.visible')
                .should('have.text', 'El valor debe ser un número')
        })

        it('should display an error only if the name is invalid', () => {
            cy.get('[data-testid="component.drawer.settings.project.net.area"]').type(
                '2540.45'
            )
            cy.get(
                '[data-testid="component.drawer.settings.project.gross.area"]'
            ).type('2787.83')

            cy.get('[data-testid="component.button.group.save"]').click()

            cy.get('[data-testid="component.drawer.settings.project.name.error"]')
                .should('be.visible')
                .should('have.text', 'El nombre es requerido')

            cy.get('[data-testid="component.drawer.settings.project.net.area"]')
                .find('input')
                .should('be.visible')
                .should('have.value', '2540.45')

            cy.get('[data-testid="component.drawer.settings.project.gross.area"]')
                .find('input')
                .should('be.visible')
                .should('have.value', '2787.83')
        })

        it('should display an errorr if only the net area is invalid', () => {
            cy.get('[data-testid="component.drawer.settings.project.name"]').type(
                'name'
            )

            cy.get('[data-testid="component.drawer.settings.project.net.area"]').type(
                'djklfa'
            )
            cy.get(
                '[data-testid="component.drawer.settings.project.gross.area"]'
            ).type('2787.83')

            cy.get('[data-testid="component.button.group.save"]').click()

            cy.get('[data-testid="component.drawer.settings.project.net.area.error"]')
                .should('be.visible')
                .should('have.text', 'El valor debe ser un número')

            cy.get('[data-testid="component.drawer.settings.project.name"]')
                .find('input')
                .should('be.visible')
                .should('have.value', 'name')

            cy.get('[data-testid="component.drawer.settings.project.net.area"]')
                .find('input')
                .should('be.visible')
                .should('have.value', 'djklfa')

            cy.get('[data-testid="component.drawer.settings.project.gross.area"]')
                .find('input')
                .should('be.visible')
                .should('have.value', '2787.83')
        })

        it('should display an errorr if only the gross area is invalid', () => {
            cy.get('[data-testid="component.drawer.settings.project.name"]').type(
                'name'
            )

            cy.get('[data-testid="component.drawer.settings.project.net.area"]').type(
                '2357.23'
            )
            cy.get(
                '[data-testid="component.drawer.settings.project.gross.area"]'
            ).type('adfja')

            cy.get('[data-testid="component.button.group.save"]').click()

            cy.get(
                '[data-testid="component.drawer.settings.project.gross.area.error"]'
            )
                .should('be.visible')
                .should('have.text', 'El valor debe ser un número')

            cy.get('[data-testid="component.drawer.settings.project.name"]')
                .find('input')
                .should('be.visible')
                .should('have.value', 'name')

            cy.get('[data-testid="component.drawer.settings.project.net.area"]')
                .find('input')
                .should('be.visible')
                .should('have.value', '2357.23')

            cy.get('[data-testid="component.drawer.settings.project.gross.area"]')
                .find('input')
                .should('be.visible')
                .should('have.value', 'adfja')
        })

        it('should allow to only type a ame', () => {
            cy.get('[data-testid="component.drawer.settings.project.name"]').type(
                'name'
            )

            cy.get('[data-testid="component.button.group.save"]').click()

            cy.get(
                '[data-testid="component.drawer.settings.project.net.area.error"]'
            ).should('not.be.visible')

            cy.get(
                '[data-testid="component.drawer.settings.project.gross.area.error"]'
            ).should('not.be.visible')
        })
    })
})
