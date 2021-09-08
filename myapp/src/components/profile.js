// import React, { Component } from "react";
// import Form from "react-validation/build/form";
// import Input from "react-validation/build/input";
// import CheckButton from "react-validation/build/button";
// import { isEmail } from "validator";
// import { Redirect } from "react-router-dom";
// import AuthService from "../services/auth.service";

// const required = (value) => {
//   if (!value) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         This field is required!
//       </div>
//     );
//   }
// };

// const name = (value) => {
//   if (
//     !value.match(
//       /^(([A-Za-z]+[-']?)*([A-Za-z]+)?\s)+([A-Za-z]+[-']?)*([A-Za-z]+)?$/
//     )
//   ) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         The name is invalid.
//       </div>
//     );
//   }
// };

// const nationalID = (value) => {
//   if (!value.match(/^([0-9]{9})|^([0-9]{12})/)) {
//     // accepts both the old 9 digits and new 12 digits Vietnamese national ID
//     return (
//       <div className="alert alert-danger" role="alert">
//         The National ID is invalid.
//       </div>
//     );
//   }
// };

// const phoneNumber = (value) => {
//   if (!value.match(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/)) {
//     //regex for Vietnamese phone number
//     return (
//       <div className="alert alert-danger" role="alert">
//         The Phone Number is invalid.
//       </div>
//     );
//   }
// };

// const workPlace = (value) => {
//   if (
//     !value.match(
//       /^(([A-Za-z]+[-']?)*([A-Za-z]+)?\s)+([A-Za-z]+[-']?)*([A-Za-z]+)?$/
//     )
//   ) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         The Workplace's name is invalid.
//       </div>
//     );
//   }
// };

// const email = (value) => {
//   if (!isEmail(value)) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         This is not a valid email.
//       </div>
//     );
//   }
// };

// const username = (value) => {
//   if (!value.match(/^[a-zA-Z0-9]+$/)) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         The username is invalid.
//       </div>
//     );
//   }
// };

// const password = (value) => {
//   if (value.length < 6 || value.length > 40) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         The password must be between 6 and 40 characters.
//       </div>
//     );
//   }
// };

// const role = (value) => {
//   if (!value === ("Nurse" | "Doctor" | "nurse" | "doctor")) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         Role must be Nurse or Doctor.
//       </div>
//     );
//   }
// };

// export default class Profile extends Component {
//   constructor(props) {
//     super(props);

//     this.handleRegister = this.handleRegister.bind(this);
//     this.onChangeName = this.onChangeName.bind(this);
//     this.onChangeNationalid = this.onChangeNationalid.bind(this);
//     this.onChangePhonenumber = this.onChangePhonenumber.bind(this);
//     this.onChangeWorkplace = this.onChangeWorkplace.bind(this);
//     this.onChangeUsername = this.onChangeUsername.bind(this);
//     this.onChangeEmail = this.onChangeEmail.bind(this);
//     this.onChangePassword = this.onChangePassword.bind(this);
//     this.onChangeRole = this.onChangeRole.bind(this);
//     this.state = {
//       redirect: null,
//       userReady: false,
//       currentUser: { username: "" },
//       successful: false,
//       message: "",
//     };
//   }

//   componentDidMount() {
//     const currentUser = AuthService.getCurrentUser();

//     if (!currentUser) this.setState({ redirect: "/home" });
//     this.setState({ currentUser: currentUser, userReady: true });
//   }

//   onChangeName(e) {
//     this.setState({
//       name: e.target.value,
//     });
//   }

//   onChangeNationalid(e) {
//     this.setState({
//       nationalID: e.target.value,
//     });
//   }

//   onChangePhonenumber(e) {
//     this.setState({
//       phoneNumber: e.target.value,
//     });
//   }

//   onChangeWorkplace(e) {
//     this.setState({
//       workPlace: e.target.value,
//     });
//   }

//   onChangeRole(e) {
//     this.setState({
//       role: e.target.value,
//     });
//   }

