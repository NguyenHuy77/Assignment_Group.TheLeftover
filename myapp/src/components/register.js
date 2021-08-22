import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import AuthService from "../services/auth.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const id = (value) => {
  if (!value.match(/^(?=.*[a-z])[a-z0-9]{8,20}$/i)) {
    //ID can't be all numeric, can't have special characters, at least 8 characters, at most 20 characters, can be all alphabetic and alphanumeric
    return (
      <div className="alert alert-danger" role="alert">
        The ID is not correct.
      </div>
    );
  }
};

const name = (value) => {
  if (
    !value.match(
      /^(([A-Za-z]+[-']?)*([A-Za-z]+)?\s)+([A-Za-z]+[-']?)*([A-Za-z]+)?$/
    )
  ) {
    return (
      <div className="alert alert-danger" role="alert">
        The name is invalid.
      </div>
    );
  }
};

const nationalID = (value) => {
  if (!value.match(/^([0-9]{9})|^([0-9]{12})/)) {
    // accepts both the old 9 digits and new 12 digits Vietnamese national ID
    return (
      <div className="alert alert-danger" role="alert">
        The National ID is invalid.
      </div>
    );
  }
};

const phoneNumber = (value) => {
  if (!value.match(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/)) {
    //regex for Vietnamese phone number
    return (
      <div className="alert alert-danger" role="alert">
        The Phone Number is invalid.
      </div>
    );
  }
};

const workPlace = (value) => {
  if (
    !value.match(
      /^(([A-Za-z]+[-']?)*([A-Za-z]+)?\s)+([A-Za-z]+[-']?)*([A-Za-z]+)?$/
    )
  ) {
    return (
      <div className="alert alert-danger" role="alert">
        The Workplace's name is invalid.
      </div>
    );
  }
};

const email = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const username = (value) => {
  if (!value.match(/^[a-zA-Z0-9]+$/)) {
    return (
      <div className="alert alert-danger" role="alert">
        The username is invalid.
      </div>
    );
  }
};

const password = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const role = (value) => {
  if (!value === ("Nurse" | "Doctor" | "nurse" | "doctor")) {
    return (
      <div className="alert alert-danger" role="alert">
        Role must be Nurse or Doctor.
      </div>
    );
  }
};

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeID = this.onChangeID.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeNationalid = this.onChangeNationalid.bind(this);
    this.onChangePhonenumber = this.onChangePhonenumber.bind(this);
    this.onChangeWorkplace = this.onChangeWorkplace.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeRole = this.onChangeRole.bind(this);
    this.state = {
      id: "",
      name: "",
      nationalID: "",
      phoneNumber: "",
      workPlace: "",
      username: "",
      email: "",
      password: "",
      role: "",
      successful: false,
      message: "",
    };
  }

  onChangeID(e) {
    this.setState({
      id: e.target.value,
    });
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onChangeNationalid(e) {
    this.setState({
      nationalID: e.target.value,
    });
  }

  onChangePhonenumber(e) {
    this.setState({
      phoneNumber: e.target.value,
    });
  }

  onChangeWorkplace(e) {
    this.setState({
      workPlace: e.target.value,
    });
  }

  onChangeRole(e) {
    this.setState({
      role: e.target.value,
    });
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false,
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.register(
        this.state.id,
        this.state.name,
        this.state.nationalID,
        this.state.phoneNumber,
        this.state.workPlace,
        this.state.role,
        this.state.username,
        this.state.email,
        this.state.password
      ).then(
        (response) => {
          this.setState({
            message: response.data.message,
            successful: true,
          });
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage,
          });
        }
      );
    }
  }

  render() {
    return (
      <div className="col-md-12">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <Form
            onSubmit={this.handleRegister}
            ref={(c) => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="id">ID</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="id"
                    value={this.state.id}
                    onChange={this.onChangeID}
                    validations={[required, id]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChangeName}
                    validations={[required, name]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="nationalid">National ID</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="nationalid"
                    value={this.state.nationalID}
                    onChange={this.onChangeNationalid}
                    validations={[required, nationalID]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phonenumber">Phone Number</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="phonenumber"
                    value={this.state.phoneNumber}
                    onChange={this.onChangePhonenumber}
                    validations={[required, phoneNumber]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="workplace">Main place of work</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="workplace"
                    value={this.state.workPlace}
                    onChange={this.onChangeWorkplace}
                    validations={[required, workPlace]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="role">Role</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="role"
                    value={this.state.role}
                    onChange={this.onChangeRole}
                    validations={[required, role]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    validations={[required, username]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    validations={[required, email]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    validations={[required, password]}
                  />
                </div>

                <div className="form-group">
                  <button className="btn btn-primary btn-block">Sign Up</button>
                </div>
              </div>
            )}

            {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={(c) => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}
