import React, { useContext } from "react";
import { articleCountStore } from "./Home";
import "../Styles/Pagination.css";

export const Pagination = () => {
  const contextValue = useContext(articleCountStore);

  if (!Array.isArray(contextValue)) {
    return null;
  }

  const [
    articlesCount,
    articlesPerPage,
    activePageIndex,
    updatePageIndex,
    fetchData
  ] = contextValue;

  const numberOfPages = Math.ceil(articlesCount / articlesPerPage);
  const pageOfArray = [];
  for (let i = 1; i <= numberOfPages; i++) {
    pageOfArray.push(i);
  }

  const handlePageClick = (page) => {
    updatePageIndex(page);
  };

  return (
    <div className="flex justify-center items-center flex-wrap pagination">
      <div className="prev pr-3 cursor-pointer">
        <p onClick={() => handlePageClick(activePageIndex -1 < 1 ? activePageIndex : activePageIndex - 1)}>Prev</p>
      </div>
      <div className="pagination-count">
        {pageOfArray.map((page) => (
          <span
            onClick={() => handlePageClick(page)}
            className={`${activePageIndex === page ? "activePage" : ""}`}
            key={page}
          >
            {page}
          </span>
        ))}
      </div>
      <div className="next pl-3 cursor-pointer">
        <p onClick={() => handlePageClick(activePageIndex +1 > numberOfPages ? numberOfPages : activePageIndex +1)}>Next</p>
      </div>
    </div>
  );
};
