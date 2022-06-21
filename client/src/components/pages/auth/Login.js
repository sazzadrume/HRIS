import React, {Fragment, useState} from 'react';
import './Login.css';
import axios from 'axios';

const Login = () => {
  const[formData, setFormData] = useState({
    email: '',
    password: '' 
   });

const { email, password } = formData;


const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});

const onSubmit =  async e => {
  e.preventDefault();
  
    console.log('SUCCESS');
};

  return(
     <Fragment>
  
    <h1 className="large text-primary" >Sign In</h1>
      <p className="lead">
        <i className="fas fa-user" /> Sign Into Your Account
      </p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={e => onChange(e)}
            required
          />
      
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={e => onChange(e)}
            minLength='6'
            />
        </div>
        
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account <a href="/register">Sign Up</a>
      </p>
  </Fragment>
  );
};

export default Login;