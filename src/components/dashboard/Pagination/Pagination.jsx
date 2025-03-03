import ReactPaginate from "react-paginate";
import "./pagination.css";

export default function PaginatedItems({ itemsPerPage, count, setPage }) {
  const pageCount = Math.ceil(count / itemsPerPage);

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        onPageChange={(e) => setPage(e.selected + 1)}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        nextLabel=">>"
        previousLabel="<<"
        renderOnZeroPageCount={null}
        containerClassName="custom-pagination"
        pageLinkClassName="pagination-links"
        previousClassName="previous"
        nextClassName="next"
        activeLinkClassName="active-link"
      />
    </>
  );
}
