import { createBrowserRouter } from "react-router-dom";
import {
  Layout,
  DashboardLayout,
  ExchangeLayout,
  InventoryLayout,
  SelectionLayout,
  ShopSelectionLayout,
} from "./Layouts";
import {
  Landing,
  Register,
  Login,
  Dashboard,
  ErrorPage,
  Profile,
  Statistics,
  Shop,
  ShopHistory,
  ShopSelection,
  Inventory,
  Vehicles,
  DailySales,
  Receipt,
  Selection,
  Exchange,
  ExchangeHistory,
  Community,
  EmptyCylinders,
  Initialization,
  Buy,
} from "../pages/";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Landing /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: "buy",
            element: <Buy />,
          },
          {
            path: "selection",
            element: <SelectionLayout />,
            children: [
              { index: true, element: <Selection /> },
              { path: "selected-inventory", element: <Inventory /> },
            ],
          },
          {
            path: "inventory",
            element: <InventoryLayout />,
            children: [
              { index: true, element: <Inventory /> },
              { path: "empty-cylinders", element: <EmptyCylinders /> },
            ],
          },

          { path: "profile", element: <Profile /> },
          { path: "statistics", element: <Statistics /> },
          { path: "shop", element: <Shop /> },
          { path: "shop-history", element: <ShopHistory /> },

          {
            path: "shop-selection",
            element: <ShopSelectionLayout />,
            children: [
              { index: true, element: <ShopSelection /> },
              {
                path: "exchange",
                element: <ExchangeLayout />,
                children: [
                  { index: true, element: <Exchange /> },
                  { path: "receipt", element: <Receipt /> },
                ],
              },
            ],
          },
          { path: "vehicles", element: <Vehicles /> },
          { path: "daily-sales", element: <DailySales /> },
          { path: "exchange-history", element: <ExchangeHistory /> },
          { path: "community", element: <Community /> },
        ],
      },
    ],
  },
]);

export default router;
