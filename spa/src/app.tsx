import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { About } from "./pages/about/page";
import { Home } from "./pages/home/page";
import { RootLayout } from "./components/layouts/RootLayout";
import { MantineUIProvider } from "./libs/mantine";

const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <Navigate to={URLS.DIS_SM_007} replace />,
  // },
  {
    path: "/",
    element: <RootLayout />,
    children: [{ index: true, element: <Home /> }],
  },
  {
    path: "/about",
    element: <RootLayout />,
    children: [{ index: true, element: <About /> }],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MantineUIProvider>
      {/* <ErrorBoundary FallbackComponent={ErrorPage}> */}
      <RouterProvider router={router} />
      {/* </ErrorBoundary> */}
    </MantineUIProvider>
  </React.StrictMode>
);
