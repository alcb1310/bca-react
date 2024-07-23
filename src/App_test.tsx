import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import "./index.css";

describe("<App />", () => {
    it("renders", () => {
        cy.intercept("GET", "/", { message: "Hello world!" }).as("home");

        // see: https://on.cypress.io/mounting-react
        cy.mount(
            <QueryClientProvider client={new QueryClient()}>
                <App />
            </QueryClientProvider>,
        );
        cy.wait("@home");
        cy.dataTestId("title").should("have.text", "Hello world!");
        cy.dataTestId("title").should("have.class", "text-green-800");
        cy.dataTestId("button").should("contain.text", "Contained");
        cy.dataTestId("message").should("have.text", "Hello world!");
    });
});
