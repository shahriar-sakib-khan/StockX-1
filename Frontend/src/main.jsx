import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import App from "./App";
import './index.css';
import { AuthContextProvider } from "./context/AuthContext";


const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
  <AuthContextProvider>
      <App />
  </AuthContextProvider>
  </StrictMode>
);
