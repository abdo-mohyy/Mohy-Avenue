import { Outlet } from "react-router-dom";
import Header from "../../components/website/Header/Header";
import Footer from "../../components/website/Footer/Footer";

export default function Website() {
  return (
    <>
      <div>
        <Header />
        <div className="mt-for-content-under-header">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
}
