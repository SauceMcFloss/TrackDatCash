import React, { Component } from "react";
import { Link } from "react-router-dom";
import ReactDOM from 'react-dom';


import '../../App.css';

import logo2 from "../../o-logo.png";
import logo from "../../money_sign.png";
import picture from "../../calc.jpg";
import description from "../../pic.PNG";

class Landing extends Component {
  render() {
    return (
      	
		<div className= "AppL">
			
		
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
                  className="btn btn-info"
                ><Link to="login" className="nav-link">Login</Link></button>
						</li>
						</ul>
					</div>
					</nav>
				
				<div className = "row">
					<div className = "Picture">
							<center><h1><img src = {picture} width = "400" height = "300" class = "rounded" alt = ""/></h1></center>
						</div>
				
					<div className = "right">
						<center><h2>Here in Track Dat Ca$h...</h2></center>
					
						<center><p>You have the option to view your expenses in a personal or group setting</p></center>
						<center><p>Plan your finances and keep a budget</p></center>
						<center><p>Track your expenses monthly</p></center>
						<center><p>Analyze your expenses</p></center>
						<center><p> Want to get started? Login or Sign up Now!</p></center>
						
						<center><button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-info"
                ><Link to="register" className="nav-link">Register</Link></button></center>
						<div className = "spacingpic"></div>
						<center><img src = {logo} width = "50" height = "50" class="img-circle"  alt = ""/></center>
					</div>
				</div>
		</div>
		
    );
  }
}

export default Landing;
