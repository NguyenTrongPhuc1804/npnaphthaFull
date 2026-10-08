import React from "react";
import ReactPaginate from "react-paginate";

function DefaultPagination({ pageCount, e, currentPage, forcePage }) {
  const handlePageClick = (event) => {
    e(event.selected);
  };

  if (!pageCount || pageCount <= 1) return null;

  const extra = forcePage !== undefined ? { forcePage } : { initialPage: currentPage };

  return (
    <nav
      aria-label="Pagination"
      className="pagination mt-10 flex w-full items-center justify-center"
    >
      <ReactPaginate
        breakLabel="…"
        nextLabel={<i className="fa-solid fa-chevron-right text-xs" />}
        previousLabel={<i className="fa-solid fa-chevron-left text-xs" />}
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        marginPagesDisplayed={1}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
        {...extra}
      />
    </nav>
  );
}

export default DefaultPagination;
