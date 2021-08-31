import React, { Component } from "react";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "@material-ui/core/Button";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { useParams } from "react-router-dom";
import { RelativeTable } from "./relativeTable";

const url = "http://localhost:8080/patients";


export function PatientDetail (){
    const [patient, setPatient] = useState([]);
    const [name,setName] = useState();
    const [age,setAge] = useState();
    const [nationalID,setNationalID] = useState();
    const [address,setAddress] =  useState();
    const [day,setDay] =  useState();
    const [symptoms,setSymptoms] =  useState();
    const [healthStatus,setHealthStatus] =  useState();
    const [procession,setProcession] =  useState();
    const [relationNumber,setRelationNumber] = useState()

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
        setNationalID(patient.nationalID);
        setAddress(patient.address);
        setDay(patient.day);
        setSymptoms(patient.symptoms);
        setHealthStatus(patient.healthStatus);
        setProcession(patient.procession)
        setRelationNumber(patient.relationNumber)
    }
    const save = () => {
          fetch(url + "/" + id, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              namePatient:name,
              age:age,
              nationalID:nationalID,
              address:address,
              day:day,
              symptoms:symptoms,
              healthStatus:healthStatus,
              procession:procession
            }),
          }).then((data) => fetchPatient());
      };

    useEffect(() => {
      fetchPatient()})
    return(
        <div>
             <div className="col-md-12">
                <div className="card card-container">
                <h1>Edit Patient</h1>
                    <Form>
                       <label htmlFor="name">Patient Name</label>
                        <Input
                          type="text"
                          className="form-control"
                          name="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                        <label htmlFor="age">Age</label>
                        <Input
                          type="text"
                          className="form-control"
                          name="age"
                          value={age}
                          onChange={(e) => setAge(e.target.value)}
                        />
                        <label htmlFor="age">National ID</label>
                        <Input
                          type="text"
                          className="form-control"
                          name="nationalID"
                          value={nationalID}
                          onChange={(e) => setNationalID(e.target.value)}
                        />
                        <label htmlFor="age">Address</label>
                        <Input
                          type="text"
                          className="form-control"
                          name="address"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                        <label htmlFor="age">Day</label>
                        <Input
                          type="text"
                          className="form-control"
                          name="day"
                          value={day}
                          onChange={(e) => setDay(e.target.value)}
                        />
                        <label htmlFor="age">Symptom</label>
                        <Input
                          type="text"
                          className="form-control"
                          name="symptoms"
                          value={symptoms}
                          onChange={(e) => setSymptoms(e.target.value)}
                        />
                        <label htmlFor="age">Health Status</label>
                        <Input
                          type="text"
                          className="form-control"
                          name="healthStatus"
                          value={healthStatus}
                          onChange={(e) => setHealthStatus(e.target.value)}
                        />
                        <label htmlFor="age">Procession</label>
                        <Input
                          type="text"
                          className="form-control"
                          name="procession"
                          value={procession}
                          onChange={(e) => setProcession(e.target.value)}
                        />
                    <Button  size="small" color="primary" onClick={() => save()}>
                    Edit
                    </Button>
                    </Form>
                </div>
            </div>
        </div>
    )
}