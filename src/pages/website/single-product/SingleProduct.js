import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import ImageGallery from "react-image-gallery";
import { Axios } from "../../../api/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight, faTruckFast } from "@fortawesome/free-solid-svg-icons";
import { cartAPI, productAPI } from "../../../api/Api";
import SkeletonShow from "../skeleton/Skeleton";
import { Cart } from "../../../context/CartChangerContext";
import "./single-product.css";
import QtySelect from "../../../components/website/Btns/QtySelect";

export default function SingleProduct() {
  const [product, setProduct] = useState([]);
  const [count, setCount] = useState(5);
  const [productImages, setProductImages] = useState([]);
  const stock = product.stock;
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { setIsChange } = useContext(Cart);
  const ifDiscount = product.discount > 0;
  const topRated = product.rating === "5";

  // console.log(stock);

  // Get Products Details
  useEffect(() => {
    Axios.get(`${productAPI}/${id}`)
      .then((res) => {
        setProductImages(
          res.data[0].images.map((img) => {
            return {
              original: img.image,
              thumbnail: img.image,
              originalHeight: "500px",
              bulletClass: "bullets",
              thumbnailClass: "thumbnail",
            };
          })
        );
        setProduct(res.data[0]);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  // Check If There Is Stock
  const checkStock = async () => {
    try {
      setLoading(true);
      const getOldItems = JSON.parse(localStorage.getItem("product")) || [];
      const productCount = getOldItems.filter((item) => +item.id === +id)?.[0]
        ?.count;

      await Axios.post(`${cartAPI}/check`, {
        product_id: product.id,
        count: count + (productCount ? productCount : 0),
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Handle Add To Cart
  const handleSaveProducts = async () => {
    const check = await checkStock();

    if (check) {
      const getOldItems = JSON.parse(localStorage.getItem("product")) || [];
      const existItem = getOldItems.findIndex((item) => +item.id === +id);

      if (existItem !== -1) {
        if (getOldItems[existItem].count) {
          getOldItems[existItem].count += count;
          getOldItems[existItem].stock -= count;
        }
      } else {
        product.count = count;
        product.stock -= count;

        getOldItems.push(product);
      }

      localStorage.setItem("product", JSON.stringify(getOldItems));
      setIsChange((prev) => !prev);
    }
  };

  return (
    <>
      <Link
        to="/on-sale"
        className="center-flex flex-column p-3 bg-success text-light hover-text-primary"
      >
        {loading ? (
          <SkeletonShow
            length="2"
            width="100px"
            heigth="50px"
            baseColor="transparent"
          />
        ) : (
          <>
            <p className="m-0 fw-bold">UP TO 40% OFF SALE & OUTLET</p>
            <span className="fw-bold">Shop Now</span>
          </>
        )}
      </Link>

      <Container className="mt-md-5">
        <div className="d-flex justify-content-center flex-wrap ">
          <div className="col-10 col-md-7 p-md-2">
            <ImageGallery
              showFullscreenButton={false}
              showPlayButton={false}
              showBullets={true}
              showNav={false}
              onErrorImageURL="error"
              items={productImages}
            />
          </div>

          <div className="col-12 col-md-5 d-flex flex-column mt-3">
            <h2 className="m-0 fs-18px fs-md-22px py-2 fw-bold">
              {product.description}
            </h2>

            <p className="text-secondary fw-bold mb-2">{product.title}</p>

            <p className="text-secondary fw-bold mb-2">{product.About}</p>

            {product.rating === "5" && (
              <span className="fw-bold bg-primary p-1 text-light inline-block fs-md-14px fs-10px mb-3 text-center">
                Best Seller
              </span>
            )}

            <div className="d-flex align-items-center">
              {product.discount > 0 && (
                <div className="text-danger fw-bold fs-md-24px fs-18px me-3 family-arial">
                  LE {product.discount}
                </div>
              )}

              <div
                className={`${
                  ifDiscount && "text-decoration-line-through fs-md-16px"
                } ${!ifDiscount && "fs-md-24px"} fw-bold fs-16px family-arial`}
              >
                LE {product.price}
              </div>
            </div>

            <div className="mt-3">
              {stock > 0 && (
                <Spinner
                  animation="grow"
                  size="sm"
                  variant={
                    stock >= 10
                      ? "success"
                      : stock > 1
                      ? "warning"
                      : stock === 1 && "danger"
                  }
                />
              )}

              <span className="fw-bold text-primary fs-14px fs-md-16px">
                {stock >= 10
                  ? " In Stock, Ready to ship"
                  : stock > 1
                  ? ` Low Stock ,${stock} items Left`
                  : stock === 1
                  ? ` Only One Left`
                  : "Sorry, The item unavailable"}
              </span>
            </div>

            <div className="d-flex align-items-start flex-md-row flex-column gap-4 mt-3">
              <div className="">
                <QtySelect setCount={(data) => setCount(+data)} />
              </div>

              <div className="flex-grow-1 w-100">
                <Button
                  variant="primary"
                  onClick={handleSaveProducts}
                  className="rounded-0 p-3 w-100 mb-3"
                >
                  Add To Cart
                </Button>

                <Button
                  variant="outline-secondary"
                  className="border rounded-0 p-3 w-100 fw-bold"
                >
                  Add To Wish List
                </Button>
              </div>
            </div>

            <div className="mt-1">
              {topRated && (
                <div className="d-flex align-items-center py-2 mt-3 fs-md-14px">
                  <FontAwesomeIcon
                    icon={faTruckFast}
                    className="me-2 text-success"
                  />
                  <span className="text-success fw-bold">
                    This item qualifies for free shipping!
                  </span>
                </div>
              )}

              <div className="d-flex align-items-center py-2 fs-md-14px">
                <FontAwesomeIcon
                  icon={faRotateRight}
                  className="me-2 text-secondary"
                />
                <span className="text-secondary fw-bold">
                  Free returns on all qualifying orders.
                </span>
              </div>
            </div>

            <div className="mt-4">
              <h5 className="fw-bold">Shipping and Returns</h5>
              <p className="m-0 fs-14px">
                Free standard shipping on orders over
                <span className="fw-bold family-arial"> LE1000</span> before
                tax, plus free returns on all qualifying orders.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
