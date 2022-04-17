// src/App.js

import React, {Component, useEffect, useState} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Credits from './components/Credits';
import Debits from './components/Debits';

var items = []
var totalDebit= 10

function setDebit(){
  totalDebit = 420
}

{/*function FetchDebit() {

  const [debitData, setDebitData] = useState([])

  useEffect(()=>{
    fetchJson();
  },[])
  
  fetchJson = async () => {
    const data = await fetch('https://moj-api.herokuapp.com/debits')
    debitData = await data.json()
    setDebitData(debitData)
    console.log(debitData)
    var num = 0
    items.map((item)=>{
      num += parseFloat(item.amount)
      totalDebit = num
      
    })
    console.log(totalDebit)
  }
  
}*/}



class App extends Component {
  constructor() {  // Create and initialize state
    super(); 
    this.state = {
      accountBalance: 14568.27,
      credit: 0,
      debit: 0,
      currentUser: {
        userName: 'Joe Smith',
        memberSince: '07/23/96',
      }
    }
  }


  mockDebitCredit = (logInInfo) => {
    //console.log(logInInfo)
    this.setState({debit: logInInfo})
  }


  // Update state's currentUser (userName) after "Log In" button is clicked
  mockLogIn = (logInInfo) => {  
    const newUser = {...this.state.currentUser}
    newUser.userName = logInInfo.userName
    this.setState({currentUser: newUser})
  }

  // Create Routes and React elements to be rendered using React components
  render() {  
    
    const DebitComponent = () => (<Debits credit={this.state.credit} debit={this.state.debit} mockDebitCredit={this.mockDebitCredit}/>);
    const HomeComponent = () => (<Home accountBalance={this.state.debit}/>);
    const UserProfileComponent = () => (
      <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince}  />
    );
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />)  // Pass props to "LogIn" component
      
    return (
      <Router>
        <div>
          <div>{setDebit}</div>
          <Route exact path="/" render={HomeComponent}/>
          <Route exact path="/userProfile" render={UserProfileComponent}/>
          <Route exact path="/login" render={LogInComponent}/>
          <Route exact path="/credits" render={Credits}/>
          <Route exact path="/debits" render={DebitComponent}/>
        </div>
      </Router>
    );
  }
}

export default App;