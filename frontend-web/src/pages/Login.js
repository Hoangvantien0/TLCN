import React, { useState } from "react";
import {  Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useLoginMutation } from "../services/appApi";
import "./layoutcss/Login.css";

function Login() {
    // const [name, setName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [login, { isError, isLoading, error }] = useLoginMutation();
    function handleLogin(e) {
        e.preventDefault();
        login({ email, password });
    }
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };
      
    return (
    <div class="overlay body1">
    <form class="form1" onSubmit={handleLogin} >  
    <div class="con">
    
    <header class="head-form ">
        <h2>Log In</h2>
        <p>login here using your email and password</p>
    </header>
    <br/>
    
    <div class="field-set">   
    {isError && <Alert variant="danger">{error.data}</Alert>}
            <span class="input-item">
            <i class="fa fa-user-circle"></i>
            </span>
            <input  class="form-input" id="txt-input" type="text" placeholder="email"  value={email} required onChange={(e) => setEmail(e.target.value)} />
        <br/>
        
        <span class="input-item">
            <i class="fa fa-key"></i>
        </span>
        
        <input class="form-input" type={showPassword ? "text" : "password"} placeholder="Password" id="pwd"  name="password" value={password} required onChange={(e) => setPassword(e.target.value)}/>
        
        <span>
        <i className="fa fa-eye" aria-hidden="true" type="button" id="eye"onClick={togglePasswordVisibility} ></i>
        </span>

        <br/>
        <button  type="submit"  class="log-in" disabled={isLoading}> Log In </button>
    </div>
    
        <Link  class="btn submits frgt-pass">Forgot Password</Link>
        <Link to="/signup" class="btn submits sign-up"> Sign Up
        <i class="fa fa-user-plus" aria-hidden="true"></i></Link>
        
    </div>
    </form>    
</div> 

    
    );
}

export default Login;