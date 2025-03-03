import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { Axios } from "../../../api/axios";
import { userAPI } from "../../../api/Api";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../../components/loading/Loading";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import GoBackBtn from "../../../components/website/Btns/GoBackBtn";

export default function UpdateUser() {
  // States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  // {User Id => not Spicefic}
  const { id } = useParams();

  // Loading States
  const [loading, setLodaing] = useState(false);

  // Navigation
  const nav = useNavigate();

  // Get Users Data
  useEffect(() => {
    setLodaing(true);
    Axios.get(`${userAPI}/${id}`)
      .then((data) => {
        setName(data.data.name);
        setEmail(data.data.email);
        setRole(data.data.role);
        setLodaing(false);
      })
      .catch(() => nav("/dashboard/users/page/404", { replace: true }));
  }, []);

  // Handle Submit
  async function submit(e) {
    e.preventDefault();
    setLodaing(true);
    try {
      // Send Data
      await Axios.post(`${userAPI}/edit/${id}`, {
        name: name,
        email: email,
        role: role,
      }).catch((error) => console.log(error));
      setLodaing(false);
      nav("/dashboard/users");
    } catch (error) {
      setLodaing(false);
      console.log(error);
    }
  }

  return (
    <>
      {loading && <Loading />}
      <h1 className="text-center p-3 bg-info text-primary">Update User</h1>
      <Form className="bg-white w-100 p-3" onSubmit={submit}>
        <Form.Group className="px-2">
          <FloatingLabel controlId="floatingName" label="Name" className="mb-3">
            <Form.Control
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
              name.length > 1 && email.length > 1 && role !== "" ? false : true
            }
            className="btn btn-secondary text-light p-2 w-100 hover-text-primary"
            type="submit"
          >
            Update User
          </button>
        </div>

        <GoBackBtn word="Go Back" />
      </Form>
    </>
  );
}
