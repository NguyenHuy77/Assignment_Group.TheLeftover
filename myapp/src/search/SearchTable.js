import { useState } from "react";
import { Button, Table, Container } from "react-bootstrap";

import TablePagination from "./TablePagination";

const rowsPerPage = 10;

function SearchTable({
  data,
  columnsName,
  columnsData,
  handleDelete,
  handleView,
}) {
  const [currentPage, setCurrentPage] = useState(1);

  // Get current posts
  const indexOfLastPost = currentPage * rowsPerPage;
  const indexOfFirstPost = indexOfLastPost - rowsPerPage;
  const currentData =
    data.length > 0 ? data.slice(indexOfFirstPost, indexOfLastPost) : [];

  // Change page
  const paginate = (number) => setCurrentPage(number);

  return (
    <div className="table-responsive">
      <Table
        className="table table-striped table-lg align-middle border"
        style={{ fontSize: "0.88rem" }}
      >
        <thead className="table-dark">
          <tr>
            {columnsName &&
              columnsName.map((column, i) => (
                <th key={i} scope="col" className="py-4">
                  {column}
                </th>
              ))}
            <th scope="col" className="py-4">
              View
            </th>
            <th scope="col" className="py-4">
              Delete
            </th>
          </tr>
        </thead>
        <tbody>
          {currentData &&
            currentData.map((item, i) => (
              <tr key={i}>
                {columnsData.map((column, j) => {
                  return (
                    <td key={j} className="py-4">
                      {item[column]}
                    </td>
                  );
                })}
                <td>
                  {
                    <Button
                      className="me-2 text-primary"
                      size="sm"
                      variant="muted"
                      onClick={() => handleView(item)}
                    >
                      VIEW
                    </Button>
                  }
                </td>
                <td>
                  {
                    <Button
                      variant="muted"
                      size="sm"
                      className="text-primary"
                      onClick={() => handleDelete(item)}
                    >
                      DELETE
                    </Button>
                  }
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <div className="d-flex justify-content-end">
        <TablePagination
          paginate={paginate}
          totalPages={data.length}
          rowsPerPage={rowsPerPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}

export default SearchTable;
