import React, { Component } from "react";
import { useState, useEffect } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

const url="http://localhost:8080/rooms"
export default function RoomDetail (props){

    const [room,setRoom] = useState([])
    const [id,setID] = useState("")

    const fetchRoom = (id) =>{
        fetch(url+'/'+id).then(res => res.json())
        .then(json => setRoom(json))
    }
    setID(props.id)
    useEffect(()=>{
        if (id !== ""){fetchRoom(id)}
    })
    return(
        <div className="col-md-12">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <Form
            //onSubmit={this.handleLogin}
            ref={(c) => {
              this.form = c;
            }}
          >
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <Input
                type="text"
                className="form-control"
                name="username"
                //value={this.state.username}
                //onChange={this.onChangeUsername}
                //validations={[required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Input
                type="password"
                className="form-control"
                name="password"
                //value={this.state.password}
                //onChange={this.onChangePassword}
                //validations={[required]}
              />
            </div>

            <div className="form-group">
              <button
                className="btn btn-primary btn-block"
                //disabled={this.state.loading}
              >
                
                <span>Login</span>
              </button>
            </div>

            
            <CheckButton
              style={{ display: "none" }}
              ref={(c) => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    )
}