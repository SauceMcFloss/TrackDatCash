import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import sortBy from 'lodash/sortBy';
import sumBy from 'lodash/sumBy';
import logo from "../o-logo.png";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

import jwt_decode from "jwt-decode";

import  { Redirect } from 'react-router-dom';

var ReactBsTable = require('react-bootstrap-table');
var BootstrapTable = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;

var temp = [];
var tempCode = '';
var sum = 0;

const Expense = props => (
    <tr>
        <td>{props.item.description}</td>
        <td>{props.item.amount}</td>
		<td>{props.item.category}</td>
        <td>{props.item.month}</td>
        <td>{props.item.day}</td>
        <td>{props.item.year}</td>
        <td>
            <Link to={"/edit/"+props.item._id}>Edit</Link>
        </td>
    </tr>
)

class TodosList extends Component {

    constructor(props) {
        super(props);
		
		this.onChangeSort = this.onChangeSort.bind(this);
		this.onChangeGroupCode = this.onChangeGroupCode.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onRowDoubleClick = this.onRowDoubleClick.bind(this);
		
        this.state = {
			expensesArray: [],
			total: 0,
			userCode: ' ',
			groupCode: ' '
		};
    }
	
	onLogoutClick = e => {
		e.preventDefault();
		this.props.logoutUser();
	};
	
	componentDidMount() {
		// Remove token from local storage
		localStorage.removeItem('pageToken');
		// Set token to localStorage
		localStorage.setItem('pageToken', '/group');
		
		const idOfUser = jwt_decode(localStorage.getItem("jwtToken")).id;
        axios.post('/expenses/codeMount', {
			id: idOfUser
			})
            .then(response => {
				tempCode = response.data.groupCode;
                this.setState({ 
					userCode: tempCode,
					groupCode: tempCode
				});
				
				axios.post('expenses/code/'+tempCode)
					.then(res => {
						temp = res.data;
						temp = sortBy(temp, ['description', 'amount']);
						sum = sumBy(temp, 'amount');
						this.setState({ 
							expensesArray: temp,
							total: sum
						});
					})
            })
            .catch(function (error){
                console.log(error);
            })
    }
	
	onChangeSort(sortItem) {
		temp = this.state.expensesArray;
		temp = sortBy(temp, sortItem);
		sum = sumBy(temp, 'amount');
		this.setState({ 
					expensesArray: temp,
					total: sum
				});
    }
	
	onChangeGroupCode(e) {
		this.setState({
            groupCode: e.target.value
        });
        
    }
	
	onSubmit(e) {
        e.preventDefault();
		
		axios.post('expenses/code/'+this.state.groupCode)
            .then(response => {
				temp = response.data;
				temp = sortBy(temp, ['description', 'amount']);
				sum = sumBy(temp, 'amount');
                this.setState({ 
					expensesArray: temp,
					total: sum
				});
            })
            .catch(function (error){
                console.log(error);
            })	
    }
	
    onRowDoubleClick(row){
		this.props.history.push('/edit/'+row._id)
	}

    render() {		
		const options = {
			onRowDoubleClick: this.onRowDoubleClick,
			onSortChange: this.onChangeSort,
			defaultSortName: 'description',
			defaultSortOrder: 'asc'
		  };
		
		const cellEdit = {
			mode: 'dbclick' // double click cell to edit
		  };
		  
        return (
            <div className = "App">
				<nav className="navbar navbar-expand-sm navbar-light navbar-custom sticky-top">
					<img src={logo} width="400" height="80" alt=""/>
					<div className="collpase navbar-collapse">
						<ul className="navbar-nav mr-auto">
							<li className="navbar-item">
								<Link to="/dashboard" className="nav-link">All Expenses</Link>
							</li>
							<li className="navbar-item">
								<Link to="/create" className="nav-link">Create Expense</Link>
							</li>
							<li className="navbar-item">
								<Link to="/categories" className="nav-link">Category Page</Link>
							</li>
							<li className="navbar-item">
								<Link to="/monthly" className="nav-link">Monthly Page</Link>
							</li>
							<li className="navbar-item">
								<Link to="/group" className="nav-link">Group Page</Link>
							</li>
							<li className="navbar-item">
							  <Link to="/account" className="nav-link">Your Account</Link>
							</li>
						</ul>
						<ul className = "navbar-nav ml-auto">
							<li className = "navbar-item">
								<button 
									style={{ 
										width: "150px",
										borderRadius: "3px",
										letterSpacing: "1.5px",
										marginTop: "1rem"
									}}
								onClick={this.onLogoutClick}
								className="btn btn-info" >
								<Link to = "login" 
									className = "nav-link" 
									class = "rounded"
									style = {{ 
									fontWeight:"300", 
									color: "white"
								}}>
								Logout</Link></button>
							</li>
						</ul>
					</div>
				</nav>
			
			<div style={{ marginTop: 50 }}>
				<h1><center>Group Expenses</center></h1>
				<center><h5>Total: ${this.state.total.toFixed(2)} </h5></center>
			</div>
			
			<div className = "spacing">
			<h5><center>{"Your account's group code is: " + this.state.userCode}</center></h5>
			</div>
				<div className = "dividerG">	
					<form onSubmit={this.onSubmit}>
						<center><label>Current Group Code:
							<input  type="text" 
								placeholder={this.state.userCode} 
								className="form-control" 
								value={this.state.cat} 
								onChange={this.onChangeGroupCode}/>
							</label>
							<input type="submit" value="Update" className="btn btn-info" />
						</center>
					</form>
				</div>
				<div style={{ marginTop: 20 }}>
				</div>
				<div className = "spacing">
				<link rel="stylesheet" href="https://npmcdn.com/react-bootstrap-table/dist/react-bootstrap-table-all.min.css"></link>
				<BootstrapTable 
					data={this.state.expensesArray} 
					headerStyle={ { background: '#3cb3bb' } }
					striped hover 
					version='4' 
					cellEdit={ cellEdit } 
					options={ options }
					pagination 
					multiColumnSearch>
						<TableHeaderColumn isKey dataField='description' dataSort>Description</TableHeaderColumn>
						<TableHeaderColumn dataField='amount' dataSort>Amount</TableHeaderColumn>
						<TableHeaderColumn dataField='category' dataSort>Category</TableHeaderColumn>
						<TableHeaderColumn dataField='month' dataSort>Month</TableHeaderColumn>
						<TableHeaderColumn dataField='day' dataSort>Day</TableHeaderColumn>
						<TableHeaderColumn dataField='year' dataSort>Year</TableHeaderColumn>
				</BootstrapTable>
				</div>
            </div>
        )
    }
}

TodosList.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(TodosList);