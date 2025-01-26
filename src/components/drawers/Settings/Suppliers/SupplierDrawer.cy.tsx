import TestAppWrapper from '../../../wrappers/TestAppWraper'
import SupplierDrawer from './SupplierDrawer'

describe('<SupplierDrawer />', () => {
    describe('Crear Proveedor', () => {
        beforeEach(() => {
            cy.mount(
                <TestAppWrapper>
                    <SupplierDrawer
                        open={true}
                        onClose={() => { }}
                        defaultValues={{
                            id: '',
                            supplier_id: '',
                            name: '',
                        }}
                    />
                </TestAppWrapper>
            )
        })

        it('should display all the fields', () => {
            cy.get('[data-testid="component.drawertitle.title"]')
                .should('be.visible')
                .should('have.text', 'Crear Proveedor')

            cy.get('[data-testid="component.drawer.settings.supplier.supplier_id"]')
                .find('label')
                .should('exist')
                .should('have.text', 'Ruc')

            cy.get('[data-testid="component.drawer.settings.supplier.name"]')
                .find('label')
                .should('exist')
                .should('have.text', 'Nombre')

            cy.get('[data-testid="component.drawer.settings.supplier.contact_name"]')
                .find('label')
                .should('exist')
                .should('have.text', 'Nombre Contacto')

            cy.get('[data-testid="component.drawer.settings.supplier.contact_email"]')
                .find('label')
                .should('exist')
                .should('have.text', 'Email Contacto')

            cy.get('[data-testid="component.drawer.settings.supplier.contact_phone"]')
                .find('label')
                .should('exist')
                .should('have.text', 'Telefono Contacto')

            cy.get('[data-testid="component.button.group.save"]')
                .should('be.visible')
                .should('have.text', 'Guardar')

            cy.get('[data-testid="component.button.group.cancel"]')
                .should('be.visible')
                .should('have.text', 'Cancelar')
        })

        describe('validate on submit', () => {
            it('should display error on all required fields', () => {
                cy.get('[data-testid="component.button.group.save"]').click()

                cy.get(
                    '[data-testid="component.drawer.settings.supplier.supplier_id.error"]'
                )
                    .should('be.visible')
                    .should('have.text', 'Ruc del proveedor es obligatorio')

                cy.get('[data-testid="component.drawer.settings.supplier.name.error"]')
                    .should('be.visible')
                    .should('have.text', 'Nombre es obligatorio')
            })

            it('should display error on empty ruc', () => {
                cy.get('[data-testid="component.drawer.settings.supplier.name"]').type(
                    'name'
                )

                cy.get('[data-testid="component.button.group.save"]').click()

                cy.get(
                    '[data-testid="component.drawer.settings.supplier.supplier_id.error"]'
                )
                    .should('be.visible')
                    .should('have.text', 'Ruc del proveedor es obligatorio')

                cy.get(
                    '[data-testid="component.drawer.settings.supplier.name.error"]'
                ).should('not.be.visible')
            })

            it('should display error on invalid ruc', () => {
                cy.get(
                    '[data-testid="component.drawer.settings.supplier.supplier_id"]'
                ).type('invalid')

                cy.get('[data-testid="component.drawer.settings.supplier.name"]').type(
                    'name'
                )

                cy.get('[data-testid="component.button.group.save"]').click()

                cy.get(
                    '[data-testid="component.drawer.settings.supplier.supplier_id.error"]'
                )
                    .should('be.visible')
                    .should('have.text', 'Ruc inválido')

                cy.get(
                    '[data-testid="component.drawer.settings.supplier.name.error"]'
                ).should('not.be.visible')
            })

            it('should display error on invalid name', () => {
                cy.get(
                    '[data-testid="component.drawer.settings.supplier.supplier_id"]'
                ).type('asdfqwertp')

                cy.get('[data-testid="component.button.group.save"]').click()

                cy.get('[data-testid="component.drawer.settings.supplier.name.error"]')
                    .should('be.visible')
                    .should('have.text', 'Nombre es obligatorio')

                cy.get(
                    '[data-testid="component.drawer.settings.supplier.supplier_id.error"]'
                ).should('not.be.visible')
            })
        })
    })

    describe('Crear Proveedor', () => {
        it('should display all values', () => {
            cy.mount(
                <TestAppWrapper>
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
                </TestAppWrapper>
            )

            cy.get('[data-testid="component.drawertitle.title"]')
                .should('be.visible')
                .should('have.text', 'Editar Proveedor')

            cy.get('[data-testid="component.drawer.settings.supplier.supplier_id"]')
                .find('input')
                .should('be.visible')
                .should('have.value', '1234567892001')

            cy.get('[data-testid="component.drawer.settings.supplier.name"]')
                .find('input')
                .should('be.visible')
                .should('have.value', 'Test Supplier')

            cy.get('[data-testid="component.drawer.settings.supplier.contact_name"]')
                .find('input')
                .should('be.visible')
                .should('have.value', 'Test Name')

            cy.get('[data-testid="component.drawer.settings.supplier.contact_email"]')
                .find('input')
                .should('be.visible')
                .should('have.value', 'test@test.com')

            cy.get('[data-testid="component.drawer.settings.supplier.contact_phone"]')
                .find('input')
                .should('be.visible')
                .should('have.value', '09-1234-5690')

            cy.get('[data-testid="component.button.group.save"]')
                .should('be.visible')
                .should('have.text', 'Guardar')

            cy.get('[data-testid="component.button.group.cancel"]')
                .should('be.visible')
                .should('have.text', 'Cancelar')
        })
    })
})
