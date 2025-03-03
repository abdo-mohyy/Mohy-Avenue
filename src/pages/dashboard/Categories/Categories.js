import DashboardTabels from "../../../components/dashboard/DashTabel";
import { useEffect, useState } from "react";
import { Axios } from "../../../api/axios";
import { categoriesAPI, categoryAPI } from "../../../api/Api";
import GoBackBtn from "../../../components/website/Btns/GoBackBtn";

export default function Categories() {
  // States
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  // Get All Categories
  useEffect(() => {
    setLoading(true);
    Axios.get(`/${categoriesAPI}?&page=${page}&limit=${limit}`)
      .then((res) => {
        setCategories(res.data.data);
        setTotalCount(res.data.total);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [limit, page]);

  // Handle Delete Categories
  async function handleDelete(id) {
    try {
      Axios.delete(`${categoryAPI}/${id}`);
      setCategories((prev) => prev.filter((item) => item.id !== id));
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
      name: "Updated_at In",
    },
    {
      key: "image",
      name: "Image",
    },
  ];

  return (
    <div className="table-container bg-light w-100 p-2">
      <DashboardTabels
        mainHead="Categories"
        page={page}
        limit={limit}
        setLimit={setLimit}
        setPage={setPage}
        data={categories}
        header={header}
        delete={handleDelete}
        loading={loading}
        count={totalCount}
        search="title"
        searchLink={categoryAPI}
        addLink="category"
      />
      <GoBackBtn word="Go Back" />
    </div>
  );
}
