import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import Header from "../../../components/website/Header/Header";
import Footer from "../../../components/website/Footer/Footer";
import { useContext, useEffect, useRef, useState } from "react";
import { WindowSize } from "../../../context/WindoContent";
import axios from "axios";
import { baseURL, loginAPI } from "../../../api/Api";
import Cookie from "cookie-universal";
import Loading from "../../../components/loading/Loading";
import { Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);

  const cookie = Cookie();

  const focus = useRef();

  const windowSize = useContext(WindowSize);
  const screenSize = windowSize.windowSize;

  const [loading, setLoading] = useState(false);

  const handleFormChanges = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${baseURL}/${loginAPI}`, form).then((res) => {
        setLoading(false);
        const token = res.data.token;
        const role = res.data.user.role;
        const endPoint =
          role === "1995"
            ? "/dashboard/users"
            : role === "1996"
            ? "/dashboard/writer"
            : "/";
        cookie.set("e-commerce", token);
        window.location.pathname = endPoint;
      });
    } catch (error) {
      setLoading(false);
      if (error.status === 401) {
        setError("Email or Password is not valid");
      } else {
        setError("Internal server error");
        console.log(error);
      }
    }
  };

  useEffect(() => {
    focus.current.focus();
  }, []);

  return (
    <>
      {loading && <Loading />}
      <div className="auth-box bg-info">
        <Header />
        <div className="auth-content d-flex">
          <div className="auth-card col-md-6 col-12 d-flex align-items-center justify-content-center bg-info ">
            <Form
              className="custom-form bg-light rounded p-3 m-2 outline-none  shadow-sm"
              onSubmit={submit}
            >
              <h2 className="text-primary text-center border-bottom p-2 mb-3 fs-1 ">
                MA
              </h2>

              <Form.Group className="mb-3" controlId="email">
                <Form.Control
                  ref={focus}
                  className="w-100 p-2 p-md-3 rounded  bg-info"
                  type="email"
                  placeholder="someone@example.com"
                  name="email"
                  onChange={handleFormChanges}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Control
                  type="password"
                  placeholder="password must be more than 8 char"
                  className="w-100 p-2 p-md-3 rounded bg-info"
                  name="password"
                  minLength="8"
                  required
                  onChange={handleFormChanges}
                />
              </Form.Group>
              {error !== "" && <p className="text-danger">{error}</p>}

              <Button
                className="submit bg-info text-primary w-100 p-1 p-md-2"
                size="md"
                type="submit"
              >
                Login !
              </Button>

              <Link
                to="/register"
                className="text-secondary mt-2 p-1 d-inline-block hover-text-primary"
              >
                Create New Account?
              </Link>
            </Form>
          </div>
          {screenSize > 767 && (
            <div className="col-md-6 col-12 p-4 bg-secondary text-primary hover-text-light d-flex align-items-center ">
              <div
                className="big-sentence "
                style={{
                  fontSize:
                    screenSize > 1449
                      ? "80px"
                      : screenSize > 1115
                      ? "60px"
                      : "40px",
                }}
              >
                Enter Your Fashion Destination!
              </div>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
}
