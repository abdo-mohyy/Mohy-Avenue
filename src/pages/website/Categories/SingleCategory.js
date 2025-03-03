import { Container } from "react-bootstrap";
import SectionHead from "../../../components/website/section-head/SectionHead";
import SkeletonShow from "../skeleton/Skeleton";
import VeiwAllGoBackBtn from "../../../components/website/Btns/VeiwAll&GoBackBtn";
import { useEffect, useState } from "react";
import { Axios } from "../../../api/axios";
import { productsAPI } from "../../../api/Api";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import StringSlice from "../../../helpers/StringSlice";
import { useRef } from "react";

export default function SingleCategory() {
  const [selectedCategoryProducts, setSelectedCategoryProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Ref
  const buyBtnRefs = useRef([]);

  // Handle Hover Style
  function handleMouseOver(key) {
    buyBtnRefs.current[key] && (buyBtnRefs.current[key].style.opacity = 1);
  }
  function handleMouseLeave(key) {
    buyBtnRefs.current[key] && (buyBtnRefs.current[key].style.opacity = 0);
  }

  const choosenCategory = window.location.pathname
    .split("/")
    .slice(-1)
    .toString()
    .toLowerCase();

  useEffect(() => {
    Axios(`${productsAPI}`)
      .then((res) =>
        setSelectedCategoryProducts(
          res.data.filter(
            (products) => products.title.toLowerCase() === choosenCategory
          )
        )
      )
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  const singleCategoryShow = selectedCategoryProducts.map((products, i) => (
    <Link
      to={`/product/${products.id}`}
      key={i}
      className="col-10 col-md-6 col-lg-3 p-2"
    >
      <Card
        className="border-white"
        onMouseOver={() => handleMouseOver(i)}
        onMouseLeave={() => handleMouseLeave(i)}
      >
        <Card.Img variant="top" src={products.images[0].image} alt="img" />

        <Card.Body className="d-flex align-items-start justify-content-between p-0 py-2 border-primary gap-2">
          <div className="text-primary">
            <Card.Text className="fs-16px fw-bold mb-0">
              {StringSlice(`${products.description}`, 35)}
            </Card.Text>
            <Card.Title className="fs-14px">
              {StringSlice(`${products.title}`, 15)}
            </Card.Title>
          </div>
          <div className="text-primary fw-bold">
            {products.discount > 0 && (
              <div className="text-danger fw-bold">{products.discount}$</div>
            )}
            <div
              className={`fw-bold ${
                products.discount > 0 &&
                "text-decoration-line-through text-secondary"
              }`}
            >
              {products.price}$
            </div>
          </div>
        </Card.Body>

        <Button
          variant="primary"
          className="buy-btn rounded-0 transition-3s"
          style={{ opacity: "0" }}
          ref={(el) => (buyBtnRefs.current[i] = el)}
        >
          Buy Now
        </Button>
      </Card>
    </Link>
  ));

  return (
    <Container>
      <div className="pt-3">
        <SectionHead title={choosenCategory} />
      </div>
      <div className="d-flex align-items-stretch justify-content-center flex-wrap row-gap-2 pt-4">
        {loading ? (
          <SkeletonShow
            length="8"
            height="450px"
            classes="col-lg-3 col-md-6 col-12"
          />
        ) : (
          singleCategoryShow
        )}
      </div>
      <VeiwAllGoBackBtn to="/" word="Home Page" />
    </Container>
  );
}
