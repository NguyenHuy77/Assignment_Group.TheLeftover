import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login";
import Register from "./components/adminRegister";
import Home from "./components/home";

import AuthVerify from "./authorize-verify";
import EventBus from "./event-bus";

import RoomList from "./room/roomList";
import PatientList from "./patient/patientList";
import { PatientDetail } from "./patient/patientDetail";
import { PatientCreate } from "./patient/patientCreate";
import User from "./user/userList";
import Calendar from "./calendar";
import { Profile } from "./components/profile";
import { UserSchedule } from "./user/userSchedule";
import Footer from "./components/Footer";
import Header from "./components/Header";

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
        <div className="body mb-2">
          <Header user={currentUser} logOut={this.logOut} />
          <div className="container-fluid mt-3 main">
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
              <Route path={`/schedule/:id`}>
                {" "}
                <UserSchedule />
              </Route>
            </Switch>
          </div>
        </div>

        <AuthVerify logOut={this.logOut} />
        <Footer />
      </div>
    );
  }
}

export default App;
