import { useContext, useEffect, useState } from "react";
import { Cart } from "../../../context/CartChangerContext";
import { Button, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight, faTruckFast } from "@fortawesome/free-solid-svg-icons";
import GoBackBtn from "../../../components/website/Btns/GoBackBtn";
import { Link } from "react-router-dom";

export default function ProductsInCart() {
  const [productsInCart, setProductsInCart] = useState([]);
  const [numberOfProducts, setNumberOfProducts] = useState(0);
  const { isChange } = useContext(Cart);

  // Get Products From Local Storage
  useEffect(() => {
    const getProductsFromLocalStorage =
      JSON.parse(localStorage.getItem("product")) || [];
    setProductsInCart(getProductsFromLocalStorage);
    setNumberOfProducts(getProductsFromLocalStorage.length);
  }, [isChange]);

  // Handle Delete Item From Local Storage
  const handleDelete = (id) => {
    const filterProducts = productsInCart.filter(
      (product) => product.id !== id
    );
    setProductsInCart(filterProducts);
    setNumberOfProducts(numberOfProducts - 1);
    localStorage.setItem("product", JSON.stringify(filterProducts));
  };

  // Show Products
  const showProducts = productsInCart.map((product, i) => (
    <div key={i} className="p-3 border my-3 d-flex flex-md-row flex-column">
      <div className="img&description d-flex">
        <Link to={`/product/${product.id}`} className="col-4">
          <img
            className="w-100"
            src={product.images[0].image}
            alt={`img ${i + 1}`}
          />
        </Link>

        <div className="col-6 px-3 flex-grow-1">
          <p className="fw-bold mb-1 fs-md-18px fs-12px">
            {product.description}
          </p>

          <p className="fs-12px fs-md-16px text-secondary mb-1 ">
            Category: {product.title}
          </p>

          <p className="fs-12px fs-md-16px text-secondary mb-2">
            Material: {product.About}
          </p>

          {product.rating === "5" && (
            <span className="fw-bold bg-primary p-1 text-light inline-block fs-md-14px fs-10px mb-3 text-center">
              Best Seller
            </span>
          )}
        </div>
      </div>

      <div className="d-flex flex-sm-row flex-md-column">
        <div className="d-flex align-items-center flex-md-column flex-grow-1">
          {product.discount > 0 && (
            <div className="text-danger fw-bold me-2 m-md-0 fs-12px fs-md-16px family-arial">
              LE{product.discount}
            </div>
          )}

          <div
            className={`fw-bold fs-12px fs-md-16px family-arial ${
              product.discount > 0 &&
              "text-decoration-line-through text-secondary"
            }`}
          >
            LE{product.price}
          </div>
        </div>

        <Button
          size="sm"
          variant="outline-danger"
          onClick={() => handleDelete(product.id)}
        >
          Delete
        </Button>
      </div>
    </div>
  ));

  return (
    <Container className="py-4">
      <h2 className="fw-bold">{`My Shopping Cart (${numberOfProducts})`}</h2>

      <div className="d-flex justify-content-between flex-wrap">
        <div className="col-lg-7 col-12">{showProducts}</div>

        <div className="col-lg-5 col-12">
          <div className="ms-md-2">
            <div className="border-bottom pb-2">
              <div className="text-center py-2 mt-3 fs-14px border mb-2">
                <FontAwesomeIcon
                  icon={faTruckFast}
                  className="me-2 text-success"
                />
                <span className="text-success fw-bold">
                  This item qualifies for free shipping!
                </span>
              </div>
              <div className="text-center py-2 fs-14px border mb-2">
                <FontAwesomeIcon
                  icon={faRotateRight}
                  className="me-2 text-secondary"
                />
                <span className="text-secondary fw-bold">
                  Free returns on all qualifying orders.
                </span>
              </div>
            </div>
          </div>

          <div className="ms-md-2 border-bottom pb-2">
            <Button
              variant="primary"
              className="rounded-0 p-3 w-100 mb-3"
              onClick={() => (window.location.pathname = "/")}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>

      <GoBackBtn word="Go Back" />
    </Container>
  );
}
