import { Link } from "react-router-dom";
import logo from "./resources/logo.png";

function Header({ user, logOut }) {
  return (
    <div>
      <header id="header" className="top">
        <div className="container d-flex align-items-center justify-content-between">
          <Link to={"/home"} className="logo">
            <img src={logo} alt="" className="img-fluid" />
          </Link>

          <nav id="navbar" className="navbar">
            <ul>
              <li>
                <Link className="nav-link scrollto active" to={"/home"}>
                  Home
                </Link>
              </li>
              {user ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link scrollto" to={"/profile"}>
                      Profile
                    </Link>
                  </li>
                  {(user.username==="admin")?(
                    <li className="nav-item">
                    <Link className="nav-link scrollto" to={"/calendar"}>
                      Calendar
                    </Link>
                  </li>):(
                    <li className="nav-item">
                    <Link className="nav-link scrollto" to={`/schedule/${user._id}`}>
                      Schedule
                    </Link>
                  </li>)}
                  {(user.username==="admin")&&( 
                    <li className="nav-item">
                    <Link className="nav-link scrollto" to={"/user"}>
                      Users
                    </Link>
                  </li>)}
                  {(user.username==="admin")&&( 
                    <li className="nav-item">
                    <Link className="nav-link scrollto" to={"/room"}>
                      Rooms
                    </Link>
                  </li>)}
                 
                  <li className="dropdown">
                    <a to="#">
                      <span>Patients</span>{" "}
                      <i className="bi bi-chevron-down"></i>
                    </a>
                    <ul>
                      <li>
                        <Link to={"/patient/create"}>Add New Patient</Link>
                      </li>
                      <li>
                        <Link to={"/patient"}>Patient List</Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link
                      className="loginbutton scrollto"
                      to={"/login"}
                      onClick={logOut}
                    >
                      Log out
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link className="loginbutton scrollto" to={"/login"}>
                      Log in
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
}

export default Header;
