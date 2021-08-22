import React from "react";

function SearchFilter({ filters, data, onSelect, onDelete }) {
  return (
    <div>
      {/* ---- filter form ---- */}
      <form className="d-flex mt-3 mb-1">
        {Object.keys(filters).map((key, i) => {
          return (
            <select
              key={i}
              className="form-select filter"
              onChange={(e) => {
                if (!filters[key].includes(e.target.value))
                  filters[key].push(e.target.value);
                onSelect();
              }}
              value=""
            >
              <option>Choose {key}</option>
              {data &&
                data
                  .reduce((total, cur) => {
                    if (!total.includes(cur[key])) total.push(cur[key]);
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
          );
        })}
      </form>

      {/* ---- filter items ---- */}
      {Object.keys(filters).reduce((total, key) => {
        total.push(
          filters[key].map((filterVal, i) => {
            return (
              <button
                key={i}
                className="btn btn-primary me-1"
                onClick={() => onDelete(filters, filterVal)}
              >
                <span>{filterVal}</span>
                <i className="bi bi-x ms-1"></i>
              </button>
            );
          })
        );
        return total;
      }, [])}
    </div>
  );
}

export default SearchFilter;
