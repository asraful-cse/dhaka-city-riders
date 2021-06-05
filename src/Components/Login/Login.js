import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext } from "react";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons'


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app();
}


function Login() {
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: false,
        name: "",
        email: "",
        password: "",
        photo: "",
        error: "",
        success: false,
    });

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const provider = new firebase.auth.GoogleAuthProvider();
    const handleGoogleSignIn = () => {
        firebase.auth()
            .signInWithPopup(provider)
            .then((res) => {
                const { displayName, photoURL, email } = res.user;
                const signedInUser = {
                    isSignedIn: true,
                    name: displayName,
                    email: email,
                    photo: photoURL
                }
                setUser(signedInUser);
                setLoggedInUser(signedInUser);
                history.replace(from);
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.email;
                console.log(errorCode, errorMessage, email);

            });
    }

    const handleBlur = (e) => {
        let isFieldValid = true;
        if (e.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === 'password') {
            isFieldValid = /\d/.test(e.target.value) && e.target.value.length > 6;
        }
        if (isFieldValid) {
            const newUserInfo = { ...user }
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }
    const handleSubmit = (e) => {
        if (newUser && user.email && user.password && user.name) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user }
                    newUserInfo.error = "";
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                })
                .catch((error) => {
                    const newUserInfo = { ...user }
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo)
                });
        }

        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user }
                    newUserInfo.error = "";
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    setLoggedInUser(newUserInfo);
                    history.replace(from);
                })
                .catch((error) => {
                    const newUserInfo = { ...user }
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo)
                });
        }
        e.preventDefault();
    }
    return (
        <div className="App" style={{backgroundColor: '#1a4c1a7d'}}>
            <form onSubmit={handleSubmit}>
                <div className="row container-fluid">
                    <div className="col-md-4 offset-md-4 pt-3" style={{backgroundColor:'InfoBackground'}}>
                        <div className="bg-white rounded p-3" style={{border: 'rgb(121 204 47 / 91%)'}}>
                            <h1 className="text-center" style={{color: 'rgb(121 204 47 / 91%)'}}>{newUser ? 'Create Account' : 'Log In'}</h1>
                            {
                                newUser &&
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Username *</label>
                                    <input type="text" onBlur={handleBlur} className="form-control" id="exampleFormControlInput1" placeholder="Your name" name="name" required />
                                </div>
                            }
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">Email address *</label>
                                <input type="email" onBlur={handleBlur} className="form-control" id="exampleFormControlInput1" placeholder="Your email address" name="email" required />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">Password *</label>
                                <input type="password" onBlur={handleBlur} className="form-control" id="exampleFormControlInput1" placeholder="Your password" name="password" required />
                            </div>

                            <div className="mb-3">
                                <input type="submit" value="login" className="btn btn-primary w-50 form-btn" />
                            </div>

                            <div className="text-center">
                                <p className="text-muted pb-2" style={{color:'#81bf81', marginBottom:'0px'}}>{!newUser ? "Don't have an account? Create an account" : 'Already have an account? Now login'}</p>
                                <h5 style={{ cursor: "pointer", color:'Highlight' }} className="toggle-signUp-logIn fw-bold" href="/" onClick={() => setNewUser(!newUser)}>{!newUser ? 'Create Account' : 'Login'}</h5>
                            </div>

                            <div className="text-center pt-3">
                                <h6>Or</h6>
                                <div>
                                  <button style= {{color:'green', borderRadius:'10px'}}> <h1><FontAwesomeIcon onClick={handleGoogleSignIn} icon={faGoogle} /></h1><p></p></button><p>google sign in</p>
                                </div>


                                <div className="text-center pt-2">
                                    <p style={{ color: "red" }}>{user.error}</p>
                                    {user.success && <p style={{ color: "green" }}>User {newUser ? "Created" : "Logged in"} Successfully</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Login;