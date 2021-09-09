import React, { Component } from "react";

import UserService from "../services/user.service";
import HomeDesign from "./homeDesign";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      (response) => {
        this.setState({
          content: response.data,
        });
      },
      (error) => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString(),
        });
      }
    );
  }

  render() {
    return (
      <div className="container">
        
        {(this.state.content === "Public Content.")?(<HomeDesign/>):(<h3>{this.state.content}</h3>)}
        
      </div>
    );
  }
}
