import TestAppWrapper from '../../../wrappers/TestAppWraper'
import SupplierDrawer from './SupplierDrawer'

describe('<SupplierDrawer />', () => {
    it('should display all the fields', () => {
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
})
