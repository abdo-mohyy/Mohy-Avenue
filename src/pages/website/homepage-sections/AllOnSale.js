import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import SectionHead from "../../../components/website/section-head/SectionHead";
import StringSlice from "../../../helpers/StringSlice";
import { Axios } from "../../../api/axios";
import SkeletonShow from "../skeleton/Skeleton";
import { saleProductsAPI } from "../../../api/Api";
import VeiwAllGoBackBtn from "../../../components/website/Btns/VeiwAll&GoBackBtn";
import SaleNewTopProducts from "../../../components/website/product/Sale&New&Top";

export default function AllOnSale() {
  const [saleProducts, setSaleProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get(`${saleProductsAPI}`)
      .then((res) => {
        setSaleProducts(res.data);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  const showSaleProducts = saleProducts.map((product, key) => (
    <SaleNewTopProducts
      key={key}
      id={product.id}
      title={StringSlice(product.title, 35)}
      description={StringSlice(product.description, 40)}
      image={product.images[0].image}
      price={product.price}
      discount={product.discount}
      rating={product.rating}
      sale
    />
  ));

  return (
    <Container className="mt-5">
      <div className="pt-3">
        <SectionHead title="On Sale" />
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
