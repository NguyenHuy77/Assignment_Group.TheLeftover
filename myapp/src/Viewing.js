import React, { useEffect, useState } from "react";
import SearchTable from "./components/SearchTable";

function Viewing() {
  const [data, setData] = useState([]);
  const endPoint = "";

  const getData = () => {
    fetch(endPoint)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  const getNoSymptomPatients = (source) => {
    return source.filter((row) => row.symptoms.length === 0);
  };

  const getMulSymptomsPatients = (source) => {
    return source.filter((row) => row.symptoms > 1);
  };

  const getToDischargePatients = (source) => {
    return source.filter((row) => {
      let count = 0;
      for (let i = row.testResults.length - 1; i >= 0; i--) {
        if (test.result) count++;
        if (count === 4) return true;
        if (!test.result) return false;
      }
      return false;
    });
  };

  return (
    <div>
      {data && (
        <>
          <SearchTable data={getNoSymptomPatients(data)} />
          <SearchTable data={getMulSymptomsPatients(data)} />
          <SearchTable data={getToDischargePatients(data)} />
        </>
      )}
    </div>
  );
}

export default Viewing;
