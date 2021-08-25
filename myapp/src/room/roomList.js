import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const url="http://localhost:8080/rooms"
export default class roomList extends React.Component{


    constructor (props){
        super()
        this.state={
            rooms :[]
        }
    }

    
    fetchRoom(){
        fetch(url).then(res => res.json())
        .then(json => this.setState({ rooms: json }))
    }

    componentDidMount(){
        this.fetchRoom()
    }
    render(){
        return( 
            <TableContainer component={Paper}>
            <Table  aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Room Number</TableCell>
                  <TableCell align="right">Room Type</TableCell>
                  <TableCell align="right">Bed Counts</TableCell>
                  <TableCell align="right">View</TableCell>
                  <TableCell align="right">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.rooms.map((row) => (
                  <TableRow key={row.roomNumber}>
                    <TableCell component="th" scope="row">
                      {row.roomNumber}
                    </TableCell>
                    <TableCell align="right">{row.roomType}</TableCell>
                    <TableCell align="right">{row.bedCounts}</TableCell>
                    <TableCell align="right">View</TableCell>
                    <TableCell align="right">Delete</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )
    }
}