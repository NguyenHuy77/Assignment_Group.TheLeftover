import React, { Component } from "react";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "@material-ui/core/Button";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { useParams } from "react-router-dom";
import {TestTable } from "./testTable";

const url = "/patients";
const url1="/rooms"

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
    const [relationNumber,setRelationNumber] = useState();
    const [role,setRole]=useState("View")
    const [rooms,setRooms] = useState([]);
    const [room,setRoom] = useState([]);


    let {id} = useParams()

    const fetchPatient = () =>{
     fetch(url+'/'+id)
      .then((res) => res.json())
      .then((json) => setPatient(json))
    }
    
    const changePatient = () =>{
        setRole("Edit")
        setName(patient.patientName);
        setAge(patient.age);
        setNationalID(patient.nationalID);
        setAddress(patient.address);
        setDay(patient.day);
        setSymptoms(patient.symptoms);
        setHealthStatus(patient.healthStatus);
        setProcession(patient.procession)
        setRelationNumber(patient.relationNumber)
        setRoom(patient.roomNumber)
    }
    const save = () => {
          fetch(url + "/" + id, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              patientName:name,
              age:age,
              nationalID:nationalID,
              address:address,
              relationNumber : relationNumber,
              day:day,
              symptoms:symptoms,
              roomNumber:room,
              healthStatus:healthStatus,
              procession:procession
            }),
          }).then((data) => fetchPatient());
      };
    const fetchRoom = () =>{
        fetch(url1)
        .then(res => res.json())
        .then(json => setRooms(json))
      }
  
    useEffect(()=>{fetchRoom()},[])
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
                          value={(role==="Edit")?(name):(patient.patientName)}
                          onChange={(e) => setName(e.target.value)}
                        />
                        <label htmlFor="age">Age</label>
                        <Input
                          type="text"
                          className="form-control"
                          name="age"
                          value={(role==="Edit")?(age):(patient.age)}
                          onChange={(e) => setAge(e.target.value)}
                        />
                        <label htmlFor="age">National ID</label>
                        <Input
                          type="text"
                          className="form-control"
                          name="nationalID"
                          value={(role==="Edit")?(nationalID):(patient.nationalID)}
                          onChange={(e) => setNationalID(e.target.value)}
                        />
                        <label htmlFor="age">Address</label>
                        <Input
                          type="text"
                          className="form-control"
                          name="address"
                          value={(role==="Edit")?(address):(patient.address)}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                        <label htmlFor="age">Relation Number</label>
                        <Input
                          type="text"
                          className="form-control"
                          name="relationNumber"
                          value={relationNumber}
                          onChange={(e) => setRelationNumber(e.target.value)}
                        />
                        <label htmlFor="age">Day</label>
                        <Input
                          type="text"
                          className="form-control"
                          name="day"
                          value={(role==="Edit")?(day):(patient.day)}
                          onChange={(e) => setDay(e.target.value)}
                        />
                        <div><label htmlFor="age">Symptom</label>
                        <select
                            className="form-control"
                            name="symptoms"
                            value={(role==="Edit")?(symptoms):(patient.symptoms)}
                            onChange={(e) => setSymptoms(e.target.value)}
                        >
                          <option>Fever, Cough, Difficulty breathing,...</option>
                          <option>No Symptoms</option>
                          <option>Good</option>
                        </select>
                        </div>
                        <label htmlFor="">Room</label>
                        <select
                            className="form-control"
                            name="room"
                            value={(role==="Edit")?(room):(patient.roomNumber)}
                            onChange={(e) => setRoom(e.target.value)}
                        >
                        {rooms.map((room)=>(
                          ((room.available>0)&&(room.romType===symptoms))&&(
                            <option>{room.roomNumber}</option>
                          )
                        ))}
                        </select>
                        <label htmlFor="age">Health Status</label>
                        <Input
                          type="text"
                          className="form-control"
                          name="healthStatus"
                          value={(role==="Edit")?(healthStatus):(patient.healthStatus)}
                          onChange={(e) => setHealthStatus(e.target.value)}
                        />
                        <label htmlFor="age">Procession</label>
                        <Input
                          type="text"
                          className="form-control"
                          name="procession"
                           value={(role==="Edit")?(procession):(patient.procession)}
                          onChange={(e) => setProcession(e.target.value)}
                        />
                    {(role==="View")?( 
                      <Button  size="small" color="primary" onClick={() => changePatient()}>
                      Edit
                      </Button>)
                      :( 
                      <Button  size="small" color="primary" onClick={() => save()}>
                      Save
                      </Button>)}
                    </Form>
                </div>
            </div>
            <TestTable id={id}/>
        </div>
    )
}