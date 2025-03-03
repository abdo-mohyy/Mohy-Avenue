import React from "react";
import { Button } from "react-bootstrap";
import Footer from "../../../components/website/Footer/Footer";
import Header from "../../../components/website/Header/Header";
import "./error.css";

export default function Error404() {
  return (
    <div className="d-flex align-items-center justify-content-between flex-column vh-100 text-center bg-light w-100">
      <Header />

      <div className="mt-for-content-under-header">
        <h1 className="animated-404 text-primaryt family-arial">404</h1>
        <p className="error-messag family-arial fs-1">Oops! Page not found.</p>
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
