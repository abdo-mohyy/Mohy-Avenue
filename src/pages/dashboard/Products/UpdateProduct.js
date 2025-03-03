import { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import Loading from "../../../components/loading/Loading";
import { Axios } from "../../../api/axios";
import { categoriesAPI, productAPI } from "../../../api/Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import GoBackBtn from "../../../components/website/Btns/GoBackBtn";
import FloatingLabel from "react-bootstrap/FloatingLabel";

export default function UpdateProduct() {
  // States
  const [form, setForm] = useState({
    category: "Select Category",
    title: "",
    description: "",
    price: "",
    discount: "",
    About: "",
    stock: "",
  });

  const [images, setImages] = useState([]);
  const [imagesFormServer, setImagesFormServer] = useState([]);
  const [categoryForChoose, setCategoryForChoose] = useState([]);
  const [loading, setLodaing] = useState(false);
  const [deleteImgsId, setDeleteImgsId] = useState([]);

  //   Params
  const { id } = useParams();

  // Ref
  const focusRef = useRef();
  const openImagesInputRef = useRef(null);
  const progressRef = useRef([]);
  const idRef = useRef([]);

  // Navigation
  const nav = useNavigate();

  // Get Categories From Back-end
  useEffect(() => {
    Axios.get(`${categoriesAPI}`).then((res) => setCategoryForChoose(res.data));
  }, []);

  // Handle Focus on Category input
  useEffect(() => {
    focusRef.current.focus();
  }, []);

  // Handle First Changes Of Form
  function handleFormChanges(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // Get Current Product Details
  useEffect(() => {
    setLodaing(true);
    try {
      Axios.get(`/${productAPI}/${id}`).then((response) => {
        setForm(response.data[0]);
        setLodaing(false);
        setImagesFormServer(response.data[0].images);
      });
    } catch (error) {
      nav("/dashboard/users/page/404", { replace: true });
      setLodaing(false);
      console.log(error);
    }
  }, []);

  // Handle Image Changes
  const j = useRef(-1);

  async function handleImageChanges(e) {
    setImages((prev) => [...prev, ...e.target.files]);
    const imagesAsFiles = e.target.files;
    const data = new FormData();

    for (let i = 0; i < imagesAsFiles.length; i++) {
      j.current++;
      data.append("image", imagesAsFiles[i]);
      data.append("product_id", id);
      try {
        const res = await Axios.post(`/product-img/add`, data, {
          onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            const percent = Math.floor((loaded * 100) / total);
            if (percent % 10 === 0) {
              progressRef.current[j.current].style.width = `${percent}%`;
            }
          },
        });
        idRef.current[j.current] = res.data.id;
      } catch (error) {
        console.log(error);
      }
    }
  }

  // Handle Delete Old Images
  async function handleDeleteImgFromServer(imgId) {
    setImagesFormServer((prev) => prev.filter((img) => img.id !== imgId));
    setDeleteImgsId((prev) => [...prev, imgId]);
    // try {
    //   Axios.delete(`product-img/${imgId}`);
    // } catch (error) {
    //   console.log(error);
    // }
  }

  // Handle Delete Images
  async function handleDeleteImg(imgId, currImg) {
    try {
      Axios.delete(`product-img/${imgId}`);
      setImages((prev) => prev.filter((img) => img !== currImg));
      idRef.current = idRef.current.filter((id) => id !== imgId);
      --j.current;
    } catch (error) {
      console.log(error);
    }
  }
  // Api For Delete Img => product-img/imgId

  // Handle Last Submit
  async function submit(e) {
    e.preventDefault();
    setLodaing(true);
    try {
      for (let i = 0; i < deleteImgsId.length; i++) {
        Axios.delete(`product-img/${deleteImgsId[i]}`);
      }
      await Axios.post(`${productAPI}/edit/${id}`, form);
      setLodaing(false);
      nav("/dashboard/products");
    } catch (error) {
      setLodaing(false);
      console.log(error);
    }
  }

  // Show Categories In Table
  const showCategoriesInSelect = categoryForChoose.map((category, key) => (
    <option key={key} value={category.id}>
      {category.title}
    </option>
  ));

  // Show Old Images From Product
  const showImagesFromServer = imagesFormServer.map((img, key) => (
    <div key={key} className=" my-3 ">
      <div className="position-relative border d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <img src={img.image} alt="img" width="100px" />
        </div>

        <FontAwesomeIcon
          className="position-absolute top-0 end-0 text-danger fs-24px pointer"
          onClick={() => handleDeleteImgFromServer(img.id)}
          icon={faXmark}
        />
      </div>
    </div>
  ));
  // Show Choosen Images
  const showImages = images.map((img, key) => (
    <div key={key} className="border my-3 ">
      <div className="d-flex align-items-center justify-content-between p-2">
        <div className="d-flex align-items-center">
          <img src={URL.createObjectURL(img)} alt="img" width="100px" />
          <div className="p-2 ms-2">
            <p className="m-0">{img.name}</p>
            <p className="m-0">
              {img.size / 1024 < 1000
                ? (img.size / 1024).toFixed(2) + " KB"
                : (img.size / (1024 * 1024)).toFixed(1) + " MB"}
            </p>
          </div>
        </div>
        <Button
          variant="danger"
          onClick={() => handleDeleteImg(idRef.current[key], img)}
        >
          Delete
        </Button>
      </div>
      <div className="custom-progress mt-2">
        <span
          ref={(e) => (progressRef.current[key] = e)}
          className="inner-progress"
        ></span>
      </div>
    </div>
  ));

  return (
    <>
      {loading && <Loading />}
      <h1 className="text-center p-3 bg-info text-primary">Update Product</h1>
      <Form className="bg-white w-100 p-3" onSubmit={submit}>
        <Form.Group className="py-2 " controlId="category">
          <Form.Label>Category</Form.Label>
          <Form.Select
            ref={focusRef}
            className="p-2"
            placeholder="Category"
            name="category"
            value={form.category}
            onChange={handleFormChanges}
          >
            {<option disabled>Select Category</option>}
            {showCategoriesInSelect}
          </Form.Select>
        </Form.Group>

        <Form.Group className="py-2 " controlId="title">
          <FloatingLabel
            controlId="floatingName1"
            label="Name"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Title"
              required
              name="title"
              value={form.title}
              onChange={handleFormChanges}
            />
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="py-2 " controlId="description">
          <FloatingLabel
            controlId="floatingName2"
            label="Description"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Description"
              required
              name="description"
              value={form.description}
              onChange={handleFormChanges}
            />
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="py-2 " controlId="price">
          <FloatingLabel
            controlId="floatingName3"
            label="Price"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Price"
              required
              name="price"
              value={form.price}
              onChange={handleFormChanges}
            />
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="py-2 " controlId="discount">
          <FloatingLabel
            controlId="floatingName4"
            label="Discount"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Discount"
              required
              name="discount"
              value={form.discount}
              onChange={handleFormChanges}
            />
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="py-2 " controlId="about">
          <FloatingLabel
            controlId="floatingName5"
            label="About"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="About"
              required
              name="About"
              value={form.About}
              onChange={handleFormChanges}
            />
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="py-2 " controlId="stock">
          <FloatingLabel
            controlId="floatingName6"
            label="Stock"
            className="mb-3"
          >
            <Form.Control
              type="number"
              placeholder="Stock"
              required
              name="stock"
              value={form.stock}
              onChange={handleFormChanges}
            />
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="py-2 " controlId="images">
          <Form.Label>Images</Form.Label>
          <Form.Control
            ref={openImagesInputRef}
            multiple
            hidden
            className="p-2"
            type="file"
            onChange={handleImageChanges}
          />
        </Form.Group>

        <div
          className="center-flex gap-2 py-3 w-100 flex-column mb-2 rounded pointer border"
          onClick={() => openImagesInputRef.current.click()}
        >
          <img
            src={require("../../../images/upload.webp")}
            alt="upload Here"
            className="w-100px"
          />
          <p className="mb-0 fw-bold text-primary">Upload Images</p>
        </div>

        <div className="d-flex align-items-start flex-wrap gap-2">
          {showImagesFromServer}
        </div>

        {showImages}

        <div className="submit py-2">
          <button
            disabled={form.title.length > 1 ? false : true}
            className="btn btn-secondary text-light p-2 w-100 hover-text-primary"
            type="submit"
          >
            Add Product!
          </button>
        </div>

        <GoBackBtn word="Go Back" />
      </Form>
    </>
  );
}
