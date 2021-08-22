import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import SearchFilter from "./components/SearchFilter";
import SearchTable from "./components/SearchTable";

function Search() {
  const [data, setData] = useState([]);
  const [results, setResults] = useState([]);
  const [filterList, setFilterList] = useState({});
  const [query, setQuery] = useState("");
  const columnsToSearch = ["id", "lname", "fname", "age"];
  const columnsToFilter = ["fname", "room"];
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
    if (!query.trim()) return source;

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
    setResults(getSearch(getFilter(data, filterList), query));
  };

  // filter
  const getFilter = (source, filters) => {
    if (Object.keys(filters).every((key) => filters[key].length === 0))
      return source;

    return Object.keys(filters).reduce((total, key) => {
      return total.filter((row) => {
        if (filters[key].length === 0) return row;
        return filters[key].some((filterVal) =>
          row[key].toString().includes(filterVal)
        );
      });
    }, source);
  };

  const filterOnChange = () => {
    setResults(getFilter(getSearch(data, query), filterList));
  };

  const filterOnDelete = (filters, item) => {
    setFilterList(
      Object.keys(filters).reduce((total, key) => {
        total[key] = total[key].filter((i) => i !== item);
        return total;
      }, filters)
    );
    filterOnChange();
  };

  // useEffect
  useEffect(() => {
    getData();

    setFilterList(
      columnsToFilter.reduce((total, key) => {
        total[key] = [];
        return total;
      }, {})
    );
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container-xl mt-4">
      <SearchBar onSubmit={searchOnSubmit} />

      <SearchFilter
        data={results}
        filters={filterList}
        onSelect={filterOnChange}
        onDelete={filterOnDelete}
      />

      <SearchTable data={results} />
    </div>
  );
}

export default Search;
