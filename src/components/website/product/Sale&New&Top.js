import { useRef } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import StringSlice from "../../../helpers/StringSlice";

export default function SaleNewTopProducts(props) {
  // Ref
  const buyBtnOpacity = useRef();

  const ifDiscount = +props.discount > 0;

  return (
    <Link to={`/product/${props.id}`} className="col-10 col-md-6 col-lg-3 p-2">
      <Card
        className="border-white"
        onMouseOver={() => (buyBtnOpacity.current.style.opacity = 1)}
        onMouseLeave={() => (buyBtnOpacity.current.style.opacity = 0)}
      >
        <Card.Img variant="top" src={props.image} alt="img" />

        <Card.Body className="d-flex align-items-start justify-content-between p-0 py-2 gap-2">
          <div className="text-primary">
            <Card.Text className="fs-16px fw-bold">
              {StringSlice(`${props.description}`, 35)}
            </Card.Text>

            <Card.Title className="fs-14px">
              {StringSlice(`${props.title}`, 15)}
            </Card.Title>
          </div>

          <div className="text-primary fw-bold">
            {ifDiscount && (
              <div className="text-danger fw-bold family-arial">
                LE{props.discount}
              </div>
            )}
            <div
              className={`fw-bold family-arial ${
                ifDiscount && "text-decoration-line-through text-secondary"
              }`}
            >
              LE{props.price}
            </div>
          </div>
        </Card.Body>

        <Button
          variant="primary"
          className="buy-btn rounded-0 transition-3s"
          style={{ opacity: "0" }}
          ref={buyBtnOpacity}
        >
          Buy Now
        </Button>
      </Card>
    </Link>
  );
}
