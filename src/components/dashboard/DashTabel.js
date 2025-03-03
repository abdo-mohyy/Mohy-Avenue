import { Form, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState } from "react";
import PaginatedItems from "./Pagination/Pagination";
import { Axios } from "../../api/axios";

export default function DashboardTabels(props) {
  // Check Just For Users Page
  const currentUser = props.currentUser || {
    name: "",
  };
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const [filteredByData, setFilteredData] = useState([]);
  const [searchLoading, setsSarchLoading] = useState(false);

  const filteredByDate =
    props.search === "title" &&
    props.data.filter(
      (item) => item.created_at.split("T").slice(0, 1).toString() === date
    );

  const filterSearchByDate =
    props.search === "title" &&
    filteredByData.filter(
      (item) => item.created_at.split("T").slice(0, 1).toString() === date
    );

  const showWichData =
    date.length !== 0
      ? search.length > 0
        ? filterSearchByDate
        : filteredByDate
      : search.length > 0
      ? filteredByData
      : props.data;

  // Handle Get Searched Data
  const getSearchedData = async () => {
    try {
      await Axios.post(`${props.searchLink}/search?title=${search}`).then(
        (data) => setFilteredData(data.data)
      );
    } catch (error) {
      console.log(error);
    } finally {
      setsSarchLoading(false);
    }
  };

  // Handle timing for Searching
  useEffect(() => {
    const debouns = setTimeout(() => {
      search.length > 0 ? getSearchedData() : setsSarchLoading(false);
    }, 500);
    return () => clearTimeout(debouns);
  }, [search]);

  // Header Of Table
  const headerShow = props.header.map((item, key) => (
    <th
      key={key}
      className="bg-primary text-light p-md-2 p-1 fs-8px fs-md-16px"
    >
      {item.name}
    </th>
  ));

  // Body Of Table
  const dataShow = showWichData.map((item1, key1) => (
    <tr key={key1}>
      <td className="p-md-2 pt-3 p-1 fs-8px fs-md-16px lh-lg">{key1 + 1}</td>

      {props.header.map((item2, key2) => (
        <td className="p-md-2 pt-3 p-1 fs-8px fs-md-16px lh-lg" key={key2}>
          {item2.key === "image" ? (
            <img
              style={{ height: "30px" }}
              src={`${item1[item2.key]}`}
              alt="img"
            />
          ) : item2.key === "images" ? (
            <div className="d-flex alig-items-center justify-content-center flex-wrap gap-2">
              {item1[item2.key].map((img, key3) => (
                <img key={key3} src={`${img.image}`} alt="img" width="50px" />
              ))}
            </div>
          ) : item2.key === "created_at" || item2.key === "updated_at" ? (
            item1[item2.key].split("T").slice(0, 1)
          ) : item1[item2.key] === "1995" ? (
            "Admin"
          ) : item1[item2.key] === "1996" ? (
            "Writer"
          ) : item1[item2.key] === "1999" ? (
            "Product Manger"
          ) : item1[item2.key] === "2001" ? (
            "User"
          ) : (
            item1[item2.key]
          )}
          {currentUser && currentUser.name === item1[item2.key] && " (You)"}
        </td>
      ))}

      <td className="p-md-2 pt-3 p-1 fs-8px fs-md-16px lh-lg h-100">
        {/* Edite Icon */}
        <Link to={`${item1.id}`}>
          <FontAwesomeIcon className="text-primary me-2" icon={faPenToSquare} />
        </Link>
        {/* Delete Icon If It Isn't Current Item */}
        {!(currentUser.name === item1.name) && (
          <FontAwesomeIcon
            cursor="pointer"
            color="red"
            icon={faTrash}
            onClick={() => props.delete(item1.id)}
          />
        )}
      </td>
    </tr>
  ));

  return (
    <>
      <h1 className="text-center p-2 bg-info text-primary">{`${props.mainHead} Page`}</h1>
      <div className="d-flex align-items-center justify-content-between">
        <div className="col-3">
          <Form.Control
            type="search"
            aria-label="input example"
            className="my-2 w-10"
            placeholder="Search"
            onChange={(e) => {
              setSearch(e.target.value);
              setsSarchLoading(true);
            }}
          />
        </div>

        <Link
          className="p-2 fs-10px fs-md-16px bg-secondary text-light rounded hover-text-primary"
          to={`/dashboard/${props.addLink}/add`}
        >
          {`Add ${props.mainHead}`}
        </Link>
      </div>

      {props.search === "title" && (
        <div className="col-3">
          <Form.Control
            type="date"
            aria-label="input example"
            className="my-2 w-10 pointer"
            placeholder="Date"
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
        </div>
      )}

      <Table striped bordered hover className="text-center">
        <thead>
          <tr>
            <th className=" bg-primary text-light p-md-2 p-1 fs-8px fs-md-16px">
              Id
            </th>
            {headerShow}
            <th className=" bg-primary text-light p-md-2 p-1 fs-8px fs-md-16px">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {props.loading ? (
            <tr className="text-center p-2 ">
              <td colSpan={12}>Loading</td>
            </tr>
          ) : searchLoading ? (
            <tr className="text-center p-2 ">
              <td colSpan={12}>Loading</td>
            </tr>
          ) : (
            dataShow
          )}

          <tr>
            <td colSpan="12">
              <Form.Select
                onChange={(e) => props.setLimit(Number(e.target.value))}
                aria-label="Default select example"
              >
                <option disabled>Select Count</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="25">25</option>
              </Form.Select>
              <PaginatedItems
                itemsPerPage={props.limit}
                data={props.data}
                setPage={props.setPage}
                count={props.count}
              />
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}
