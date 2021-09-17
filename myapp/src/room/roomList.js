import React from "react";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "@material-ui/core/Button";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import roomsApi from "../api/rooms";
import Loader from "../components/Loader";
import { Alert } from "react-bootstrap";
import SearchTable from "../search/SearchTable";

const columnsName = ["Room Number", "Room Type", "Bed Count", "Available"];
const columnsData = ["roomNumber", "roomType", "bedCounts", "available"];

export default function RoomList() {
  const [rooms, setRooms] = useState([]);
  const [id, setId] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [roomType, setRoomType] = useState("");
  const [bedCounts, setBedCounts] = useState(0);
  const [available, setAvailable] = useState(0);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchRoom = async () => {
    setError("");

    setLoading(true);
    const res = await roomsApi.getRooms();
    setLoading(false);

    if (res.statusText !== "OK") return setError("Error when fetching data");

    setError("");
    setRooms(res.data);
  };

  useEffect(() => {
    fetchRoom();
  }, []);

  const handleEdit = (item) => {
    setId(item._id);
    setRoomNumber(item.roomNumber);
    setRoomType(item.roomType);
    setBedCounts(item.bedCounts);
    setAvailable(item.available);
  };

  const handleDelete = async (item) => {
    setError("");

    setLoading(true);
    const res = await roomsApi.deleteRoom(item._id);
    setLoading(false);

    if (res.statusText !== "OK") return setError("Cannot delete room");

    setError("");
    fetchRoom();
  };

  const save = async () => {
    const data = {
      roomNumber: roomNumber,
      roomType: roomType,
      bedCounts: bedCounts,
      available: available,
    };

    setError("");

    setLoading(true);
    const res = await (id === ""
      ? roomsApi.postRoom(data)
      : roomsApi.patchRoom(id, data));
    setLoading(false);

    if (res.statusText !== "OK") return setError("Cannot save room");

    setError("");

    fetchRoom();
  };

  return (
    <div>
      <div className="col-md-12">
        <div className="card card-container">
          <Form onSubmit={() => save()}>
            {id === "" ? <h1>Creat Room</h1> : <h1>Edit Room</h1>}
            <div>
              <label htmlFor="roomNumber">Room Number</label>
              <Input
                type="text"
                className="form-control"
                name="roomNumber"
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="roomType">Room Type</label>
              <select
                className="form-control"
                name="roomType"
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
              >
                <option>Fever, Cough, Difficulty breathing,...</option>
                <option>No Symptoms</option>
                <option>Good</option>
              </select>
            </div>
            <div>
              <label htmlFor="bedCounts">Bed Counts</label>
              <Input
                type="text"
                className="form-control"
                name="bedCounts"
                value={bedCounts}
                onChange={(e) => setBedCounts(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="available">Available</label>
              <Input
                type="text"
                className="form-control"
                name="available"
                value={available}
                onChange={(e) => setAvailable(e.target.value)}
              />
            </div>
            {id === "" ? (
              <Button size="small" color="primary" onClick={() => save()}>
                Create
              </Button>
            ) : (
              <Button size="small" color="primary" onClick={() => save()}>
                Edit
              </Button>
            )}
          </Form>
        </div>
      </div>

      {loading && <Loader />}
      {error && <Alert variant="danger">{error}</Alert>}

      <SearchTable
        data={rooms}
        columnsName={columnsName}
        columnsData={columnsData}
        handleDelete={handleDelete}
        handleView={handleEdit}
      />
    </div>
  );
}
