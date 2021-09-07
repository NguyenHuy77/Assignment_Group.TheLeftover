const getSearch = (source, query, columns) => {
  if (!query.trim()) return source;

  const queries = query.split(/ +/g).map((query) => query.toLowerCase());

  return source.filter((row) => {
    return queries.every((query) => {
      return columns.some((column) => {
        if (row[column])
          return row[column].toString().toLowerCase().includes(query);
        return false;
      });
    });
  });
};

const getFilter = (source, filters) => {
  if (Object.keys(filters).every((key) => filters[key].length === 0))
    return source;

  return Object.keys(filters).reduce((total, key) => {
    if (filters[key].length === 0) return total;
    return total.filter((row) => {
      return filters[key].some((filterVal) =>
        row[key].toString().includes(filterVal)
      );
    });
  }, source);
};

const getFilterDelete = (filters, item) => {
  return Object.keys(filters).reduce((total, key) => {
    total[key] = total[key].filter((i) => i !== item);
    return total;
  }, filters);
};

export { getSearch, getFilter, getFilterDelete };
