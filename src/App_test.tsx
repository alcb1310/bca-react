import App from "./App";
import "./index.css";

describe("<App />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<App />);

    cy.dataTestId("title").should("have.text", "Hello world!");
    cy.dataTestId("title").should("have.class", "text-green-800");
    cy.dataTestId("button").should("contain.text", "Contained");
  });
});
