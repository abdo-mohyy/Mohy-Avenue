import Form from "react-bootstrap/Form";
import { useEffect, useRef, useState } from "react";
import Loading from "../../../components/loading/Loading";
import { Axios } from "../../../api/axios";
import { categoryAPI } from "../../../api/Api";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Footer from "../../../components/website/Footer/Footer";
import GoBackBtn from "../../../components/website/Btns/GoBackBtn";

export default function AddCategory() {
  // States
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");

  // Focus
  const focus = useRef();

  // Loading States
  const [loading, setLodaing] = useState(false);

  // Handle Submit
  async function submit(e) {
    e.preventDefault();
    setLodaing(true);
    const form = new FormData();
    form.append("title", title);
    form.append("image", image);
    try {
      await Axios.post(`${categoryAPI}/add`, form);
      setLodaing(false);
      window.location.pathname = "/dashboard/categories";
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
      <h1 className="text-center p-3 bg-info text-primary">Add Category</h1>
      <Form className="bg-info w-100 p-3" onSubmit={submit}>
        <Form.Group className="px-2">
          <FloatingLabel controlId="floatingName" label="Name" className="mb-3">
            <Form.Control
              ref={focus}
              type="text"
              placeholder="Name"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="p-2 " controlId="image">
          <Form.Label>Image</Form.Label>
          <Form.Control
            className="p-2"
            type="file"
            onChange={(e) => setImage(e.target.files.item(0))}
          />
        </Form.Group>

        <div className="submit p-2">
          <button
            disabled={title.length > 1 ? false : true}
            className="btn btn-secondary text-light p-2 w-100 hover-text-primary"
            type="submit"
          >
            Add Category
          </button>
        </div>

        <GoBackBtn word="Go Back" />
      </Form>
      <Footer />
    </>
  );
}
