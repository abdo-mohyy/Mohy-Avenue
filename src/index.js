import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App";
import WindoContext from "./context/WindoContent";
import CartChangerContext from "./context/CartChangerContext";
// css
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./custom.css";
import "react-loading-skeleton/dist/skeleton.css";
import "./css/components/buttons.css";
import "./css/components/loading.css";
import "./css/components/alerts.css";
import "./css/components/google.css";
import "./pages/auth/AuthOperations/auth.css";
import "./css/base/root.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <WindoContext>
      <CartChangerContext>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CartChangerContext>
    </WindoContext>
  </React.StrictMode>
);
