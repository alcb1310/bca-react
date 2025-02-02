import ProjectDrawer from './ProjectDrawer'

describe('<ProjectDrawer />', () => {
    describe('Creating a project', () => {
        beforeEach(() => {
            cy.wrapper(
                <ProjectDrawer
                    open={true}
                    onClose={() => { }}
                    defaultValues={{
                        id: '',
                        name: '',
                        is_active: false,
                    }}
                />
            )
        })

        it('should display all fields', () => {
            cy.getByTestId('component.drawertitle.title')
                .should('be.visible')
                .should('have.text', 'Crear Proyecto')

            cy.getByTestId('component.drawer.settings.project.name')
                .find('label')
                .should('exist')
                .should('have.text', 'Nombre')

            cy.getByTestId('component.drawer.settings.project.net.area')
                .find('label')
                .should('exist')
                .should('have.text', 'Area Bruta')

            cy.getByTestId('component.drawer.settings.project.gross.area')
                .find('label')
                .should('exist')
                .should('have.text', 'Area Util')

            cy.getByTestId('component.drawer.settings.project.active')
                .should('exist')
                .should('have.text', 'Activo')

            cy.getByTestId('component.button.group.save')
                .should('be.visible')
                .should('have.text', 'Guardar')

            cy.getByTestId('component.button.group.cancel')
                .should('be.visible')
                .should('have.text', 'Cancelar')
        })

        describe('data validation on submit', () => {
            it('should show all the errors with every value invalid', () => {
                cy.getByTestId('component.drawer.settings.project.net.area').type(
                    'lkdf'
                )
                cy.getByTestId('component.drawer.settings.project.gross.area').type(
                    'lkdf'
                )

                cy.getByTestId('component.button.group.save').click()

                cy.getByTestId('component.drawer.settings.project.name.error')
                    .should('be.visible')
                    .should('have.text', 'El nombre es requerido')

                cy.getByTestId('component.drawer.settings.project.net.area.error')
                    .should('be.visible')
                    .should('have.text', 'El valor debe ser un número')

                cy.getByTestId('component.drawer.settings.project.gross.area.error')
                    .should('be.visible')
                    .should('have.text', 'El valor debe ser un número')
            })

            it('should display an error only if the name is invalid', () => {
                cy.getByTestId('component.drawer.settings.project.net.area').type(
                    '2540.45'
                )
                cy.getByTestId('component.drawer.settings.project.gross.area').type(
                    '2787.83'
                )

                cy.getByTestId('component.button.group.save').click()

                cy.getByTestId('component.drawer.settings.project.name.error')
                    .should('be.visible')
                    .should('have.text', 'El nombre es requerido')

                cy.getByTestId('component.drawer.settings.project.net.area')
                    .find('input')
                    .should('be.visible')
                    .should('have.value', '2540.45')

                cy.getByTestId('component.drawer.settings.project.gross.area')
                    .find('input')
                    .should('be.visible')
                    .should('have.value', '2787.83')
            })

            it('should display an errorr if only the net area is invalid', () => {
                cy.getByTestId('component.drawer.settings.project.name').type('name')

                cy.getByTestId('component.drawer.settings.project.net.area').type(
                    'djklfa'
                )
                cy.getByTestId('component.drawer.settings.project.gross.area').type(
                    '2787.83'
                )

                cy.getByTestId('component.button.group.save').click()

                cy.getByTestId('component.drawer.settings.project.net.area.error')
                    .should('be.visible')
                    .should('have.text', 'El valor debe ser un número')

                cy.getByTestId('component.drawer.settings.project.name')
                    .find('input')
                    .should('be.visible')
                    .should('have.value', 'name')

                cy.getByTestId('component.drawer.settings.project.net.area')
                    .find('input')
                    .should('be.visible')
                    .should('have.value', 'djklfa')

                cy.getByTestId('component.drawer.settings.project.gross.area')
                    .find('input')
                    .should('be.visible')
                    .should('have.value', '2787.83')
            })

            it('should display an errorr if only the gross area is invalid', () => {
                cy.getByTestId('component.drawer.settings.project.name').type('name')

                cy.getByTestId('component.drawer.settings.project.net.area').type(
                    '2357.23'
                )
                cy.getByTestId('component.drawer.settings.project.gross.area').type(
                    'adfja'
                )

                cy.getByTestId('component.button.group.save').click()

                cy.getByTestId('component.drawer.settings.project.gross.area.error')
                    .should('be.visible')
                    .should('have.text', 'El valor debe ser un número')

                cy.getByTestId('component.drawer.settings.project.name')
                    .find('input')
                    .should('be.visible')
                    .should('have.value', 'name')

                cy.getByTestId('component.drawer.settings.project.net.area')
                    .find('input')
                    .should('be.visible')
                    .should('have.value', '2357.23')

                cy.getByTestId('component.drawer.settings.project.gross.area')
                    .find('input')
                    .should('be.visible')
                    .should('have.value', 'adfja')
            })

            it('should allow to only type a name', () => {
                cy.getByTestId('component.drawer.settings.project.name').type('name')

                cy.getByTestId('component.button.group.save').click()

                cy.getByTestId(
                    'component.drawer.settings.project.net.area.error'
                ).should('not.be.visible')

                cy.getByTestId(
                    'component.drawer.settings.project.gross.area.error'
                ).should('not.be.visible')
            })
        })
    })

    describe('Editing a project', () => {
        it('should display the information with active true', () => {
            cy.wrapper(
                <ProjectDrawer
                    open={true}
                    onClose={() => { }}
                    defaultValues={{
                        id: '5247f25d-6199-4195-b4ab-2f6c2bd19b5d',
                        name: 'Test Project',
                        is_active: true,
                    }}
                />
            )

            cy.getByTestId('component.drawertitle.title')
                .should('be.visible')
                .should('have.text', 'Editar Proyecto')

            cy.getByTestId('component.drawer.settings.project.name')
                .find('input')
                .should('be.visible')
                .should('have.value', 'Test Project')

            cy.getByTestId('component.drawer.settings.project.active')
                .find('input')
                .should('be.checked')

            cy.getByTestId('component.button.group.save')
                .should('be.visible')
                .should('have.text', 'Guardar')

            cy.getByTestId('component.button.group.cancel')
                .should('be.visible')
                .should('have.text', 'Cancelar')
        })

        it('should display the information with active false', () => {
            cy.wrapper(
                <ProjectDrawer
                    open={true}
                    onClose={() => { }}
                    defaultValues={{
                        id: '5247f25d-6199-4195-b4ab-2f6c2bd19b5d',
                        name: 'Test Project',
                        is_active: false,
                        net_area: 2435.89,
                        gross_area: 2678.87,
                    }}
                />
            )

            cy.getByTestId('component.drawertitle.title')
                .should('be.visible')
                .should('have.text', 'Editar Proyecto')

            cy.getByTestId('component.drawer.settings.project.name')
                .find('input')
                .should('be.visible')
                .should('have.value', 'Test Project')

            cy.getByTestId('component.drawer.settings.project.active')
                .find('input')
                .should('not.be.checked')

            cy.getByTestId('component.drawer.settings.project.net.area')
                .find('input')
                .should('be.visible')
                .should('have.value', '2435.89')

            cy.getByTestId('component.drawer.settings.project.gross.area')
                .find('input')
                .should('be.visible')
                .should('have.value', '2678.87')

            cy.getByTestId('component.button.group.save')
                .should('be.visible')
                .should('have.text', 'Guardar')

            cy.getByTestId('component.button.group.cancel')
                .should('be.visible')
                .should('have.text', 'Cancelar')
        })
    })
})
