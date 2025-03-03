import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import Header from "../../../components/website/Header/Header";
import Footer from "../../../components/website/Footer/Footer";
import "./error.css";

export default function Error403({ role }) {
  return (
    <div className="d-flex align-items-center justify-content-between flex-column vh-100 text-center bg-light w-100">
      <Header />

      <div className="mt-for-content-under-header">
        <h1 className="animated-404 text-primary family-arial">403</h1>
        <h1 className="text-primary family-arial">
          Access Denied <FontAwesomeIcon icon={faLock} className="fs-1" />
        </h1>
        <Button
          variant="primary"
          size="lg"
          onClick={() => window.history.back()}
        >
          Go Back
        </Button>
      </div>

      <Footer />
    </div>
  );
}
