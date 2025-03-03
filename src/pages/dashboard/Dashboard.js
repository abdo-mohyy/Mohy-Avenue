import { Outlet } from "react-router-dom";
import TopBar from "../../components/dashboard/TopBar";
import "./dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard ">
      <TopBar />
      <div style={{ marginTop: "70px" }}>
        <Outlet />
      </div>
    </div>
  );
}
