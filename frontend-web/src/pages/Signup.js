import React, { useState } from "react";
import {  Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./layoutcss/Login.css";
import { useSignupMutation } from "../services/appApi";

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [signup, { error, isLoading, isError }] = useSignupMutation();
    const [showPassword, setShowPassword] = useState(false);
// show password
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };
    // 
    function handleSignup(e) {
        e.preventDefault();
        signup({ name, email, password });
    }

    return (
        <div class="overlay body1">

    <form class="form1" onSubmit={handleSignup} >
    
    <div class="con">
    
    <header class="head-form ">
        <h2>Sign Up</h2>
        
        <p>Signup here using your email and password</p>
    </header>
    
    <br/>
    
     
    <div class="field-set">   
    {isError && <Alert variant="danger">{error.data}</Alert>}
        <span class="input-item">
        <i class="fa fa-user-circle"></i>
        </span>
        <input  class="form-input"  type="text" placeholder="name"  value={name} required onChange={(e) => setName(e.target.value)} />
        <br/>
        {/*  */}
        <span class="input-item">
        <i aria-hidden="true" class="fa fa-envelope"></i>
        </span>
        <input class="form-input" type="email" placeholder="email"   name="email"
         value={email} required onChange={(e) => setEmail(e.target.value)}/>
        {/*  */}
        <br/>
        <span class="input-item">
        <i class="fa fa-key"></i>
        </span>
        <input class="form-input" type={showPassword ? "text" : "password"} placeholder="Password" id="pwd" 
         name="password" value={password} required onChange={(e) => setPassword(e.target.value)}/>
        <span>
        <i className="fa fa-eye" aria-hidden="true" type="button" id="eye"onClick={togglePasswordVisibility} ></i>
        </span>
        
        {/*  đăng ký*/}
        <br/>
        <button  type="submit"  class="log-in" disabled={isLoading}> Sign Up</button>
    </div>
    
        <Link  class="btn submits frgt-pass">Google</Link>

        <Link to="/login" class="btn submits sign-up">Log In
        <i class="fa fa-user-plus" aria-hidden="true"></i></Link>
        
    </div>

    </form>
    
</div> 
    );
}

export default Signup;