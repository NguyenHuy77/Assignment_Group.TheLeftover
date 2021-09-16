import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

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
  const currentData = data.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (number) => setCurrentPage(number);

  return (
    <div>
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
            <th colSpan="2"></th>
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
                <td colSpan="2">
                  {
                    <Button
                      className="me-2"
                      variant="muted"
                      onClick={() => handleView(item["_id"])}
                    >
                      View
                    </Button>
                  }
                  {
                    <Button
                      variant="muted"
                      className="text-primary btn-sm"
                      onClick={() => handleDelete(item["_id"])}
                    >
                      Delete
                    </Button>
                  }
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <TablePagination
        paginate={paginate}
        totalPages={data.length}
        rowsPerPage={rowsPerPage}
        currentPage={currentPage}
      />
    </div>
  );
}

export default SearchTable;
