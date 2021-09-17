import React from "react";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import roomsApi from "../api/rooms";
import Loader from "../components/Loader";
import { Alert } from "react-bootstrap";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

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

  const handleEdit = (id, rNumber, rType, bCounts, available) => {
    setId(id);
    setRoomNumber(rNumber);
    setRoomType(rType);
    setBedCounts(bCounts);
    setAvailable(available);
  };

  const handleDelete = async (id) => {
    setError("");

    setLoading(true);
    const res = await roomsApi.deleteRoom(id);
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

      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Room Number</StyledTableCell>
              <StyledTableCell align="right">Room Type</StyledTableCell>
              <StyledTableCell align="right">Bed Count</StyledTableCell>
              <StyledTableCell align="right">Available</StyledTableCell>
              <StyledTableCell align="right">View</StyledTableCell>
              <StyledTableCell align="right">Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rooms.map((room) => (
              <StyledTableRow key={room.roomNumber}>
                <StyledTableCell component="th" scope="row">
                  {room.roomNumber}
                </StyledTableCell>
                <StyledTableCell align="right">{room.roomType}</StyledTableCell>
                <StyledTableCell align="right">
                  {room.bedCounts}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {room.available}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Button
                    size="small"
                    color="primary"
                    onClick={() =>
                      handleEdit(
                        room._id,
                        room.roomNumber,
                        room.roomType,
                        room.bedCounts,
                        room.available
                      )
                    }
                  >
                    {" "}
                    View
                  </Button>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => handleDelete(room._id)}
                  >
                    {" "}
                    Delete
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
