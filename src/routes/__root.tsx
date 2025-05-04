import { Outlet, createRootRoute } from "@tanstack/react-router";

import App from "@/App";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToasterComponent } from "@gravity-ui/uikit";

export const Route = createRootRoute({
  component: () => (
    <>
      <App>
        <Outlet />
        <ToasterComponent />
      </App>

      <ReactQueryDevtools initialIsOpen={true} />
      {/*<TanStackRouterDevtools />*/}
    </>
  ),
});
