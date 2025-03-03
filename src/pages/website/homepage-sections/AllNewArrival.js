import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import SectionHead from "../../../components/website/section-head/SectionHead";
import StringSlice from "../../../helpers/StringSlice";
import { Axios } from "../../../api/axios";
import SkeletonShow from "../skeleton/Skeleton";
import { newArrivalsProductsAPI } from "../../../api/Api";
import VeiwAllGoBackBtn from "../../../components/website/Btns/VeiwAll&GoBackBtn";
import SaleNewTopProducts from "../../../components/website/product/Sale&New&Top";

export default function AllOnSale() {
  const [newArrivales, setNewArrivales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get(`${newArrivalsProductsAPI}`)
      .then((res) => {
        setNewArrivales(res.data);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  const showNewArrivales = newArrivales.map((product, key) => (
    <SaleNewTopProducts
      key={key}
      title={StringSlice(product.title, 35)}
      description={StringSlice(product.description, 40)}
      image={product.images[0].image}
      price={product.price}
      discount={product.discount}
      rating={product.rating}
      id={product.id}
    />
  ));

  return (
    <Container className="mt-5">
      <div className="pt-3">
        <SectionHead title="New Arivalls" />
      </div>

      <div className="d-flex align-items-stetch justify-content-center flex-wrap my-5 row-gap">
        {loading ? (
          <SkeletonShow
            length="4"
            height="460px"
            classes="col-lg-3 col-md-6 col-12 mb-1"
          />
        ) : (
          showNewArrivales
        )}
      </div>

      <VeiwAllGoBackBtn to="/" word="Go Back" />
    </Container>
  );
}
