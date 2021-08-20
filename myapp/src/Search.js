import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import SearchTable from "./components/SearchTable";

function Search() {
  const [data, setData] = useState([]);
  const [results, setResults] = useState([]);
  const [filterListRoom, setFilterListRoom] = useState([]);
  const [filterListName, setFilterListName] = useState([]);
  const [query, setQuery] = useState("");
  const columnsToSearch = ["id", "lname", "fname", "age"];
  const endPoint = "./data/db.json";

  // fetch data
  const getData = () => {
    fetch(endPoint)
      .then((res) => res.json())
      .then((data) => {
        setData(data.patients);
        setResults(data.patients);
      });
  };

  // search
  const getSearch = (source, query) => {
    if (query.trim() === "") return source;

    const queries = query.split(/ +/g).map((query) => query.toLowerCase());

    return source.filter((row) => {
      return queries.every((query) => {
        return columnsToSearch.some((column) =>
          row[column].toString().toLowerCase().includes(query)
        );
      });
    });
  };

  const searchOnSubmit = (query) => {
    setQuery(query);
    setResults(getSearch(getFilter(data), query));
  };

  // filter
  const getFilter = (source) => {
    if (filterListName.length === 0 && filterListRoom.length === 0)
      return source;

    return source
      .filter((row) => {
        if (filterListName.length === 0) return row;
        return filterListName.some((filterVal) =>
          row["fname"].toString().includes(filterVal)
        );
      })
      .filter((row) => {
        if (filterListRoom.length === 0) return row;
        return filterListRoom.some((filterVal) =>
          row["room"].toString().includes(filterVal)
        );
      });
  };

  const filterOnChange = () => {
    setResults(getFilter(getSearch(data, query)));
  };

  const filterOnDelete = (item) => {
    setFilterListName(filterListName.filter((i) => i !== item));
    setFilterListRoom(filterListRoom.filter((i) => i !== item));
  };

  // useEffect
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    filterOnChange();
  }, [filterListName, filterListRoom]);

  return (
    <div className="container-xl mt-4">
      <SearchBar onSubmit={searchOnSubmit} />

      {/* ---- filter form ---- */}
      <form className="d-flex mt-3 mb-1">
        {/* filter name */}
        <select
          className="form-select filter"
          onChange={(e) => {
            if (!filterListName.includes(e.target.value))
              filterListName.push(e.target.value);
            filterOnChange();
          }}
          value=""
        >
          <option>Choose Name</option>
          {results &&
            results
              .reduce((total, cur) => {
                if (!total.includes(cur["fname"])) total.push(cur["fname"]);
                return total;
              }, [])
              .map((item, i) => {
                return (
                  <option key={i} value={item}>
                    {item}
                  </option>
                );
              })}
        </select>
        {/* filter room */}
        <select
          className="form-select filter"
          onChange={(e) => {
            if (!filterListRoom.includes(e.target.value))
              filterListRoom.push(e.target.value);
            filterOnChange();
          }}
          value=""
        >
          <option>Choose Room</option>
          {results &&
            results
              .reduce((total, cur) => {
                if (!total.includes(cur["room"])) total.push(cur["room"]);
                return total;
              }, [])
              .map((item, i) => {
                return (
                  <option key={i} value={item}>
                    {item}
                  </option>
                );
              })}
        </select>
      </form>

      {/* ---- filter items ---- */}
      {filterListName &&
        filterListName.map((filterVal, i) => {
          return (
            <button
              key={i}
              className="btn btn-primary me-1"
              onClick={() => filterOnDelete(filterVal)}
            >
              <span>{filterVal}</span>
              <i className="bi bi-x ms-1"></i>
            </button>
          );
        })}
      {filterListRoom &&
        filterListRoom.map((filterVal, i) => {
          return (
            <button
              key={i}
              className="btn btn-primary me-1"
              onClick={() => filterOnDelete(filterVal)}
            >
              <span>{filterVal}</span>
              <i className="bi bi-x ms-1"></i>
            </button>
          );
        })}

      {/* ---- table ---- */}
      <SearchTable data={results} />
    </div>
  );
}

export default Search;
