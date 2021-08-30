import React, { Component } from "react";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { withStyles, makeStyles } from "@material-ui/core/styles";
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

const url = "http://localhost:8080/rooms";

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
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
export default function RoomList() {
  const [rooms, setRooms] = useState([]);
  const [id, setId] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [roomType, setRoomType] = useState("");
  const [bedCounts, setBedCounts] = useState(0);
  const [available, setAvailable] = useState(0);

  const fetchRoom = () => {
    fetch(url)
      .then((res) => res.json())
      .then((json) => setRooms(json));
  };

  useEffect(() => {
    fetchRoom();
  }, []);
  const handleEdit = (id, rNumber, rType, bCounts, avai) => {
    setId(id);
    setRoomNumber(rNumber);
    setRoomType(rType);
    setBedCounts(bCounts);
    setAvailable(avai);
  };

  const handleDelete = (id) => {
    fetch(url + "/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    }).then((data) => fetchRoom());
  };

  const save = () => {
    if (id === "") {
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roomNumber: roomNumber,
          roomType: roomType,
          bedCounts: bedCounts,
          available: available,
        }),
      }).then((data) => fetchRoom());
    } else {
      fetch(url + "/" + id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roomNumber: roomNumber,
          roomType: roomType,
          bedCounts: bedCounts,
          available: available,
        }),
      }).then((data) => fetchRoom());
    }
  };

  return (
    <div>
      <div className="col-md-12">
        <div className="card card-container">
          <Form onSubmit={() => save()}>
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
                <option>No sys</option>
                <option>Sys</option>
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
              <label htmlFor="roomNumber">Available</label>
              <Input
                type="text"
                className="form-control"
                name="available"
                value={available}
                onChange={(e) => setAvailable(e.target.value)}
              />
            </div>
            <Button size="small" color="primary" onClick={() => save()}>
              {" "}
              Edit
            </Button>
          </Form>
        </div>
      </div>

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
