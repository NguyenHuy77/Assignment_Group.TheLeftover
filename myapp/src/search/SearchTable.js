import { Button } from "react-bootstrap";

function SearchTable({ data }) {
  const firstRow = data[0];
  const columns =
    firstRow &&
    Object.keys(firstRow).filter(
      (column) => typeof firstRow[column] !== "object"
    );

  return (
    <div>
      <p className="mb-1 mt-3">
        Showing {data.length} of {data.length} results
      </p>
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            {columns &&
              columns.map((column, i) => (
                <th key={i} scope="col">
                  {column.toUpperCase()}
                </th>
              ))}
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
                <td colSpan="3">
                  {<Button className="me-2">View</Button>}
                  {<Button className="me-2">Edit</Button>}
                  {<Button>Delete</Button>}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default SearchTable;
