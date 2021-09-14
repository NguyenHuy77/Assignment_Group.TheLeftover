import React, { Component } from "react";
import { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
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
import Register from "../components/adminRegister";

const url = "/users";

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
export default function UserList() {
  const [users, setUsers] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [nationalID, setNationalID] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [workPlace, setWorkPlace] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const fetchUser = () => {
    fetch(url)
      .then((res) => res.json())
      .then((json) => setUsers(json));
  };

  useEffect(() => {
    fetchUser();
  }, []);
  const handleEdit = (
    id,
    name,
    nationalID,
    phoneNumber,
    workPlace,
    username,
    email,
    password,
    role
  ) => {
    setId(id);
    setName(name);
    setNationalID(nationalID);
    setPhoneNumber(phoneNumber);
    setWorkPlace(workPlace);
    setUserName(username);
    setEmail(email);
    setPassword(password);
    setRole(role);
  };

  const handleDelete = (id) => {
    fetch(url + "/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    }).then((data) => fetchUser());
  };

  const save = () => {
    if (id === "") {
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          nationalID: nationalID,
          phoneNumber: phoneNumber,
          workPlace: workPlace,
          username: username,
          email: email,
          password: password,
          role: role,
        }),
      }).then((data) => fetchUser());
    } else {
      fetch(url + "/" + id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          nationalID: nationalID,
          phoneNumber: phoneNumber,
          workPlace: workPlace,
          username: username,
          email: email,
          password: password,
          role: role,
        }),
      }).then((data) => fetchUser());
    }
  };

  return (
    <div>
      <div className="col-md-12">
        <div className="card card-container">
          {(id==="")?(<Register/>):(
            <Form onSubmit={() => save()}>
            <div>
              <label htmlFor="name">Name</label>
              <Input
                type="text"
                className="form-control"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="nationalID">National ID</label>
              <Input
                type="text"
                className="form-control"
                name="nationalID"
                value={nationalID}
                onChange={(e) => setNationalID(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="phonenumber">Phone Number</label>
              <Input
                type="text"
                className="form-control"
                name="phonenumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="workplace">Work Place</label>
              <Input
                type="text"
                className="form-control"
                name="workplace"
                value={workPlace}
                onChange={(e) => setWorkPlace(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="username">Username</label>
              <Input
                type="text"
                className="form-control"
                name="username"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <Input
                type="text"
                className="form-control"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <Input
                type="text"
                className="form-control"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="role">Role</label>
              <Input
                type="text"
                className="form-control"
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
            </div>
            <Button size="small" color="primary" onClick={() => save()}>
              {" "}
              Edit
            </Button>
          </Form>
          )}
          
        </div>
      </div>

      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">National ID</StyledTableCell>
              <StyledTableCell align="right">Phone Number</StyledTableCell>
              <StyledTableCell align="right">Work Place</StyledTableCell>
              <StyledTableCell align="right">Username</StyledTableCell>
              <StyledTableCell align="right">Email</StyledTableCell>
              <StyledTableCell align="right">Role</StyledTableCell>
              <StyledTableCell align="right">View</StyledTableCell>
              <StyledTableCell align="right">Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <StyledTableRow key={user.username}>
                <StyledTableCell component="th" scope="row">
                  {user.name}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {user.nationalID}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {user.phoneNumber}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {user.workPlace}
                </StyledTableCell>
                <StyledTableCell align="right">{user.username}</StyledTableCell>
                <StyledTableCell align="right">{user.email}</StyledTableCell>
                <StyledTableCell align="right">{user.role}</StyledTableCell>
                <StyledTableCell align="right">
                  <Button
                    size="small"
                    color="primary"
                    onClick={() =>
                      handleEdit(
                        user._id,
                        user.name,
                        user.nationalID,
                        user.phoneNumber,
                        user.workPlace,
                        user.username,
                        user.email,
                        user.password,
                        user.role
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
                    onClick={() => handleDelete(user._id)}
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
