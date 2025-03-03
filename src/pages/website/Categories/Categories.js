import { useEffect, useRef, useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { categoriesAPI } from "../../../api/Api";
import { Axios } from "../../../api/axios";
import SkeletonShow from "../skeleton/Skeleton";
import { Link } from "react-router-dom";
import VeiwAllGoBackBtn from "../../../components/website/Btns/VeiwAll&GoBackBtn";
import SectionHead from "../../../components/website/section-head/SectionHead";

export default function WebSiteCategories(props) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = window.location.pathname;

  // Ref
  const buyBtnRefs = useRef([]);
  const imgRef = useRef([]);

  useEffect(() => {
    Axios(`${categoriesAPI}`)
      .then((res) => setCategories(res.data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  // Handle Hover Style
  function handleMouseOver(key) {
    buyBtnRefs.current[key] && (buyBtnRefs.current[key].style.opacity = 1);
    imgRef.current[key] &&
      (imgRef.current[key].style.filter = "brightness(0.7)");
    imgRef.current[key].style.transition = "filter .3s";
    imgRef.current[key].style.transform = "scale(1.03)";
  }
  function handleMouseLeave(key) {
    buyBtnRefs.current[key] && (buyBtnRefs.current[key].style.opacity = 0);
    imgRef.current[key].style.transform = "scale(1)";
    imgRef.current[key] && (imgRef.current[key].style.filter = "brightness(1)");
  }

  const categoriesShow = categories.map((category, i) => (
    <Link
      to={`/category/${category.title}`}
      className="col-10 col-md-6 col-lg-3 p-2 position-relative "
      key={i}
    >
      <Card
        className="border-white overflow-hidden p-0"
        onMouseOver={() => handleMouseOver(i)}
        onMouseLeave={() => handleMouseLeave(i)}
      >
        <div className="position-relative">
          <Card.Img
            ref={(el) => (imgRef.current[i] = el)}
            variant="top"
            src={category.image}
            alt="img"
            className="transition-3s"
          />
          <div
            className="position-absolute top-50 start-50 text-light fw-bold"
            style={{ transform: "translate(-50%, -50%)" }}
          >
            {category.title}
          </div>
        </div>
        <Button
          variant="primary"
          className="buy-btn rounded-0 transition-3s z-1"
          style={{ opacity: "0" }}
          ref={(el) => (buyBtnRefs.current[i] = el)}
        >
          View All
        </Button>
      </Card>
    </Link>
  ));

  return (
    <Container>
      <div className="pt-3">
        <SectionHead title="Categories" />
      </div>
      <div className="d-flex align-items-stretch justify-content-center flex-wrap row-gap-2 pt-4">
        {loading ? (
          <SkeletonShow
            length="8"
            height="450px"
            classes="col-lg-3 col-md-6 col-12"
          />
        ) : (
          categoriesShow
        )}
      </div>
      {location === "/categories" && (
        <VeiwAllGoBackBtn to="/" word="Home Page" />
      )}
    </Container>
  );
}
