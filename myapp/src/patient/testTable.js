import React, { Component } from "react";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

const url = "https://assignment-091121.herokuapp.com/patients";
export function TestTable({id}) {
   let _id= id;

   const [patient, setPatient] = useState([]);
   const [testResults,setTestResults] = useState([])
   const [newResults,setNewResults] = useState([])
   const [idTest, setIdTest] = useState("");
   const [testDetail, setTestDetail] = useState({result : '', dateTest: '', testTime : '', nurse :''})

   const fetchPatient = () =>{
    fetch(url+'/'+_id)
     .then((res) => res.json())
     .then((json) => setPatient(json))
     .then(()=>{changeResult()});
   }
   useEffect(() => {
    fetchPatient();
    })


   const handleEdit = (id, tTime, dTest, result, nurse) => {
    setIdTest(id);
    setTestDetail({result:result, dateTest:dTest, testTime:tTime,nurse:nurse})
    
  };
   const changeResult = () => {
       setTestResults(patient.testResults)
   }


   const handleChange = (e) => {
    const { name, value } = e.target;
    setTestDetail(prevState => ({
        ...prevState,
        [name]: value
    }));
  };

  const handleDelete = (id,testID) => {
    fetch(url + "/" + id+"/"+testID, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    }).then((data) => fetchPatient());
  };

  const save = () =>{if (idTest === "") {
    fetch(url+'/'+_id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        testResults:newResults
      }),
    }).then((data) => fetchPatient());
  } else {
    fetch(url + "/" + _id+ "/" +idTest, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
          testTime:testDetail.testTime,
          dateTest:testDetail.dateTest,
          result:testDetail.result,
          nurse:testDetail.nurse
      }),
    }).then((data) => fetchPatient());
  }}



  const StyledTableCell = withStyles((theme) => ({
        head: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        body: {
          fontSize: 14,
        },
      }))(TableCell);
      
      const StyledTableRow = withStyles((theme) => ({
        root: {
          "&:nth-of-type(odd)": {
            backgroundColor: theme.palette.action.hover,
          },
        },
      }))(TableRow);


    return(
        <div>
            <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Test Time</StyledTableCell>
              <StyledTableCell align="right">Result </StyledTableCell>
              <StyledTableCell align="right">Date test </StyledTableCell>
              <StyledTableCell align="right">View </StyledTableCell>
              <StyledTableCell align="right">Delete </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              {((patient !== undefined)&(testResults!==undefined))&&(
               testResults.map((te)=>(
                  <StyledTableRow key={te.testTime}>
                <StyledTableCell component="th" scope="row">
                  {te.testTime}
                </StyledTableCell>
                <StyledTableCell align="right">{te.result}</StyledTableCell>
                <StyledTableCell align="right">{te.dateTest}</StyledTableCell>
                <StyledTableCell align="right">
                  <Button
                    size="small"
                    color="primary"
                    onClick={ () => handleEdit(te._id,te.testTime,te.dateTest,te.result,te.nurse)}
                  >
                    View
                  </Button>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Button
                    size="small"
                    color="primary"
                    onClick={()=> handleDelete(_id,te._id)}
                  >
                    Delete
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
                ))
              )}
          </TableBody>
        </Table>
      </TableContainer>
      <div class="card container">
        <form>
        {(idTest ==='') ? (<h1>New Test Result</h1>):(<h1>Edit Result</h1>)}
          <div class="row">
            <div class="col">
            <input type="text" class="form-control" placeholder="Test Time" name="testTime" value={testDetail.testTime} onChange={handleChange}/>
            </div>
            <div class="col">
            <input type="text" class="form-control" placeholder="Result" name="result" value={testDetail.result} onChange={handleChange}/>
            </div>
            <div class="col">
            <input type="text" class="form-control" placeholder="Date Test" name="dateTest" value={testDetail.dateTest} onChange={handleChange}/>
            </div>
            <div class="col">
            <input type="text" class="form-control" placeholder="Nurse" name="nurse" value={testDetail.nurse} onChange={handleChange}/>
            </div>
          </div>
          {(idTest ==='') ? (
            <Button  color="primary" onClick={() => {
              setNewResults(testResults);
              setNewResults(pre =>[...pre,testDetail]);
              save();
              }}>
              Create
            </Button>)
            :(
            <Button  color="primary" onClick={() => save()}>
              Edit
            </Button>)}
        </form>
      </div>
        </div>
    )
}