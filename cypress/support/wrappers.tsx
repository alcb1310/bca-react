import { mount } from "cypress/react";
import { Provider } from "react-redux";
import { testStore } from "../../src/redux/testStore.ts";
import { PropsWithChildren, useMemo } from "react";
import { createRootRoute, createRouter, Route, RouterProvider } from "@tanstack/react-router";

Cypress.Commands.add("wrapper", (children) => {
  return mount(
    <Provider store={testStore}>
      <TestRouter>
        {children}
      </TestRouter>
    </Provider>,
  );
});

Cypress.Commands.add("pageWrapper", (children, routes) => {
  console.log(routes);
  return mount(
    <Provider store={testStore}>
      {children}
    </Provider>,
  );
});

function TestRouter(props: PropsWithChildren) {
  const rootRoute = createRootRoute({
    component: () => props.children,
  })

  const testRouter = useMemo(
    () => createRouter({
      routeTree: rootRoute.addChildren([
        new Route({
          path: '*',
          component: () => props.children,
          getParentRoute: () => rootRoute,
        }),
      ]),
    }),
    [props.children, rootRoute],
  )

  return <RouterProvider router={testRouter} />
}
