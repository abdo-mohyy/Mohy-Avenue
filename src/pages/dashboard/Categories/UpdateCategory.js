import Form from "react-bootstrap/Form";
import Loading from "../../../components/loading/Loading";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Axios } from "../../../api/axios";
import { categoryAPI } from "../../../api/Api";
import GoBackBtn from "../../../components/website/Btns/GoBackBtn";
import FloatingLabel from "react-bootstrap/FloatingLabel";

export default function UpdateCategory() {
  // States
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");

  // {Category Id => not Spicefic}
  const { id } = useParams();

  // Loading States
  const [loading, setLodaing] = useState(false);

  // Navigation
  const nav = useNavigate();

  // Get Categorries Data
  useEffect(() => {
    setLodaing(true);
    Axios.get(`${categoryAPI}/${id}`)
      .then((data) => {
        setTitle(data.data.title);
        setImage(data.data.image);
        setLodaing(false);
      })
      .catch(() => nav("/dashboard/users/page/404", { replace: true }));
  }, []);

  // Handle Submit
  async function submit(e) {
    e.preventDefault();
    setLodaing(true);
    // Set Form Data To Send
    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", image);
    // Send Data
    try {
      await Axios.post(`${categoryAPI}/edit/${id}`, formData).catch((error) =>
        console.log(error)
      );
      setLodaing(false);
      nav("/dashboard/categories");
    } catch (error) {
      setLodaing(false);
      console.log(error);
    }
  }

  return (
    <>
      {loading && <Loading />}
      <h1 className="text-center p-3 bg-info text-primary">Update Category</h1>
      <Form className="bg-white w-100 p-3" onSubmit={submit}>
        <Form.Group className="px-2">
          <FloatingLabel controlId="floatingName" label="Name" className="mb-3">
            <Form.Control
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
            Update Category
          </button>
        </div>
        <GoBackBtn word="Go Back" />
      </Form>
    </>
  );
}
