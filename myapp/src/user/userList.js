import React from "react";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "@material-ui/core/Button";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Register from "../components/adminRegister";
import usersApi from "../api/users";
import Loader from "../components/Loader";
import { Alert } from "react-bootstrap";
import SearchTable from "../search/SearchTable";

const columnsName = [
  "Name",
  "National ID",
  "Phone Number",
  "Work Place",
  "Username",
  "Email",
  "Role",
];
const columnsData = [
  "name",
  "nationalID",
  "phoneNumber",
  "workPlace",
  "username",
  "email",
  "role",
];

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

  const handleEdit = (item) => {
    setId(item._id);
    setName(item.name);
    setNationalID(item.nationalID);
    setPhoneNumber(item.phoneNumber);
    setWorkPlace(item.workPlace);
    setUserName(item.username);
    setEmail(item.email);
    setRole(item.role);
  };

  const handleDelete = async (item) => {
    setError("");

    setLoading(true);
    const res = await usersApi.deleteUser(item._id);
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

      <SearchTable
        data={users}
        columnsName={columnsName}
        columnsData={columnsData}
        handleDelete={handleDelete}
        handleView={handleEdit}
      />
    </div>
  );
}
