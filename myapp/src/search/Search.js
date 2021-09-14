import { useEffect, useState } from "react";

import SearchBar from "./SearchBar";
import SearchFilter from "./SearchFilter";
import SearchTable from "./SearchTable";

import { getSearch, getFilter, getFilterDelete } from "./getResults";

function Search() {
  const [data, setData] = useState([]);
  const [results, setResults] = useState([]);
  const [filterList, setFilterList] = useState({});
  const [query, setQuery] = useState("");
  const columnsToSearch = ["_id", "patientName", "nationalID"];
  const columnsToFilter = ["patientName", "symptoms", "age"];
  const endPoint = "/patients";

  // fetch data
  const getData = () => {
    fetch(endPoint)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setResults(data);
      });
  };

  const searchOnSubmit = (query) => {
    setQuery(query);
    setResults(getSearch(getFilter(data, filterList), query, columnsToSearch));
  };

  const filterOnChange = () => {
    setResults(getFilter(getSearch(data, query, columnsToSearch), filterList));
  };

  const filterOnDelete = (filters, item) => {
    setFilterList(getFilterDelete(filters, item));
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
    <div className="container-fluid mt-4">
      <SearchBar onSubmit={searchOnSubmit} />

      {query && (
        <SearchFilter
          data={results}
          filters={filterList}
          onSelect={filterOnChange}
          onDelete={filterOnDelete}
        />
      )}

      <SearchTable data={results} />
    </div>
  );
}

export default Search;
