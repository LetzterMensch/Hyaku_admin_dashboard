import React, { useEffect, useState } from "react";

/**
 *
 * @param {object} props
 * @param {*} props.setPage
 * @param {number} props.page
 * @param {number} props.maxPages
 * @returns
 */
function Pagination({ page, setPage, maxPages }) {
  const [currentPage, setCurrentPage] = useState(page);
  useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);
  let items = [];
  let leftSide = currentPage - 2;
  leftSide = leftSide <= 0 ? 1 : leftSide;
  let rightSide = currentPage + 2;
  rightSide = rightSide > maxPages ? maxPages : rightSide;
  // for (let number = leftSide; number <= r)
  let active =
    "flex items-center justify-center bg-slate-700 border-2 border-slate-700 text-slate-50 h-10 w-10 cursor-pointer mx-1";
  let noActive =
    "flex items-center justify-center bg-slate-50 border-2 border-slate-700 text-slate-900 h-10 w-10 cursor-pointer mx-1 hover:bg-slate-300 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-slate-300";
  for (let number = leftSide; number <= rightSide; number++) {
    items.push(
      <div
        key={number}
        className={number === currentPage ? active : noActive}
        onClick={() => setCurrentPage(number)}
      >
        {number}
      </div>
    );
  }

  const firstPage = () => {
    if (currentPage != 1) {
      setCurrentPage(1);
    }
  };

  const lastPage = () => {
    if (currentPage < maxPages) {
      setCurrentPage(maxPages);
    }
  };

  const nextPage = () => {
    if (currentPage < maxPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center ">
        <button
          className="flex items-center justify-center bg-slate-50 border-2 border-slate-700 text-slate-900 h-10 w-10 cursor-pointer mx-1 hover:bg-slate-300 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={currentPage === 1}
          onClick={firstPage}
        >
          &lsaquo;&lsaquo;
        </button>
        <button
          className="flex items-center justify-center bg-slate-50 border-2 border-slate-700 text-slate-900 h-10 w-10 cursor-pointer mx-1 hover:bg-slate-300 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={currentPage === 1}
          onClick={prevPage}
        >
          &lsaquo;
        </button>
        <div className="flex items-center justify-center">{items}</div>
        <button
          className="flex items-center justify-center bg-slate-50 border-2 border-slate-700 text-slate-900 h-10 w-10 cursor-pointer mx-1 hover:bg-slate-300 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={currentPage === maxPages}
          onClick={nextPage}
        >
          &rsaquo;
        </button>
        <button
          className="flex items-center justify-center bg-slate-50 border-2 border-slate-700 text-slate-900 h-10 w-10 cursor-pointer mx-1 hover:bg-slate-300 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={currentPage === maxPages}
          onClick={lastPage}
        >
          &rsaquo;&rsaquo;
        </button>
      </div>
    </div>
  );
}

export default Pagination;
