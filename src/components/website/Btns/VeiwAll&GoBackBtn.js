import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function VeiwAllGoBackBtn(props) {
  return (
    <div className="center-flex mb-5">
      <Link to={props.to}>
        <Button variant="outline-primary" className="rounded-0 fw-bold mt-2">
          {props.word}
        </Button>
      </Link>
    </div>
  );
}
