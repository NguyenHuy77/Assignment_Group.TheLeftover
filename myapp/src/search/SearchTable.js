import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function SearchTable({ data }) {
  const firstRow = data[0];
  const url = "/patients";
  const columns =
    firstRow &&
    Object.keys(firstRow).filter(
      (column) => typeof firstRow[column] !== "object"
    );

  const handleDelete = (id) => {
    fetch(url + "/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
  };

  return (
    <div>
      <p className="mb-1 mt-3">
        Showing {data.length} of {data.length} results
      </p>
      <table
        className="table table-striped table-lg align-middle border"
        style={{ fontSize: "0.85rem" }}
      >
        <thead className="table-dark">
          <tr>
            {columns &&
              columns.map((column, i) => (
                <th key={i} scope="col" className="fw-normal py-3">
                  {column.toLowerCase()}
                </th>
              ))}
            <th colSpan="2"></th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item, i) => (
              <tr key={i}>
                {columns.map((column, j) => {
                  if (typeof item[column] !== "object")
                    return <td key={j}>{item[column]}</td>;
                  return null;
                })}
                <td colSpan="2">
                  {
                    <Button className="me-2" variant="muted">
                      <Link
                        to={`/patient/${item["_id"]}`}
                        className="text-primary btn-sm"
                      >
                        View
                      </Link>
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
      </table>
    </div>
  );
}

export default SearchTable;
