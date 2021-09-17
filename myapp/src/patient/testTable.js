import React from "react";
import { useState, useEffect } from "react";
import { Alert, Col, Form, Row, Button } from "react-bootstrap";
import dayjs from "dayjs";

import SearchTable from "../search/SearchTable";
import Loader from "../components/Loader";
import TextField from "../components/TextField";

import testsApi from "../api/tests";

const columnsName = ["Test Time", "Results", "Date Test"];
const columnsData = ["testTime", "result", "dateTest"];

export function TestTable({ id }) {
  const patientId = id;

  const [testResults, setTestResults] = useState([]);
  const [idTest, setIdTest] = useState("");

  const [testTime, setTestTime] = useState();
  const [result, setResult] = useState();
  const [nurse, setNurse] = useState();
  const [hour, setHour] = useState(0);
  const [min, setMin] = useState(0);
  const [day, setDay] = useState(1);
  const [month, setMonth] = useState(1);
  const [year, setYear] = useState(1970);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchTests = async () => {
    setError("");

    setLoading(true);
    const res = await testsApi.getPatientTests(patientId);
    setLoading(false);

    if (res.statusText !== "OK")
      return setError("Error when fetching tests data");

    setError("");
    setTestResults(res.data);
  };

  useEffect(() => {
    fetchTests();
  }, []);

  const handleEdit = (item) => {
    setIdTest(item._id);
    setTestTime(item.testTime);
    setResult(item.result);
    setNurse(item.testUser);
    setHour(item.date.hour());
    setMin(item.date.minute());
    setDay(item.date.date());
    setMonth(item.date.month());
    setYear(item.date.year());
  };

  const handleDelete = async (item) => {
    setError("");

    setLoading(true);
    const res = await testsApi.deleteTest(item._id);
    setLoading(false);

    if (res.statusText !== "OK") return setError("Cannot delete test");

    setError("");
    fetchTests();
  };

  const save = async () => {
    let date;
    try {
      date = dayjs()
        .minute(min)
        .hour(hour)
        .date(day)
        .month(month)
        .year(year)
        .format();
    } catch (e) {
      setError("Error in parsing date");
    }
    const data = {
      patientID: patientId,
      testTime: testTime,
      result: result,
      testUser: nurse,
      date: date,
    };

    setError("");

    setLoading(true);
    const res = await (idTest === ""
      ? testsApi.postTest(data)
      : testsApi.patchTest(idTest, data));
    setLoading(false);

    if (res.statusText !== "OK") return setError("Cannot save test");

    setError("");
    fetchTests();
  };

  return (
    <div>
      {error && <Alert variant="danger">{error}</Alert>}
      {loading && <Loader />}

      <SearchTable
        data={testResults}
        columnsName={columnsName}
        columnsData={columnsData}
        handleDelete={handleDelete}
        handleView={handleEdit}
      />

      <div class="card container">
        <form>
          {idTest === "" ? <h1>New Test Result</h1> : <h1>Edit Result</h1>}
          <div>
            <Form>
              <TextField
                label="Test Time"
                id="ttime"
                value={testTime}
                onChange={(e) => setTestTime(e.target.value)}
              />
              <TextField
                label="Result"
                id="tresult"
                value={result}
                onChange={(e) => setResult(e.target.value)}
              />
              <Row>
                <Col>
                  <TextField
                    label="Hour"
                    id="thour"
                    value={hour}
                    onChange={(e) => setHour(e.target.value)}
                  />
                </Col>
                <Col>
                  <TextField
                    label="Minute"
                    id="tmin"
                    value={min}
                    onChange={(e) => setMin(e.target.value)}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <TextField
                    label="DD"
                    id="tday"
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                  />
                </Col>
                <Col>
                  <TextField
                    label="MM"
                    id="tmonth"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                  />
                </Col>
                <Col>
                  <TextField
                    label="YYYY"
                    id="tyear"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  />
                </Col>
              </Row>
              <TextField
                label="Nurse"
                id="tnurse"
                value={nurse}
                onChange={(e) => setNurse(e.target.value)}
              />
            </Form>
          </div>
          {idTest === "" ? (
            <Button color="primary" onClick={save}>
              Create
            </Button>
          ) : (
            <Button color="primary" onClick={save}>
              Edit
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}
