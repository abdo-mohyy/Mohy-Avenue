import "./bars.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { userAPI } from "../../api/Api";
import { Axios } from "../../api/axios";
import HandleLogout from "../../helpers/HandleLogout";
import Offcanvas from "react-bootstrap/Offcanvas";
import { links } from "./NAvLink";

export default function TopBar() {
  // States For Offcanvas
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // User
  const [user, setUser] = useState("");

  // Navigate
  const nav = useNavigate();

  const [name, setName] = useState("");

  // Get User Information
  useEffect(() => {
    Axios.get(`/${userAPI}`)
      .then((res) => {
        setName(res.data.name);
        setUser(res.data);
      })
      .catch(() => nav("/login", { replace: true }));
  }, []);

  return (
    <div className="top-bar d-flex align-items-center  bg-light  position-fixed w-100 top-0 end-0 shadow-sm px-3 transition-3s z-10">
      <div className="d-flex align-items-center justify-content-between w-100">
        <div className="d-flex align-items-center gap-3">
          <FontAwesomeIcon
            cursor="pointer"
            icon={faBars}
            onClick={handleShow}
          />

          <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton className="bg-secondary">
              <h3 className="text-primary">Dashboard</h3>
            </Offcanvas.Header>
            <Offcanvas.Body className="p-0">
              <>
                <div className="overlay"></div>
                <div className="side-bar-container  position-relative ">
                  <div className="side-bar p-2 bg-light  transition-3s z-1">
                    {links.map(
                      (link, key) =>
                        link.role.includes(user.role) && (
                          <NavLink
                            key={key}
                            to={link.to}
                            className="side-bar-link d-flex align-items-center gap-2 text-primary hover-text-light hover-bg-secondary p-2 rounded mb-2 transition-3s "
                            // Close Side Bar When Click The Link
                            onClick={handleClose}
                          >
                            <p className="m-0">{link.name}</p>
                          </NavLink>
                        )
                    )}
                  </div>
                  <div className="d-flex align-items-center justify-content-between p-3 shadow-sm bg-info position-absolute bottom-0 w-100">
                    <div className="fs-5">{name}</div>
                    <div
                      className="text-danger p-2"
                      role="button"
                      onClick={HandleLogout}
                    >
                      <FontAwesomeIcon
                        className="text-danger me-2"
                        icon={faRightFromBracket}
                        cursor="pointer"
                      />
                      Logout
                    </div>
                  </div>
                </div>
              </>
            </Offcanvas.Body>
          </Offcanvas>

          <Link
            to="/"
            className="fs-12px fs-md-18px bg-secondary text-light p-2 rounded hover-text-primary"
          >
            MA Fashion
          </Link>
        </div>

        <div className="d-flex align-items-center p-2 shadow-sm border rounded">
          <h6 className="m-0 me-1 px-2 text-secondary">{name}</h6>
          <FontAwesomeIcon
            className="text-danger"
            icon={faRightFromBracket}
            cursor="pointer"
            onClick={HandleLogout}
          />
        </div>
      </div>
    </div>
  );
}
