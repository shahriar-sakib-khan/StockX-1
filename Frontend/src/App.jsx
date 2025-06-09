import { RouterProvider } from "react-router-dom";
import router from "./routes/routes";
import useThemeStore from "./stores/ThemeStore";
import { useEffect } from "react";
import applyThemeClass from "./utils/applyThemeClass";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Protected Route Wrapper
const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
};


function App() {
  const theme = useThemeStore((s) => s.theme);

  useEffect(() => {
    applyThemeClass(theme);
  }, [theme]);

  return <RouterProvider router={router} />;
}

export default App;