//   onChangeUsername(e) {
//     this.setState({
//       username: e.target.value,
//     });
//   }

//   onChangeEmail(e) {
//     this.setState({
//       email: e.target.value,
//     });
//   }

//   onChangePassword(e) {
//     this.setState({
//       password: e.target.value,
//     });
//   }

//   handleRegister(e) {
//     e.preventDefault();

//     this.setState({
//       message: "",
//       successful: false,
//     });

//     this.form.validateAll();

//     if (this.checkBtn.context._errors.length === 0) {
//       AuthService.register(
//         this.state.name,
//         this.state.nationalID,
//         this.state.phoneNumber,
//         this.state.workPlace,
//         this.state.role,
//         this.state.username,
//         this.state.email,
//         this.state.password
//       ).then(
//         (response) => {
//           this.setState({
//             message: response.data.message,
//             successful: true,
//           });
//         },
//         (error) => {
//           const resMessage =
//             (error.response &&
//               error.response.data &&
//               error.response.data.message) ||
//             error.message ||
//             error.toString();

//           this.setState({
//             successful: false,
//             message: resMessage,
//           });
//         }
//       );
//     }
//   }

//   render() {
//     if (this.state.redirect) {
//       return <Redirect to={this.state.redirect} />;
//     }

//     const { currentUser } = this.state;

//     return (
//       <div className="col-md-12">
//         <div className="card card-container">
//           <img
//             src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
//             alt="profile-img"
//             className="profile-img-card"
//           />

//           <Form
//             onSubmit={this.handleRegister}
//             ref={(c) => {
//               this.form = c;
//             }}
//           >
//             {!this.state.successful && this.state.userReady ? (
//               <div>
//                 <div className="form-group">
//                   <label htmlFor="name">Name</label>
//                   <Input
//                     type="text"
//                     className="form-control"
//                     name="name"
//                     value={currentUser.name}
//                     onChange={this.onChangeName}
//                     validations={[required, name]}
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="nationalid">National ID</label>
//                   <Input
//                     type="text"
//                     className="form-control"
//                     name="nationalid"
//                     value={currentUser.nationalID}
//                     onChange={this.onChangeNationalid}
//                     validations={[required, nationalID]}
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="phonenumber">Phone Number</label>
//                   <Input
//                     type="text"
//                     className="form-control"
//                     name="phonenumber"
//                     value={currentUser.phoneNumber}
//                     onChange={this.onChangePhonenumber}
//                     validations={[required, phoneNumber]}
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="workplace">Main place of work</label>
//                   <Input
//                     type="text"
//                     className="form-control"
//                     name="workplace"
//                     value={currentUser.workPlace}
//                     onChange={this.onChangeWorkplace}
//                     validations={[required, workPlace]}
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="role">Role</label>
//                   <Input
//                     type="text"
//                     className="form-control"
//                     name="role"
//                     value={currentUser.role}
//                     onChange={this.onChangeRole}
//                     validations={[required, role]}
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="username">Username</label>
//                   <Input
//                     type="text"
//                     className="form-control"
//                     name="username"
//                     value={currentUser.username}
//                     onChange={this.onChangeUsername}
//                     validations={[required, username]}
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="email">Email</label>
//                   <Input
//                     type="text"
//                     className="form-control"
//                     name="email"
//                     value={currentUser.email}
//                     onChange={this.onChangeEmail}
//                     validations={[required, email]}
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="password">Password</label>
//                   <Input
//                     type="password"
//                     className="form-control"
//                     name="password"
//                     value={currentUser.password}
//                     onChange={this.onChangePassword}
//                     validations={[required, password]}
//                   />
//                 </div>

//                 <div className="form-group">
//                   <button className="btn btn-primary btn-block">Update</button>
//                 </div>
//               </div>
//             ) : (
//               <CheckButton
//                 style={{ display: "none" }}
//                 ref={(c) => {
//                   this.checkBtn = c;
//                 }}
//               />
//             )}
//           </Form>
//         </div>
//       </div>
//     );
//   }
// }

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
