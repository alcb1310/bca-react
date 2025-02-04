import SupplierDrawer from './SupplierDrawer'

describe('<SupplierDrawer />', () => {
    describe('Crear Proveedor', () => {
        beforeEach(() => {
            cy.wrapper(
                <SupplierDrawer
                    open={true}
                    onClose={() => { }}
                    defaultValues={{
                        id: '',
                        supplier_id: '',
                        name: '',
                    }}
                />
            )
        })

        it('should display all the fields', () => {
            cy.getByTestId('component.drawertitle.title')
                .should('be.visible')
                .should('have.text', 'Crear Proveedor')

            cy.getByTestId('component.drawer.settings.supplier.supplier_id')
                .find('label')
                .should('exist')
                .should('have.text', 'Ruc')

            cy.getByTestId('component.drawer.settings.supplier.name')
                .find('label')
                .should('exist')
                .should('have.text', 'Nombre')

            cy.getByTestId('component.drawer.settings.supplier.contact_name')
                .find('label')
                .should('exist')
                .should('have.text', 'Nombre Contacto')

            cy.getByTestId('component.drawer.settings.supplier.contact_email')
                .find('label')
                .should('exist')
                .should('have.text', 'Email Contacto')

            cy.getByTestId('component.drawer.settings.supplier.contact_phone')
                .find('label')
                .should('exist')
                .should('have.text', 'Telefono Contacto')

            cy.getByTestId('component.button.group.save')
                .should('be.visible')
                .should('have.text', 'Guardar')

            cy.getByTestId('component.button.group.cancel')
                .should('be.visible')
                .should('have.text', 'Cancelar')
        })

        describe('validate on submit', () => {
            it('should display error on all required fields', () => {
                cy.getByTestId('component.button.group.save').click()

                cy.getByTestId('component.drawer.settings.supplier.supplier_id.error')
                    .should('be.visible')
                    .should('have.text', 'Ruc del proveedor es obligatorio')

                cy.getByTestId('component.drawer.settings.supplier.name.error')
                    .should('be.visible')
                    .should('have.text', 'Nombre es obligatorio')
            })

            it('should display error on empty ruc', () => {
                cy.getByTestId('component.drawer.settings.supplier.name').type('name')

                cy.getByTestId('component.button.group.save').click()

                cy.getByTestId('component.drawer.settings.supplier.supplier_id.error')
                    .should('be.visible')
                    .should('have.text', 'Ruc del proveedor es obligatorio')

                cy.getByTestId('component.drawer.settings.supplier.name.error').should(
                    'not.be.visible'
                )
            })

            it('should display error on invalid ruc', () => {
                cy.getByTestId('component.drawer.settings.supplier.supplier_id').type(
                    'invalid'
                )

                cy.getByTestId('component.drawer.settings.supplier.name').type('name')

                cy.getByTestId('component.button.group.save').click()

                cy.getByTestId('component.drawer.settings.supplier.supplier_id.error')
                    .should('be.visible')
                    .should('have.text', 'Ruc inválido')

                cy.getByTestId('component.drawer.settings.supplier.name.error').should(
                    'not.be.visible'
                )
            })

            it('should display error on invalid name', () => {
                cy.getByTestId('component.drawer.settings.supplier.supplier_id').type(
                    'asdfqwertp'
                )

                cy.getByTestId('component.button.group.save').click()

                cy.getByTestId('component.drawer.settings.supplier.name.error')
                    .should('be.visible')
                    .should('have.text', 'Nombre es obligatorio')

                cy.getByTestId(
                    'component.drawer.settings.supplier.supplier_id.error'
                ).should('not.be.visible')
            })
        })
    })

    describe('Crear Proveedor', () => {
        it('should display all values', () => {
            cy.wrapper(
                <SupplierDrawer
                    open={true}
                    onClose={() => { }}
                    defaultValues={{
                        id: '22877229-4c96-42a2-b3b8-7d68bbfee4d7',
                        supplier_id: '1234567892001',
                        name: 'Test Supplier',
                        contact_name: 'Test Name',
                        contact_email: 'test@test.com',
                        contact_phone: '09-1234-5690',
                    }}
                />
            )

            cy.getByTestId('component.drawertitle.title')
                .should('be.visible')
                .should('have.text', 'Editar Proveedor')

            cy.getByTestId('component.drawer.settings.supplier.supplier_id')
                .find('input')
                .should('be.visible')
                .should('have.value', '1234567892001')

            cy.getByTestId('component.drawer.settings.supplier.name')
                .find('input')
                .should('be.visible')
                .should('have.value', 'Test Supplier')

            cy.getByTestId('component.drawer.settings.supplier.contact_name')
                .find('input')
                .should('be.visible')
                .should('have.value', 'Test Name')

            cy.getByTestId('component.drawer.settings.supplier.contact_email')
                .find('input')
                .should('be.visible')
                .should('have.value', 'test@test.com')

            cy.getByTestId('component.drawer.settings.supplier.contact_phone')
                .find('input')
                .should('be.visible')
                .should('have.value', '09-1234-5690')

            cy.getByTestId('component.button.group.save')
                .should('be.visible')
                .should('have.text', 'Guardar')

            cy.getByTestId('component.button.group.cancel')
                .should('be.visible')
                .should('have.text', 'Cancelar')
        })
    })
})
