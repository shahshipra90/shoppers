import React, { useState, useContext } from 'react';
import './CSS/LoginSignup.css';
import { Link, useNavigate } from 'react-router-dom';
import { app} from '../firebase';
import { ShopContext } from '../Context/ShopContext';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const LoginSignup = () => {
  const [email, SetEmail] = useState('');
  const [password, SetPassword] = useState('');
  const navigate = useNavigate();

  const {login, isAuthenticated, setLoggedIn} = useContext(ShopContext);
    
    const loginUser = async (e) =>{
      if(email.length === 0 && password.length === 0){
        alert("Please fill the details")
      }
      else{
        e.preventDefault()
        try {
          const loginuser = await app.auth().signInWithEmailAndPassword(email, password);
          if (loginuser) {
            setLoggedIn(true); // Update this line to setLoggedIn(true)
            navigate('/');
          } else {
            alert("Something went wrong, Try again!");
          }
        } catch (error) {
          alert(error);
        }
      }
    }


  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>Login</h1>
        <form >
          <div className="loginsignup-fields">
            {/* Input fields for email and password */}
            <input
              // name="email"
              type="email"
              placeholder='Email Address'
              value={email}
              onChange={(e) => SetEmail(e.target.value)}
            />
            <input
              // name="password"
              type="password"
              placeholder='Password'
              value={password}
              onChange={(e) => SetPassword(e.target.value)}
            />
          </div>
          <div className="loginsignup-agree">
            <input type="checkbox" name="" id="" />
            By continuing I agree to the terms of the privacy policy.
          </div>
          <button onClick={loginUser}>Sign In</button>
        </form>
        <p className="loginsignup-login">
          New to Shoppers &nbsp;
          <Link to='/signup'>Sign Up</Link>
        </p>
        {/* {error && <p className="error-message">{error}</p>} */}
      </div>
    </div>
  );
};

export default LoginSignup;

