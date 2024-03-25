import React, { useState } from 'react';
import './CSS/LoginSignup.css';
import { Link, useNavigate } from 'react-router-dom';
import { app, db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const SignupLogin = () => {
    const [email, SetEmail] = useState('');
    const [password, SetPassword] = useState('');
    const [username, SetUsername] = useState('');
    const navigate = useNavigate();

    const dbref = collection(db, 'userData');

    const signup = async (event) => {
        event.preventDefault(); // Move this line to the top

        if (email.length === 0 && password.length === 0 && username.length === 0) {
            alert("Please fill the details");
        } else {
            try {
                const adduser = await firebase.auth().createUserWithEmailAndPassword(email, password);
                
                if (adduser) {
                    const userData = { username: username, uid: adduser.user.uid };
                    // Use addDoc to add user data to Firestore
                    await addDoc(dbref, { Email: email, Username: username, UID: adduser.user.uid });
                    navigate('/login');
                }
         else {
                    alert("Something went wrong, Try again!");
                }
            } catch (error) {
                alert(error);
            }
        }
    };

    return (
        <div className='loginsignup'>
            <div className="loginsignup-container">
                <h1>Sign Up</h1>
                <div className="loginsignup-fields">
                    <input
                        type='text'
                        name='username'
                        placeholder='ABC'
                        value={username}
                        onChange={(e) => SetUsername(e.target.value)}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder='Email Address'
                        value={email}
                        onChange={(e) => SetEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder='Password'
                        value={password}
                        onChange={(e) => SetPassword(e.target.value)}
                    />
                </div>
                <div className="loginsignup-agree">
                    <input type="checkbox" name="" id="" />
                    By continuing I agree to the terms of the privacy policy.
                </div>
                <button onClick={signup} >Signup</button>
                <p className="loginsignup-login">
                    Already a user of Shoppers &nbsp;
                    <Link to='/login'>Sign In</Link>
                </p>
            </div>
        </div>
    );
};

export default SignupLogin;
