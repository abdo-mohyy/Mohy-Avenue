import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import SaleNewTopProducts from "./Sale&New&Top";
import SectionHead from "../section-head/SectionHead";
import { newArrivalsProductsAPI } from "../../../api/Api";
import { Axios } from "../../../api/axios";
import StringSlice from "../../../helpers/StringSlice";
import SkeletonShow from "../../../pages/website/skeleton/Skeleton";
import VeiwAllGoBackBtn from "../Btns/VeiwAll&GoBackBtn";

export default function ShowLatestProducts() {
  const [latestProducts, setLatestProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get(`${newArrivalsProductsAPI}`)
      .then((res) => setLatestProducts(res.data.slice(0, 8)))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  const showLatestProducts = latestProducts.map((product, key) => (
    <SaleNewTopProducts
      key={key}
      title={StringSlice(product.title, 35)}
      description={StringSlice(product.description, 40)}
      image={product.images[0].image}
      sale
      price={product.price}
      discount={product.discount}
      rating={product.rating}
      id={product.id}
    />
  ));

  return (
    <Container className="mt-5">
      <SectionHead title="New Arrivals" />
      <div className="d-flex align-items-stetch justify-content-center flex-wrap my-5 row-gap">
        {loading ? (
          <SkeletonShow
            length="4"
            height="460px"
            classes="col-lg-3 col-md-6 col-12 mb-1"
          />
        ) : (
          showLatestProducts
        )}
      </div>
      <VeiwAllGoBackBtn to="/latest-products" word="View All" />
    </Container>
  );
}
