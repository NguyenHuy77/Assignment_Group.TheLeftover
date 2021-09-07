import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/style.css"
import { render } from "@testing-library/react";

export default class Footer extends React.Component{
    render() {
        return(
            <div>
                <footer id="footer">
                    <div class="footer-top">
                        <div class="container">
                            <div class="row">

                                <div class="col-lg-4 col-md-6 footer-contact">
                                    <h3>Covid Treatment</h3>
                                    <p>
                                            555 Su Van Hanh, Ward 10, District 11 <br/>
                                            Ho Chi Minh city<br/>
                                            Viet Nam <br/><br/>
                                            <strong>Phone:</strong> 0282.115.115<br/>
                                            <strong>Email:</strong> isolatedareas@gmail.com<br/>
                                    </p>
                                </div>

                                <div class="col-lg-3 col-md-6 footer-links">
                                    <h4>Our Services</h4>
                                    <ul>
                                        <li><i class="bx bx-chevron-right"></i> <a href="#">Home</a></li>
                                        <li><i class="bx bx-chevron-right"></i> <a href="#">About us</a></li>
                                        <li><i class="bx bx-chevron-right"></i> <a href="#">Services</a></li>
                                        <li><i class="bx bx-chevron-right"></i> <a href="#">Terms of service</a></li>
                                        <li><i class="bx bx-chevron-right"></i> <a href="#">Privacy policy</a></li>
                                    </ul>
                                </div>

                                <div class="col-lg-2 col-md-6 footer-links">
                                    <h4>Other Links</h4>
                                    <ul>
                                        <li><i class="bx bx-chevron-right"></i> <a href="#">News</a></li>
                                        <li><i class="bx bx-chevron-right"></i> <a href="#">Login</a></li>
                                        <li><i class="bx bx-chevron-right"></i> <a href="#">Register</a></li>
                                        <li><i class="bx bx-chevron-right"></i> <a href="#">Forgot Password?</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        )
    }
}