import TestAppWrapper from '../../../wrappers/TestAppWraper'
import SupplierDrawer from './SupplierDrawer'

describe('<SupplierDrawer />', () => {
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
            .should('have.text', 'Proveedor')

        cy.get(
            '[data-testid="component.drawer.settings.supplier.supplier_id"] > label'
        )
            .should('exist')
            .should('have.text', 'Ruc')

        cy.get('[data-testid="component.drawer.settings.supplier.name"] > label')
            .should('exist')
            .should('have.text', 'Nombre')

        cy.get(
            '[data-testid="component.drawer.settings.supplier.contact_name"] > label'
        )
            .should('exist')
            .should('have.text', 'Nombre Contacto')

        cy.get(
            '[data-testid="component.drawer.settings.supplier.contact_email"] > label'
        )
            .should('exist')
            .should('have.text', 'Email Contacto')

        cy.get(
            '[data-testid="component.drawer.settings.supplier.contact_phone"] > label'
        )
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
