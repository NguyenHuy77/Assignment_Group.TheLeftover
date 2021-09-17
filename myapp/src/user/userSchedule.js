import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/style.css"
import { useParams } from "react-router-dom";

export function UserSchedule(){
    const url = "/events";
    const [schedule,setSchedule]=useState([])
    let {id}=useParams()

    const fetchSchedule =() => {
        fetch(url+"/user/"+id)
        .then((res) => res.json())
        .then((json) => setSchedule(json))
    }

    useEffect(() =>{
        fetchSchedule();
        console.log(schedule)
    })
    return(
    <div>
    <div className= "container col-sm-9">
	<table className="table table-bordered table-hover">
	  <thead className="thead-primary">
	    <tr>
	      <th scope="col">#</th>
	      <th scope="col">Room</th>
	      <th scope="col">Doctor</th>
	      <th scope="col">Time</th>
	    </tr>
	  </thead>
	  <tbody>
      {(schedule !== []) && (schedule.map((e,index) => (
        <tr key={e.userID}>
	      <th scope="row">{index+1}</th>
	      <td>{e.room}</td>
	      <td>{e.userID}</td>
	      <td>{e.date}</td>
	    </tr>
      )))}
        
	  </tbody>
	</table>
    </div>
    </div>
    )
}