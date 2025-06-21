import React from 'react';
import BootstrapPagination from 'react-bootstrap/Pagination';

interface PaginationParams {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

function Pagination({
  itemsPerPage,
  totalItems,
  currentPage,
  onPageChange,
}: PaginationParams) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getPaginationItems = () => {
    const items = [];

    // Show the "First" and "Prev" buttons
    items.push(
      <BootstrapPagination.First
        key="first"
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
      />
    );
    items.push(
      <BootstrapPagination.Prev
        key="prev"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />
    );

    // Show page numbers
    for (let page = 1; page <= totalPages; page++) {
      items.push(
        <BootstrapPagination.Item
          key={page}
          active={page === currentPage}
          onClick={() => onPageChange(page)}
        >
          {page}
        </BootstrapPagination.Item>
      );
    }

    // Show the "Next" and "Last" buttons
    items.push(
      <BootstrapPagination.Next
        key="next"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
    );

    items.push(
      <BootstrapPagination.Last
        key="last"
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
      />
    );

    return items;
  };

  return <BootstrapPagination>{getPaginationItems()}</BootstrapPagination>;
}

export default Pagination;
