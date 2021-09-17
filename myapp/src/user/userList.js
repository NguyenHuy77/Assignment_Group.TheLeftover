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
import Register from "../components/adminRegister";
import usersApi from "../api/users";
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

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [nationalID, setNationalID] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [workPlace, setWorkPlace] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    setError("");

    setLoading(true);
    const res = await usersApi.getUsers();
    setLoading(false);

    if (res.statusText !== "OK") return setError("Error when fetching users");

    setError("");
    setUsers(res.data);
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
    role
  ) => {
    setId(id);
    setName(name);
    setNationalID(nationalID);
    setPhoneNumber(phoneNumber);
    setWorkPlace(workPlace);
    setUserName(username);
    setEmail(email);
    setRole(role);
  };

  const handleDelete = async (id) => {
    setError("");

    setLoading(true);
    const res = await usersApi.deleteUser(id);
    setLoading(false);

    if (res.statusText !== "OK") return setError("Cannot delete user");

    setError("");

    fetchUser();
  };

  const save = async () => {
    const data = {
      name: name,
      nationalID: nationalID,
      phoneNumber: phoneNumber,
      workPlace: workPlace,
      username: username,
      email: email,
      role: role,
    };

    setError("");

    setLoading(true);
    const res = await (id === ""
      ? usersApi.postUser(data)
      : usersApi.patchUser(id, data));
    setLoading(false);

    if (res.statusText !== "OK") return setError("Cannot save user");

    setError("");

    fetchUser();
  };

  return (
    <div>
      <div className="col-md-12">
        <div className="card card-container">
          {id === "" ? (
            <Register />
          ) : (
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

      {loading && <Loader />}
      {error && <Alert variant="danger">{error}</Alert>}

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
