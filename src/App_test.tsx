import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import "./index.css";

describe("<App />", () => {
  beforeEach(() => {
    console.log("beforeEach");
    cy.intercept("GET", "https://test.andrescourt.com", {
      message: "Hello world!",
    }).as("home");
    cy.mount(
      <QueryClientProvider client={new QueryClient()}>
        <App />
      </QueryClientProvider>,
    );
    cy.wait("@home", { timeout: 10000 });
  });

  it("renders", () => {
    console.log("render");
    // see: https://on.cypress.io/mounting-react
    cy.dataTestId("title").should("have.text", "Hello world!");
    cy.dataTestId("title").should("have.class", "text-green-800");
    cy.dataTestId("button").should("contain.text", "Contained");
    cy.dataTestId("message").should("have.text", "Hello world!");
  });
});
