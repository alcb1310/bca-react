import SpentDetailsDrawer from './SpentDetailsDrawer'

const cols = ['Fecha', 'Proveedor', 'Factura', 'Total']
const title = ['date', 'supplier_name', 'invoice_number', 'total']

const project_id = 'e4b2eaf2-1d98-4493-bf2d-15938ef3057b'
const budget_item_id = '3c10969f-b514-4a8c-a934-fc0438766492'
const date = '2024-11-11'

describe('<SpentDetailsDrawer />', () => {
    it('should display the drawer', () => {
        cy.intercept(
            'GET',
            `**/reportes/gastado/${project_id}/${budget_item_id}/${date}`,
            {
                statusCode: 200,
                body: [],
            }
        ).as('data')
        cy.wrapper(
            <SpentDetailsDrawer
                setOpen={() => { }}
                open={true}
                selectedData={{
                    spent: 0,
                    budget_item: {
                        id: budget_item_id,
                        code: '500.1.1',
                        name: 'Project manager',
                        accumulate: false,
                        parent_id: '8ba2d916-549f-4e8c-9694-04892ca8f2d8',
                    },
                }}
                selectedProject={project_id}
                selectedDate={date}
            />
        )

        cy.getByTestId('component.drawers.reporst.spent.detail.loading').should(
            'be.visible'
        )
        cy.wait('@data')
        cy.getByTestId('component.drawers.reporst.spent.detail.loading').should(
            'not.exist'
        )

        cy.getByTestId('component.drawertitle.title')
            .should('be.visible')
            .should('have.text', 'Reporte de gastos')
        cy.getByTestId('component.drawers.reports.spent.detail.close')
            .should('be.visible')
            .should('have.text', 'Cerrar')

        for (var i = 0; i < cols.length; i++) {
            cy.get(`[data-field="${title[i]}"]`)
                .find('.MuiDataGrid-columnHeaderTitle')
                .should('have.text', cols[i])
        }
    })
})
