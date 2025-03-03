import Cookie from "cookie-universal";
import { Outlet } from "react-router-dom";

export default function RequireBack() {
  // States
  const cookie = Cookie();
  const token = cookie.get("e-commerce");

  return token ? window.history.back() : <Outlet />;
}
