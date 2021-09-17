import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import patientsApi from "../api/patients";
import Loader from "../components/Loader";
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
  const [error, setError] = useState("");

  const history = useHistory();

  // fetch data
  const getData = async () => {
    setError("");

    setLoading(true);
    const res = await patientsApi.getPatients();
    setLoading(false);

    if (res.statusText !== "OK")
      return setError("Error when fetching patients data");

    setError("");
    setResults(res.data);
    setData(res.data);
  };

  const handleDelete = async (item) => {
    setError("");

    setLoading(true);
    const res = await patientsApi.deletePatient(item._id);
    setLoading(false);

    if (res.statusText !== "OK") return setError("Cannot delete patient");

    setError("");
    getData();
  };

  const handleView = (item) => {
    history.push("/patient/" + item._id);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {error && <Alert variant="danger">{error}</Alert>}
      {loading && <Loader />}

      <Search
        data={data}
        results={results}
        setResults={setResults}
        columnsData={columnsData}
        columnsFilter={columnsFilter}
        columnsSearch={columnsSearch}
        columnsName={columnsName}
        handleDelete={handleDelete}
        handleView={handleView}
      />
    </div>
  );
}
