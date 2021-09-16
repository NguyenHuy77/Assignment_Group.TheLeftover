import { useEffect, useState } from "react";

import SearchBar from "./SearchBar";
import SearchFilter from "./SearchFilter";
import SearchTable from "./SearchTable";

import { getSearch, getFilter, getFilterDelete } from "./getResults";

function Search({
  data,
  results,
  setResults,
  handleDelete,
  handleView,
  columnsName,
  columnsData,
  columnsSearch,
  columnsFilter,
}) {
  const [filterList, setFilterList] = useState({});
  const [query, setQuery] = useState("");

  const searchOnSubmit = (query) => {
    setQuery(query);
    setResults(getSearch(getFilter(data, filterList), query, columnsSearch));
  };

  const filterOnChange = () => {
    setResults(getFilter(getSearch(data, query, columnsSearch), filterList));
  };

  const filterOnDelete = (filters, item) => {
    setFilterList(getFilterDelete(filters, item));
    filterOnChange();
  };

  // useEffect
  useEffect(() => {
    setFilterList(
      columnsFilter.reduce((total, key) => {
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

      <div className="mt-2">
        <SearchTable
          data={results}
          columnsName={columnsName}
          columnsData={columnsData}
          handleDelete={handleDelete}
          handleView={handleView}
        />
      </div>
    </div>
  );
}

export default Search;
