import { useEffect, useState } from "react";
import { Axios } from "../../../api/axios";
import { productAPI, productsAPI } from "../../../api/Api";
import DashboardTabels from "../../../components/dashboard/DashTabel";
import GoBackBtn from "../../../components/website/Btns/GoBackBtn";

export default function Products() {
  // States
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  // Get All Products
  useEffect(() => {
    setLoading(true);
    Axios.get(`/${productsAPI}?&page=${page}&limit=${limit}`)
      .then((res) => {
        setProducts(res.data.data);
        setTotalCount(res.data.total);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [limit, page]);

  // Handle Delete Products
  async function handleDelete(id) {
    try {
      Axios.delete(`${productAPI}/${id}`);
      setProducts((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.log((error) => console.log(error));
    }
  }

  // Header Of Table
  const header = [
    {
      key: "title",
      name: "Title",
    },
    {
      key: "created_at",
      name: "Created In",
    },
    {
      key: "updated_at",
      name: "Updated In",
    },
    {
      key: "images",
      name: "Images",
    },
    {
      key: "description",
      name: "Description",
    },
    {
      key: "price",
      name: "Price",
    },
    {
      key: "rating",
      name: "Rating",
    },
  ];

  return (
    <div className="table-container bg-white w-100 p-2">
      <DashboardTabels
        mainHead="Products"
        page={page}
        limit={limit}
        setLimit={setLimit}
        setPage={setPage}
        data={products}
        header={header}
        delete={handleDelete}
        loading={loading}
        count={totalCount}
        search="title"
        searchLink={productAPI}
        addLink="product"
      />
      <GoBackBtn word="Go Back" />
    </div>
  );
}
