import { Link, NavLink } from "react-router-dom";
import { Container } from "react-bootstrap";
import Cookie from "cookie-universal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Axios } from "../../../api/axios";
import { categoriesAPI } from "../../../api/Api";
import StringSlice from "../../../helpers/StringSlice";
import HandleLogout from "../../../helpers/HandleLogout";
import SkeletonShow from "../../../pages/website/skeleton/Skeleton";
import "./header.css";

export default function Header() {
  const [categories, setCategories] = useState([]);
  const location = window.location.pathname;
  const [load, setLoad] = useState(true);
  const cookie = Cookie();
  const token = cookie.get("e-commerce");
  const authLocation = location === "/register" || location === "/login";

  // Handle Search Button
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    function simulateNetworkRequest() {
      return new Promise((resolve) => {
        setTimeout(resolve, 2000);
      });
    }

    if (isLoading) {
      simulateNetworkRequest().then(() => {
        setLoading(false);
      });
    }
  }, [isLoading]);

  const handleClick = () => setLoading(true);

  // Get All Categories
  useEffect(() => {
    Axios.get(`${categoriesAPI}`)
      .then((res) => setCategories(res.data))
      .catch((error) => console.log(error))
      .finally(() => setLoad(false));
  }, []);

  const ShowCategories = categories.map((category, key) => (
    <div
      onClick={() => (window.location.pathname = `/category/${category.title}`)}
      key={key}
      className="hover-bg-secondary hover-text-light p-2 rounded  text-light fs-12px fs-md-16px bg-primary pointer"
    >
      {StringSlice(category.title, 15)}
    </div>
  ));

  return (
    <div
      className={`bg-light border-bottom w-100 top-0 z-10 ${
        !authLocation && "position-fixed"
      }`}
    >
      <Container>
        <div className="d-flex align-items-center justify-content-between flex-wrap py-3 ">
          <div className="col-3">
            <Link to="/" className="col-3">
              <img
                className="logo-img pointer"
                src={require("../../../images/logo/logo-light-2.jpg")}
                alt="logo"
                width="80px"
              />
            </Link>
          </div>

          {location === "/register" || location === "/login" ? (
            <>
              {!token && (
                <div className="auth-btns d-flex align-items-center justify-content-between bg-info p-2 rounded-5">
                  <NavLink
                    to="/register"
                    className="every-auth-btn p-2 rounded-5 me-2 transition-3s"
                  >
                    Register
                  </NavLink>
                  <NavLink
                    to="/login"
                    className="every-auth-btn p-2 rounded-5 transition-3s"
                    onClick={(e) => e.target.classList.toggle("active")}
                  >
                    Login
                  </NavLink>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="auth-btns col-5 col-md-3  d-flex align-items-center justify-content-end gap-4 order-md-4 order-2">
                <Link to="/cart">
                  <FontAwesomeIcon
                    className="text-primary fs-3 "
                    icon={faCartShopping}
                  />
                </Link>
                {token ? (
                  <Link
                    to="/login"
                    className="bg-primary text-light rounded p-2 fs-12px fs-md-16px"
                    onClick={HandleLogout}
                  >
                    Logout
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="bg-primary text-light rounded p-2 fs-12px fs-md-16px"
                    onClick={HandleLogout}
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </>
          )}
        </div>
      </Container>

      {location !== "/register" && location !== "/login" && (
        <div className="d-flex align-items-center justify-content-evenly flex-wrap py-2 bg-primary">
          {load ? (
            <SkeletonShow
              length="8"
              height="35px"
              width="80px"
              // classes="col-lg-3 col-md-6 col-12"
              baseColor="transparent"
            />
          ) : (
            ShowCategories
          )}
          <Link
            to="/categories"
            className="hover-bg-secondary hover-text-light p-2 rounded  text-light fs-12px fs-md-16px"
          >
            Show All
          </Link>
        </div>
      )}
    </div>
  );
}
