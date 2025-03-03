import Cookie from "cookie-universal";
import { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { userAPI } from "../../../api/Api";
import Loading from "../../../components/loading/Loading";
import { Axios } from "../../../api/axios";
import Error403 from "../Errors/403";

export default function RequireAuth({ allowedRole }) {
  // User
  const [user, setUser] = useState("");

  // Navigate
  const nav = useNavigate();

  // Get User Information
  useEffect(() => {
    Axios.get(`/${userAPI}`)
      .then((res) => setUser(res.data))
      .catch(() => nav("/login", { replace: true }));
  }, []);

  // Cookies && Token
  const cookie = Cookie();
  const token = cookie.get("e-commerce");

  return token ? (
    user === "" ? (
      <Loading />
    ) : allowedRole.includes(user.role) ? (
      <Outlet />
    ) : (
      <Error403 role={user.role} />
    )
  ) : (
    <Navigate to={"/login"} replace={true} />
  );
}
