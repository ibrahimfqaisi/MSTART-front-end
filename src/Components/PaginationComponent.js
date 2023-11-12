import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

const PaginationComponent = ({ totalPages, currentPage, onPageClick }) => {
  const paginationItems = [];

  for (let i = 1; i <= totalPages; i++) {
    paginationItems.push(
      <Pagination.Item key={i} active={i === currentPage} onClick={() => onPageClick(i)}>
        {i}
      </Pagination.Item>
    );
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '10px' }}>
      <Pagination>
        <Pagination.First onClick={() => onPageClick(1)} disabled={currentPage === 1} />
        <Pagination.Prev
          onClick={() => onPageClick(currentPage - 1)}
          disabled={currentPage === 1}
        />

        {paginationItems}

        <Pagination.Next
          onClick={() => onPageClick(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
        <Pagination.Last onClick={() => onPageClick(totalPages)} disabled={currentPage === totalPages} />
      </Pagination>
    </div>
  );
};

export default PaginationComponent;
