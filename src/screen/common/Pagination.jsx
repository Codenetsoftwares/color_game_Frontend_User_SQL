import React from 'react';

const Pagination = ({ currentPage, totalPages, handlePageChange, startIndex, endIndex, totalData }) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];

    let startPage = Math.max(currentPage - 1, 1);
    let endPage = Math.min(currentPage + 1, totalPages);

    if (endPage - startPage < 2) {
      startPage = Math.max(endPage - 2, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
          <button className="page-link" onClick={() => handlePageChange(i)}>
            {i}
          </button>
        </li>,
      );
    }

    return pageNumbers;
  };

  return (
    <div className="col-lg-12 col-sm-6">
    <div className="white_box mb_30">
      <nav aria-label="Page navigation example">
        <div className="d-flex justify-content-between">
          <p className="d-none d-sm-block">
            Showing {startIndex} to {endIndex} of {totalData} entries
          </p>
          <ul className="pagination justify-content-end">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
                First
              </button>
            </li>
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
            </li>
            {renderPageNumbers()}
            <li className={`page-item `}>
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </li>
            <li className={`page-item `}>
              <button
                className="page-link"
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
              >
                Last
              </button>
            </li>
          </ul>
        </div>
        <p className="d-sm-none" style={{textAlign:"center"}}>
          Showing {startIndex} to {endIndex} of {totalData} entries
        </p>
        <p className="d-sm-none" style={{width:"100%",height:"5px" ,color:"white"}}>
         just for spacing 
        </p>
      </nav>
    </div>
  </div>
  
  );
};

export default Pagination;
