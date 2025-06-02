import { RouterProvider } from "react-router-dom";
import router from "./routes/routes";
// import useThemeStore from "./stores/ThemeStore";
// import { useEffect } from "react";
// import applyThemeClass from "./utils/applyThemeClass";

function App() {
  // const theme = useThemeStore((s) => s.theme);

  // useEffect(() => {
  //   applyThemeClass(theme);
  // }, [theme]);

  return <RouterProvider router={router} />;
}

export default App;
