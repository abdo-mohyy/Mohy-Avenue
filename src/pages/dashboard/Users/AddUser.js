import { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import { Axios } from "../../../api/axios";
import { userAPI } from "../../../api/Api";
import Loading from "../../../components/loading/Loading";
import Footer from "../../../components/website/Footer/Footer";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import GoBackBtn from "../../../components/website/Btns/GoBackBtn";

export default function AddUser() {
  // States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  // Focus
  const focus = useRef();

  // Loading States
  const [loading, setLodaing] = useState(false);

  // Handle Submit
  async function submit(e) {
    e.preventDefault();
    setLodaing(true);
    try {
      await Axios.post(`${userAPI}/add`, {
        name: name,
        email: email,
        password: password,
        role: role,
      }).catch((error) => console.log(error));
      setLodaing(false);

      window.location.pathname = "/dashboard/users";
    } catch (error) {
      setLodaing(false);

      console.log(error);
    }
  }

  // Handle Focus
  useEffect(() => {
    focus.current.focus();
  }, []);

  return (
    <>
      {loading && <Loading />}
      <h1 className="text-center p-3 bg-info text-primary">Add User</h1>
      <Form className="bg-info w-100 p-3" onSubmit={submit}>
        <Form.Group className="px-2">
          <FloatingLabel controlId="floatingName" label="Name" className="mb-3">
            <Form.Control
              ref={focus}
              type="text"
              placeholder="Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="px-2">
          <FloatingLabel
            controlId="floatingEmail"
            label="Email"
            className="mb-3"
          >
            <Form.Control
              type="email"
              placeholder="email@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="px-2">
          <FloatingLabel
            controlId="floatingPassword"
            label="Password"
            className="mb-3"
          >
            <Form.Control
              type="password"
              placeholder="Password (8 char or more)"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="px-2" controlId="exampleForm.ControlInput3">
          <Form.Select
            className="p-2 "
            placeholder=""
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option disabled value="">
              Select Role
            </option>
            <option value="1995">Admin</option>
            <option value="1999">Product Manger</option>
            <option value="1996">Writer</option>
            <option value="2001">User</option>
          </Form.Select>
        </Form.Group>

        <div className="submit p-2">
          <button
            disabled={
              name.length > 1 &&
              email.length > 1 &&
              password.length > 8 &&
              role !== ""
                ? false
                : true
            }
            className="btn btn-secondary text-light  p-2 w-100 hover-text-primary"
            type="submit"
          >
            Add User
          </button>
        </div>

        <GoBackBtn word="Go Back" />
      </Form>
      <Footer />
    </>
  );
}
