import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import SectionHead from "../../../components/website/section-head/SectionHead";
import { Axios } from "../../../api/axios";
import SkeletonShow from "../skeleton/Skeleton";
import { topRatedProductsAPI } from "../../../api/Api";
import VeiwAllGoBackBtn from "../../../components/website/Btns/VeiwAll&GoBackBtn";
import StringSlice from "../../../helpers/StringSlice";
import SaleNewTopProducts from "../../../components/website/product/Sale&New&Top";

export default function AllTopRated() {
  const [allTopRated, setAllTopRated] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get All Top Rated Products
  useEffect(() => {
    Axios.get(`${topRatedProductsAPI}`)
      .then((res) => {
        setAllTopRated(res.data);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  const showSaleProducts = allTopRated.map((product, key) => (
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
      <div className="pt-3">
        <SectionHead title="Best Seller" />
      </div>

      <div className="d-flex align-items-stetch justify-content-center flex-wrap my-5 row-gap">
        {loading ? (
          <SkeletonShow
            length="4"
            height="460px"
            classes="col-lg-3 col-md-6 col-12 mb-1"
          />
        ) : (
          showSaleProducts
        )}
      </div>

      <VeiwAllGoBackBtn to="/" word="Go Back" />
    </Container>
  );
}
