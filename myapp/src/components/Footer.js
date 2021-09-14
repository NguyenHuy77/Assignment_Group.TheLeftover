import React from "react";
import "./css/style.css";

export default class Footer extends React.Component {
  render() {
    return (
      <div>
        <footer id="footer">
          <div className="footer-top">
            <div className="container">
              <div className="row">
                <div className="col-lg-4 col-md-6 footer-contact">
                  <h3>Covid Treatment</h3>
                  <p>
                    555 Su Van Hanh, Ward 10, District 11 <br />
                    Ho Chi Minh city
                    <br />
                    Viet Nam <br />
                    <br />
                    <strong>Phone:</strong> 0282.115.115
                    <br />
                    <strong>Email:</strong> isolatedareas@gmail.com
                    <br />
                  </p>
                </div>

                <div className="col-lg-3 col-md-6 footer-links">
                  <h4>Our Services</h4>
                  <ul>
                    <li>
                      <i className="bx bx-chevron-right"></i> <a href="#">Home</a>
                    </li>
                    <li>
                      <i className="bx bx-chevron-right"></i>{" "}
                      <a href="#">About us</a>
                    </li>
                    <li>
                      <i className="bx bx-chevron-right"></i>{" "}
                      <a href="#">Services</a>
                    </li>
                    <li>
                      <i className="bx bx-chevron-right"></i>{" "}
                      <a href="#">Terms of service</a>
                    </li>
                    <li>
                      <i className="bx bx-chevron-right"></i>{" "}
                      <a href="#">Privacy policy</a>
                    </li>
                  </ul>
                </div>

                <div className="col-lg-2 col-md-6 footer-links">
                  <h4>Other Links</h4>
                  <ul>
                    <li>
                      <i className="bx bx-chevron-right"></i> <a href="#">News</a>
                    </li>
                    <li>
                      <i className="bx bx-chevron-right"></i> <a href="#">Login</a>
                    </li>
                    <li>
                      <i className="bx bx-chevron-right"></i>{" "}
                      <a href="#">Register</a>
                    </li>
                    <li>
                      <i className="bx bx-chevron-right"></i>{" "}
                      <a href="#">Forgot Password?</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}
