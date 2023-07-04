import React from "react";
import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import DashboardView from "./views/DashboardView";
import RequestView from "./views/RequestView";
import { DetailStoreView } from "./views/DetailStoreView";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <DashboardView />,
      },
      {
        path: "/request",
        element: <RequestView />,
      },
      {
        path: "/stores/:id",
        element: <DetailStoreView />,
      },
    ],
  },
]);

export default router;
