import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import ReactDOM from 'react-dom';


import '../App.css';

import logo2 from "../o-logo.png";
import mobile from "../google.png";
import logo from "../money_sign.png";
import picture from "../calc.jpg";
import description from "../pic.PNG";

import jwt_decode from "jwt-decode";

class Landing extends Component {
	
	constructor(props) {
        super(props);

        this.state = {
			userName: '',
			userEmail: ''
		};
    }
	
	componentDidMount() {
		// Remove token from local storage
		localStorage.removeItem('pageToken');
		// Set token to localStorage
		localStorage.setItem('pageToken', '/dashboard');
		
		const idOfUser = jwt_decode(localStorage.getItem("jwtToken")).id;
		
		axios.get('/expenses/user/'+idOfUser)
            .then(response => {
				// Run with a delay
				setTimeout(
					this.setState({
						userName: response.data.name,
						userEmail: response.data.email
					}),
					500
				)
            })
            .catch(function (error) {
                console.log(error);
            })
		// Duplicate GET request for timing delay to make all values correct
		axios.get('/expenses/user/'+idOfUser)
            .then(response => {
				// Run with a delay
				setTimeout(
					this.setState({
						userName: response.data.name,
						userEmail: response.data.email
					}),
					500
				)
            })
            .catch(function (error) {
                console.log(error);
            })
    }
	
  render() {
    return (
		<div className= "App">	
			<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
			<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
			<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css"></link>
					<nav className = "navbar navbar-expand-sm navbar-light navbar-custom sticky-top">
					<h1><img src = {logo2} width = "400" height = "80"  alt = ""/></h1>
					<div className="collpase navbar-collapse">
					  <ul className="navbar-nav ml-auto">
						<li className="navbar-item">
						<right><button
							  style={{
								width: "150px",
								borderRadius: "3px",
								letterSpacing: "1.5px",
								marginTop: "1rem"
							  }}
								type="submit"
								className="btn btn-info">
						<Link to="dashboard" 
							className="nav-link" 
							style = {{ 
								fontWeight:"300", 
								color: "white"
							}}>Dashboard</Link></button></right>
						</li>						
						
						
						</ul>
					</div>
					</nav>
				<div className = "landing_spacing">
				<div className = "row">
					<div className = "Picture">
						<center><h1><img src = {picture} width = "900" height = "300" class = "rounded" alt = ""/></h1></center>
					</div>
				
					<div className = "right">
						<center><h2>{this.state.userName + "'s Account Info"}</h2></center>
						
						<div className = "spacingpic"></div>
						
						<center><h5>{"Your name: " + this.state.userName}</h5></center>
						<center><h5>{"Your email: " + this.state.userEmail}</h5></center>
						
						<div className = "spacingpic"></div>
							<center><img src = {logo} 
								width = "50" 
								height = "50" 
								class="img-circle"  
								alt = ""/>
							</center>
					</div>
					</div>
				</div>
		</div>
		
    );
  }
}

export default Landing;