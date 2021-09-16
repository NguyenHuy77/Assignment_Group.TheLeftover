import React, { Component } from "react";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { Button, Alert } from "react-bootstrap";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

const url = "/patients";
const url1 = "/rooms";
export function PatientCreate() {
  const [name, setName] = useState();
  const [age, setAge] = useState();
  const [nationalID, setNationalID] = useState();
  const [address, setAddress] = useState();
  const [day, setDay] = useState();
  const [symptoms, setSymptoms] = useState();
  const [healthStatus, setHealthStatus] = useState();
  const [procession, setProcession] = useState();
  const [relationNumber, setRelationNumber] = useState();
  const [rooms, setRooms] = useState([]);
  const [room, setRoom] = useState("");
  const [change,setChange] =useState([])
  const [error, setError] = useState(false);
  const [fetching, setFetching] = useState(false);

  const createPatient = async () => {
    setFetching(false);
    const res = await fetch(url +"f", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
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
      }),
    });

    setFetching(true);

    if (!res.ok) return setError(true);
    setError(false);
  };
  const fetchRoom = () => {
    fetch(url1)
      .then((res) => res.json())
      .then((json) => setRooms(json));
  };
  const fetchChange = (rNumber) => {
    fetch(url1 + "/roomNumber" + rNumber)
      .then((res) => res.json())
      .then((json) => setChange(json));
  }
  const changeAvailable = (rNumber)=>{
     fetch(url1+"/roomNumber"+rNumber, {
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
      <div className="col-md-12">
        <div className="card card-container">
          <h1>Patient Form</h1>
          <Form className="mb-2">
            <label htmlFor="name">Patient Name</label>
            <Input
              type="text"
              className="form-control"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="age">Age</label>
            <Input
              type="text"
              className="form-control"
              name="age"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <label htmlFor="natid">National ID</label>
            <Input
              type="text"
              className="form-control"
              name="nationalID"
              if="natid"
              value={nationalID}
              onChange={(e) => setNationalID(e.target.value)}
            />
            <label htmlFor="address">Address</label>
            <Input
              type="text"
              className="form-control"
              name="address"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <label htmlFor="relation">Relation Number</label>
            <Input
              type="text"
              className="form-control"
              name="relationNumber"
              id="relation"
              value={relationNumber}
              onChange={(e) => setRelationNumber(e.target.value)}
            />
            <label htmlFor="day">Day</label>
            <Input
              type="text"
              className="form-control"
              name="day"
              id="day"
              value={day}
              onChange={(e) => setDay(e.target.value)}
            />
            <div>
              <label htmlFor="symptom">Symptom</label>
              <select
                className="form-control"
                name="symptoms"
                id="symptom"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
              >
                <option>Fever, Cough, Difficulty breathing,...</option>
                <option>No Symptoms</option>
                <option>Good</option>
              </select>
              <label htmlFor="room">Room</label>
              <select
                className="form-control"
                name="room"
                id="room"
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
              </select>
            </div>
            <label htmlFor="status">Health Status</label>
            <Input
              type="text"
              className="form-control"
              name="healthStatus"
              id="status"
              value={healthStatus}
              onChange={(e) => setHealthStatus(e.target.value)}
            />
            <label htmlFor="procession">Procession</label>
            <Input
              type="text"
              className="form-control"
              name="procession"
              id="procession"
              value={procession}
              onChange={(e) => setProcession(e.target.value)}
            />
            <Button
              size="small"
              color="primary"
              onClick={() => {
                changeAvailable(room);
                createPatient();
              }}
            >
              Create
            </Button>
          </Form>
          {fetching &&
            (error ? (
              <Alert variant="danger">Failed to add patient</Alert>
            ) : (
              <>
                <Alert variant="success">
                  Success. Go to{" "}
                  <Link to={"/patient"} className="text-dark">
                    patients
                  </Link>
                </Alert>
              </>
            ))}
        </div>
      </div>
    </div>
  );
}
