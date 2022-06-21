import React,{Fragment} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Landing from './components/pages/Landing'
import Navbar from './components/pages/Navbar';
import Register from './components/pages/auth/Register';
import Login from './components/pages/auth/Login';
import AsideBar from './components/pages/AsideBar'
import Employee from './components/pages/layout/Employee';
import {Provider} from 'react-redux'
import store from './store'
import './App.css';
import Company from './components/pages/layout/Company';



const App = ()=> (
    
      <Router>
      <Fragment>
      <Navbar/>
      <AsideBar/>
      <Route exact path='/' component={Landing}/>
     <Route  exact path="/landing" component={Landing}/>

     <Route  exact path="/employee" component={Employee}/>
     <Route  exact path="/company" component={Company}/>

     
       <Route exact path="/register" component={Register}/>
       <Route exact path="/login" component={Login}/>
     

    </Fragment>
    </Router>
);

export default App;
