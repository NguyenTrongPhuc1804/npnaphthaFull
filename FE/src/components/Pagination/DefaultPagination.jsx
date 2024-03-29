import React from "react";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import "../../index.css";
function DefaultPagination({
  itemsPerPage,
  pageCount,
  e,
  navigation,
  currentPage,
}) {
  const [itemOffset, setItemOffset] = useState(0);
  const handlePageClick = (event) => {
    // const newOffset = (event.selected * itemsPerPage) % items.length;
    e(event.selected);

    // navigation(event.selected);
    console.log(
      `User requested page number ${event.selected}, which is offset`
    );
    // setItemOffset(newOffset);
  };
  return (
    <div className="pagination w-full flex justify-center items-center mt-8">
      <ReactPaginate
        breakLabel="..."
        nextLabel="next "
        onPageChange={handlePageClick}
        pageRangeDisplayed={1}
        pageCount={pageCount}
        previousLabel="back"
        renderOnZeroPageCount={null}
        initialPage={currentPage}
      />
    </div>
  );
}

export default DefaultPagination;
