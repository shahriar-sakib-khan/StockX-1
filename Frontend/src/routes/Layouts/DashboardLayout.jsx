import { Outlet } from "react-router-dom";
import { Header } from "../../components";

export default function DashboardLayout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}
