import "@gravity-ui/uikit/styles/fonts.css";
import "@gravity-ui/uikit/styles/styles.css";
import "./styles/styles.scss";
import "./styles/globals.scss";

// eslint-disable-next-line
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { Toaster, ToasterComponent, ToasterProvider } from "@gravity-ui/uikit";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import { ThemeStoreProvider } from "@/entities/Theme";

import { routeTree } from "./routeTree.gen";

const router = createRouter({ routeTree });
const toaster = new Toaster();

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <ThemeStoreProvider>
        <ToasterProvider toaster={toaster}>
          <RouterProvider router={router} />
          <ToasterComponent />
        </ToasterProvider>
      </ThemeStoreProvider>
    </StrictMode>,
  );
}
