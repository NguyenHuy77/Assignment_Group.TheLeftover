import React, { Component } from "react";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "@material-ui/core/Button";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { useParams } from "react-router-dom";

const url = "http://localhost:8080/patients";
export function PatientDetail (){
    const [patient, setPatient] = useState([]);
    const [name,setName] = useState('')
    const [age,setAge] = useState()
  
    let {id} = useParams()

    const fetchPatient = () =>{
     fetch(url+'/'+id)
      .then((res) => res.json())
      .then((json) => setPatient(json))
      .then(()=>{changePatient()});
    }
    
    const changePatient = () =>{
        setName(patient.patientName);
        setAge(patient.age);

    }
    const save = () => {
        if (id === "") {
          fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
            }),
          }).then((data) => fetchPatient());
        } else {
          fetch(url + "/" + id, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
            }),
          }).then((data) => fetchPatient());
        }
      };
    
    useEffect(() => {
      fetchPatient()})
    return(
        <div>
             <div className="col-md-12">
                <div className="card card-container">
                    <Form>
                       <label htmlFor="name">Patient Name</label>
                        <Input
                          type="text"
                          className="form-control"
                          name="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                    </Form>
                </div>
            </div>
        </div>
    )
}