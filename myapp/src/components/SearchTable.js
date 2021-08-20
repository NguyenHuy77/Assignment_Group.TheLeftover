function SearchTable({ data }) {
  const columns = data[0] && Object.keys(data[0]);

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
                {columns.map((column, j) => (
                  <td key={j}>{item[column]}</td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default SearchTable;
