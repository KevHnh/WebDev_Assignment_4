// src/App.js

import React, {Component, useEffect, useState} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Credits from './components/Credits';
import Debits from './components/Debits';
import axios from 'axios';

var items = []
var initalDebit= 4210.77
var initalCredit = 4726.65
 
{/*
axios.get('https://moj-api.herokuapp.com/debits')
    .then(response => 
        response.data.map((item)=>{
        
          items.push(item.amount)
        
        },[])
      );
      console.log(items[0])
      
      */}


class App extends Component {
  constructor() {  // Create and initialize state
    super(); 
    this.state = {
      accountBalance: 14568.27,
      credit: initalCredit,
      debit: initalDebit,
      currentUser: {
        userName: 'Joe Smith',
        memberSince: '07/23/96',
      }
    }
  }


  mockDebit = (logInInfo) => {
    //console.log(logInInfo)
    this.setState({debit: logInInfo})
  }

  mockCredit = (creditInfo) => {
    //console.log(logInInfo)
  
    this.setState({credit: creditInfo})
  }


  // Update state's currentUser (userName) after "Log In" button is clicked
  mockLogIn = (logInInfo) => {  
    const newUser = {...this.state.currentUser}
    newUser.userName = logInInfo.userName
    this.setState({currentUser: newUser})
  }

  // Create Routes and React elements to be rendered using React components
  render() {  
    
    const DebitComponent = () => (<Debits credit={this.state.credit} debit={this.state.debit} mockDebit={this.mockDebit}/>);
    const CreditComponent = () => (<Credits credit={this.state.credit} debit={this.state.debit} mockCredit={this.mockCredit}/>);
    const HomeComponent = () => (<Home accountBalance={(this.state.credit - this.state.debit).toFixed(2)}/>);
    const UserProfileComponent = () => (
      <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince}  />
    );
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />)  // Pass props to "LogIn" component
      
    return (
      <Router>
        <div>
          <Route exact path="/" render={HomeComponent}/>
          <Route exact path="/userProfile" render={UserProfileComponent}/>
          <Route exact path="/login" render={LogInComponent}/>
          <Route exact path="/credits" render={CreditComponent}/>
          <Route exact path="/debits" render={DebitComponent}/>
        </div>
      </Router>
    );
  }
}

export default App;