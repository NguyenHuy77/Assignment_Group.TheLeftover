import { Pagination } from "react-bootstrap";

const TablePagination = ({
  paginate,
  totalPages,
  rowsPerPage,
  currentPage,
}) => {
  const lastPage = Math.ceil(totalPages / rowsPerPage);
  const pagesShow = currentPage + 3;
  const pages = [];
  for (let i = currentPage; i < pagesShow; i++) {
    pages.push(i);
    if (i === lastPage) break;
  }

  if (totalPages < 1) return null;

  return (
    <Pagination>
      <Pagination.First onClick={() => paginate(1)} />
      <Pagination.Prev
        onClick={() => currentPage !== 1 && paginate(currentPage - 1)}
      />
      {currentPage > 1 && <Pagination.Ellipsis />}

      {pages.map((page) => {
        if (currentPage === page)
          return (
            <Pagination.Item active onClick={() => paginate(lastPage)}>
              {page}
            </Pagination.Item>
          );
        return (
          <Pagination.Item onClick={() => paginate(lastPage)}>
            {page}
          </Pagination.Item>
        );
      })}

      {currentPage < lastPage && <Pagination.Ellipsis />}
      <Pagination.Next
        onClick={() => currentPage !== lastPage && paginate(currentPage + 1)}
      />
      <Pagination.Last onClick={() => paginate(lastPage)} />
    </Pagination>
  );
};

export default TablePagination;
