import React from "react";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { Button, Alert, Form } from "react-bootstrap";
import patientsApi from "../api/patients";
import roomsApi from "../api/rooms";
import Loader from "../components/Loader";
import TextField from "../components/TextField";
import SelectField from "../components/SelectField";

const url1 = "/rooms";

const symptomsList = [
  "Fever, Cough, Difficulty breathing,...",
  "No Symptoms",
  "Good",
];

export function PatientCreate() {
  const [name, setName] = useState();
  const [age, setAge] = useState();
  const [nationalID, setNationalID] = useState();
  const [address, setAddress] = useState();
  const [day, setDay] = useState();
  const [symptoms, setSymptoms] = useState(symptomsList[0]);
  const [healthStatus, setHealthStatus] = useState();
  const [procession, setProcession] = useState();
  const [relationNumber, setRelationNumber] = useState();
  const [rooms, setRooms] = useState([]);
  const [room, setRoom] = useState("");
  const [change, setChange] = useState([]);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const createPatient = async () => {
    const data = {
      patientName: name,
      age: age,
      nationalID: nationalID,
      address: address,
      relationNumber: relationNumber,
      day: day,
      symptoms: symptoms,
      roomNumber: room,
      healthStatus: healthStatus,
      procession: procession,
    };

    setError(false);
    setSuccess(false);

    setLoading(true);
    const res = await patientsApi.postPatient(data);
    setLoading(false);

    if (res.statusText !== "OK") {
      setSuccess(false);
      setError(true);
      return;
    }

    setError(false);
    setSuccess(true);
  };

  const fetchRoom = async () => {
    const res = await roomsApi.getRooms();
    setRooms(res.data);
  };

  const fetchChange = (rNumber) => {
    fetch(url1 + "/roomNumber" + rNumber)
      .then((res) => res.json())
      .then((json) => setChange(json));
  };

  const changeAvailable = (rNumber) => {
    fetch(url1 + "/roomNumber" + rNumber, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        available: change.available - 1,
      }),
    });
  };

  useEffect(() => {
    fetchRoom();
  }, []);
  useEffect(() => {
    if (room !== "") {
      fetchChange(room);
    }
  });
  return (
    <div>
      {loading && <Loader />}
      <div className="col-md-12">
        <div className="card card-container">
          <h1>Patient Form</h1>
          <Form className="mb-2">
            <TextField
              label="Patient Name"
              id="pname"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="Age"
              id="page"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <TextField
              label="National ID"
              id="pname"
              value={nationalID}
              onChange={(e) => setNationalID(e.target.value)}
            />
            <TextField
              label="Address"
              id="paddr"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <TextField
              label="Relation Number"
              id="prenum"
              value={relationNumber}
              onChange={(e) => setRelationNumber(e.target.value)}
            />
            <TextField
              label="Day"
              id="pday"
              value={day}
              onChange={(e) => setDay(e.target.value)}
            />
            <SelectField
              label="Symptom"
              name="symptoms"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
            >
              {symptomsList.map((symptom) => (
                <option>{symptom}</option>
              ))}
            </SelectField>
            <SelectField
              label="Room"
              name="room"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
            >
              {rooms.map(
                (room) =>
                  room.available > 0 &&
                  room.roomType === symptoms && (
                    <option>{room.roomNumber}</option>
                  )
              )}
            </SelectField>
            <TextField
              label="Health Status"
              id="phealth"
              value={healthStatus}
              onChange={(e) => setHealthStatus(e.target.value)}
            />
            <TextField
              label="Procession"
              id="pproc"
              value={procession}
              onChange={(e) => setProcession(e.target.value)}
            />
            <Button
              color="primary"
              onClick={() => {
                changeAvailable(room);
                createPatient();
              }}
            >
              Create
            </Button>
          </Form>
          {error && <Alert variant="danger">Failed to add patient</Alert>}
          {success && (
            <Alert variant="success">
              Success. Go to{" "}
              <Link
                to={"/patient"}
                className="text-dark text-decoration-underline"
              >
                patients
              </Link>
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
