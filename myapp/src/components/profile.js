import React, { Component } from "react";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "@material-ui/core/Button";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { useParams } from "react-router-dom";
import Register from "../components/adminRegister";
import { Redirect } from "react-router-dom";
import authService from "../services/auth.service";

const url = "http://localhost:8080/users";

export function Profile() {
  const [user, setUser] = useState([]);
  const [name, setName] = useState();
  const [nationalID, setNationalID] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [workPlace, setWorkPlace] = useState();
  const [username, setUserName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [role, setRole] = useState();

  const currentUser = authService.getCurrentUser();

  let { _id } = useParams();

  const fetchUser = () => {
    fetch(url + "/" + _id)
      .then((res) => res.json())
      .then((json) => setUser(json));
  };

  const changeUser = () => {
    setName(user.name);
    setNationalID(user.nationalID);
    setPhoneNumber(user.phoneNumber);
    setWorkPlace(user.workPlace);
    setUserName(user.username);
    setEmail(user.email);
    setPassword(user.password);
    setRole(user.role);
  };
  const save = () => {
    fetch(url + "/" + _id, {
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
  };

  useEffect(() => {
    fetchUser();
  });

  return (
    <div>
      <div className="col-md-12">
        <div className="card card-container">
          <h1>Edit User</h1>
          {_id === "" ? (
            <Redirect />
          ) : (
            <Form onSubmit={() => save()}>
              <div>
                <label htmlFor="name">Name</label>
                <Input
                  type="text"
                  className="form-control"
                  name="name"
                  value={currentUser.name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="nationalID">National ID</label>
                <Input
                  type="text"
                  className="form-control"
                  name="nationalID"
                  value={currentUser.nationalID}
                  onChange={(e) => setNationalID(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="phonenumber">Phone Number</label>
                <Input
                  type="text"
                  className="form-control"
                  name="phonenumber"
                  value={currentUser.phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="workplace">Work Place</label>
                <Input
                  type="text"
                  className="form-control"
                  name="workplace"
                  value={currentUser.workPlace}
                  onChange={(e) => setWorkPlace(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="role">Role</label>
                <Input
                  type="text"
                  className="form-control"
                  name="role"
                  value={currentUser.role}
                  onChange={(e) => setRole(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="username">Username</label>
                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  value={currentUser.username}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={currentUser.email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <Input
                  type="text"
                  className="form-control"
                  name="password"
                  value={currentUser.password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form-group">
                <button
                  className="btn btn-primary btn-block"
                  onClick={() => changeUser()}
                >
                  Update
                </button>
              </div>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
}
