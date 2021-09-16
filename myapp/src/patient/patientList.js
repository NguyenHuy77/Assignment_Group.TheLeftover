import React, { useEffect, useState } from "react";
import { Alert, Spinner } from "react-bootstrap";
import Search from "../search/Search";

const columnsSearch = ["_id", "patientName", "nationalID"];
const columnsFilter = ["patientName", "symptoms", "age"];
const columnsName = [
  "ID",
  "Name",
  "Age",
  "National ID",
  "Address",
  "Relation Number",
  "Day",
  "Symptoms",
  "Room",
  "Health Status",
  "Procession",
];
const columnsData = [
  "_id",
  "patientName",
  "age",
  "nationalID",
  "address",
  "relationNumber",
  "day",
  "symptoms",
  "roomNumber",
  "healthStatus",
  "procession",
];

export default function PatientList() {
  const [data, setData] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const endPoint = "/patients";

  // fetch data
  const getData = async () => {
    setLoading(true);

    await fetch(endPoint)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setResults(data);
      });

    setLoading(false);
  };

  const handleDelete = async (id) => {
    setLoading(true);

    const res = await fetch(endPoint + "/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });

    setLoading(false);

    if (!res.ok) return setError("Cannot delete patient");

    setError(false);
    getData();
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {error && <Alert variant="danger">{error}</Alert>}
      {loading && (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      <Search
        data={data}
        results={results}
        setResults={setResults}
        columnsData={columnsData}
        columnsFilter={columnsFilter}
        columnsSearch={columnsSearch}
        columnsName={columnsName}
        handleDelete={handleDelete}
      />
    </div>
  );
}
