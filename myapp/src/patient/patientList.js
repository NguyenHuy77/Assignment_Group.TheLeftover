import React from 'react';
import { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Switch, Route, Link } from "react-router-dom";


const url="http://localhost:8080/patients"


export default function PatientList (){

const [patients,setPatients] = useState([])

const fetchPatient = () =>{
  fetch(url).then(res => res.json())
  .then(json => setPatients(json))
}

useEffect(()=>{
  fetchPatient()
})

const handleDelete = (id) =>{
  fetch(url+"/"+id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: id})
}).then(data => fetchPatient())

}
  return (
    <div>
    {patients.map((patient) =>(
    <Card style={{width:180}} key={patient._id}>
      <CardActionArea>
        <CardMedia
         component="img"
         image="/resources/staff.png"
         height="140"
        />
        <CardContent >
          <Typography gutterBottom variant="h5" component="h2">
            {patient.patientName}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
           Age: {patient.age}
          </Typography>
        </CardContent>
      
       
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
                  <Link to={`/rooms/${patient._id}`} >
                      View
                  </Link>
        </Button>
        <Button size="small" color="primary" onClick={()=> handleDelete(patient._id)}>
          Delete
        </Button>
      </CardActions>
    </Card>
      ))}
    </div>
    
  );
}
