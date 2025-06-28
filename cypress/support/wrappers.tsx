import { mount } from "cypress/react";
import { Provider } from "react-redux";
import { testStore } from "../../src/redux/testStore.ts";
import { PropsWithChildren, useMemo } from "react";
import { createRootRoute, createRouter, Route, RouterProvider } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient()

Cypress.Commands.add("wrapper", (children) => {
  return mount(
    <QueryClientProvider client={queryClient}>
      <Provider store={testStore}>
        <TestRouter>
          {children}
        </TestRouter>
      </Provider>,
    </QueryClientProvider>,
  );
});

Cypress.Commands.add("pageWrapper", (children, routes) => {
  console.log(routes);
  return mount(
    <QueryClientProvider client={queryClient}>
      <Provider store={testStore}>
        {children}
      </Provider>,
    </QueryClientProvider>,
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
