import "./home.css";
import Landing from "../../../components/website/landing/Landing";
import WebSiteCategories from "../Categories/Categories";
import ShowLatestProducts from "../../../components/website/product/ShowLatestProducts";
import ShowSaleProducts from "../../../components/website/product/ShowSaleProducts";
import ShowTopRatedProducts from "../../../components/website/product/ShowTopRated";

export default function HomePage() {
  return (
    <div>
      <Landing />
      <ShowLatestProducts />
      <ShowSaleProducts />
      <ShowTopRatedProducts />
      <WebSiteCategories />
    </div>
  );
}
