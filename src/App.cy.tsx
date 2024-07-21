import App from "./App";

describe("<App />", () => {
    it("renders", () => {
        // see: https://on.cypress.io/mounting-react
        cy.mount(<App />);

        cy.dataTestId("page-title").should("have.text", "Hello World!");
        cy.dataTestId("button").should("have.text", "Hello World");
    });
});
