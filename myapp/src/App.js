import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login";
import Register from "./components/register";
import Home from "./components/home";
import Profile from "./components/profile";

import AuthVerify from "./authorize-verify";
import EventBus from "./event-bus";

import RoomList from "./room/roomList";
import PatientList from "./patient/patientList";
import { PatientDetail } from "./patient/patientDetail";
import { PatientCreate } from "./patient/patientCreate";
import Footer from "./footer";
import User from "./user/userList";
import Calendar from "./calendar/index";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
      });
    }

    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Covid Management
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>

            {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  User
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              {currentUser.username === "admin" && (
                <li className="nav-item">
                  <Link to={"/room"} className="nav-link">
                    Room
                  </Link>
                </li>
              )}
              <li className="nav-item">
                <Link to={"/patient"} className="nav-link">
                  Patient
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/patient/create"} className="nav-link">
                  Creat Patient Information
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/user" component={User} />
            <Route exact path="/calendar" component={Calendar} />
            <Route exact path="/room" component={RoomList} />
            <Route exact path="/patient" component={PatientList} />
            <Route exact path="/patient/create" component={PatientCreate} />
            <Route path={`/patient/:id`}>
              {" "}
              <PatientDetail />
            </Route>
          </Switch>
        </div>

        <AuthVerify logOut={this.logOut} />
        <Footer />
      </div>
    );
  }
}

export default App;
