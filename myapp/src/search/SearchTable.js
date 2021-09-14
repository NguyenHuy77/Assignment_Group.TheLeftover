import { Button } from "react-bootstrap";
import { Switch, Route, Link } from "react-router-dom";

function SearchTable({ data }) {
  const firstRow = data[0];
  const url = "hhttp://localhost:8080/patients";
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
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            {columns &&
              columns.map((column, i) => (
                <th key={i} scope="col">
                  {column.toLowerCase()}
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
                  {<Button className="me-2"><Link to={`/patient/${item["_id"]}`}>View</Link></Button>}
                  {<Button onClick={()=>handleDelete(item["_id"])}>Delete</Button>}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default SearchTable;
