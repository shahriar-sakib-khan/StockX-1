import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import { Dashboard, ErrorPage } from "../pages/";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
    ],
  },
]);

export default router;
