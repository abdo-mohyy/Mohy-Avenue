import { useEffect, useState } from "react";
import { Axios } from "../../../api/axios";
import { userAPI, usersAPI } from "../../../api/Api";
import DashboardTabels from "../../../components/dashboard/DashTabel";
import GoBackBtn from "../../../components/website/Btns/GoBackBtn";

export default function Users() {
  // States
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLodaing] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  // Get Current Users
  useEffect(() => {
    Axios.get(`${userAPI}`).then((res) => setCurrentUser(res.data));
  }, []);

  // Get All Users
  useEffect(() => {
    setLodaing(true);
    Axios.get(`/${usersAPI}?&page=${page}&limit=${limit}`)
      .then((res) => {
        setUsers(res.data.data);
        setTotalCount(res.data.total);
      })
      .catch((error) => console.log(error))
      .finally(() => setLodaing(false));
  }, [limit, page]);

  // Handle Delete Users
  async function handleDelete(id) {
    try {
      Axios.delete(`${userAPI}/${id}`);
      setUsers((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.log((error) => console.log(error));
    }
  }

  // Header Of Table
  const header = [
    {
      key: "name",
      name: "Username",
    },
    {
      key: "email",
      name: "Email",
    },
    {
      key: "role",
      name: "Role",
    },
  ];

  return (
    <div className="table-container bg-white w-100 p-2">
      <DashboardTabels
        mainHead="Users"
        page={page}
        limit={limit}
        setLimit={setLimit}
        setPage={setPage}
        data={users}
        header={header}
        itemApi={userAPI}
        itemsApi={usersAPI}
        specifyType="Users"
        currentUser={currentUser}
        delete={handleDelete}
        loading={loading}
        count={totalCount}
        search="name"
        searchLink={userAPI}
        addLink="user"
      />
      <GoBackBtn word="Go Back" />
    </div>
  );
}
