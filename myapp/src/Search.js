import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import SearchTable from "./components/SearchTable";

const dataAll = [
  {
    id: 1,
    lname: "Tran",
    fname: "Trung",
    age: 23,
    birth: "19970428",
    phone: "0911111111",
  },
  {
    id: 2,
    lname: "Nguyen",
    fname: "Phong",
    age: 48,
    birth: "199908212",
    phone: "0922222222",
  },
  {
    id: 3,
    lname: "Nguyen",
    fname: "Trung",
    age: 17,
    birth: "19990229",
    phone: "0933333333",
  },
  {
    id: 4,
    lname: "Le",
    fname: "Trang",
    age: 36,
    birth: "19931119",
    phone: "0944444444",
  },
  {
    id: 5,
    lname: "Hoang",
    fname: "Xuan",
    age: 42,
    birth: "19991207",
    phone: "0955555555",
  },
  {
    id: 6,
    lname: "Ly",
    fname: "Trung",
    age: 59,
    birth: "19840309",
    phone: "0999999999",
  },
];

function Search() {
  const [data, setData] = useState(dataAll);
  const [results, setResults] = useState(dataAll);
  const [filterList, setFilterList] = useState([]);
  const [query, setQuery] = useState("");

  // search
  const searchToSubmit = (source, query) => {
    if (query.trim() === "") return source;

    const queries = query
      .split(/ +/g)
      .map((query) => query.trim().toLowerCase());

    return source.filter((item) => {
      return queries.every((query) => {
        return Object.keys(item).some((key) =>
          item[key].toString().toLowerCase().includes(query)
        );
      });
    });
  };

  const searchOnSubmit = (query) => {
    setQuery(query);
    setResults(searchToSubmit(filterToChange(data), query));
  };

  // filter
  const filterToChange = (source) => {
    if (filterList.length === 0) return source;

    return source.filter((val) => {
      return filterList.some((item) => {
        return val.fname.includes(item);
      });
    });
  };

  const filterOnChange = () => {
    setResults(filterToChange(searchToSubmit(data, query)));
  };

  const filterOnDelete = (item) => {
    setFilterList(filterList.filter((i) => i !== item));
    filterOnChange();
  };

  // useEffect
  useEffect(() => {
    filterOnChange();
  }, [filterList]);

  return (
    <div className="container-xl mt-4">
      <SearchBar onSubmit={searchOnSubmit} />

      {/* ---- filter form ---- */}
      <form className="d-flex mt-3 mb-1">
        <select
          className="form-select filter"
          onChange={(e) => {
            if (filterList.indexOf(e.target.value) === -1)
              filterList.push(e.target.value);
            filterOnChange();
          }}
          value=""
        >
          <option>Choose Name</option>
          {data &&
            data
              .reduce((total, cur) => {
                if (total.indexOf(cur) === -1) total.push(cur.fname);
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
      {filterList &&
        filterList.map((item, i) => {
          return (
            <button
              key={i}
              className="btn btn-primary me-1"
              onClick={() => filterOnDelete(item)}
            >
              <span>{item}</span>
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
