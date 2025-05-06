import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import Landing from "./pages/landing/Landing";
import DashboardLayout from "./layouts/DashboardLayout";
import PrivateRoute from "./components/PrivateRoute";
import Launches from "./pages/launches/Launches";
import Rockets from "./pages/rockets/Rockets";
import Payloads from "./pages/payloads/Payloads";
import { LaunchDetails } from "./pages/launches/launchDetails/LaunchDetails";
import RocketDetails from "./pages/rockets/rocketDetails/RocketDetails";
import About from "./pages/about/About";
import { NotFound } from "./components/common/NotFound";

export const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
    ],
  },

  {
    path: "/dashboard/",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        path: "launches",
        element: <Launches />,
      },
      {
        path: "launches/:launchId",
        element: <LaunchDetails />,
      },
      {
        path: "rockets",
        element: <Rockets />,
      },
      {
        path: "rockets/:rocketId",
        element: <RocketDetails />,
      },
      {
        path: "payloads",
        element: <Payloads />,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

const router = createBrowserRouter(routes);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      cacheTime: 1000 * 60 * 15,
    },
  },
});
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
