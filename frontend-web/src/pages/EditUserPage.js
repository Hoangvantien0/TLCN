import React, { useEffect, useState } from "react";
import { useUpdateUserMutation } from "../services/appApi";
import axios from "../axios";
import Loading from "../components/Loading";
import { Badge, Container, Table, Row, Col, Form, Image, Button, Alert } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import './layoutcss/Login.css'

const EditUserPage = () => {
  // const [users, setUsers] = useState([]);
 
  const [loading, setLoading] = useState(false);
  const [updateUser, { isError, error, isLoading, isSuccess }] = useUpdateUserMutation();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  // show password
      const togglePasswordVisibility = () => {
          setShowPassword(!showPassword);
        };
        // 
  useEffect(() => {
    axios
      .get("/users/" + id)
      .then(({ data }) => {
        const user = data.user;
       
        setName(user.name);
        setEmail(user.email);
        setPassword(user.password);
      })
      .catch((e) => console.log(e));
  }, [id]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !email || !password) {
      return alert("Vui lòng điền tất cả thông tin");
    }
    updateUser({id,name, email, password})
    .then(({data}) => {
        if (data.length > 0) {
          setTimeout(() => {
            navigate("/");
          },500);
        }
    });
  }    



  
  if (loading) return <Loading />;
  return (
    <div class="overlay body1">

    <form class="form1" onSubmit={handleSubmit} >
    
    <div class="con">
    
    <header class="head-form ">
        <h2>Sign Up</h2>
        
        <p>Signup here using your email and password</p>
    </header>
    
    <br/>
    
     
    <div class="field-set">   
    {isSuccess && <Alert variant="success">Tài khoản được cập nhật</Alert>}
    {isError && <Alert variant="danger">{error.data}</Alert>}
        <span class="input-item">
        <i class="fa fa-user-circle"></i>
        </span>
        <input  class="form-input"  type="text" placeholder="name"  
        value={name} required onChange={(e) => setName(e.target.value)} />
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
        <button  type="submit"  class="log-in"  disabled={isLoading || isSuccess}> Update</button>
    </div>
    
        <Link  class="btn submits frgt-pass">Google</Link>

        <Link to="/login" class="btn submits sign-up">Log In
        <i class="fa fa-user-plus" aria-hidden="true"></i></Link>
        
    </div>

    </form>
    
</div> 
  );
};

export default EditUserPage;
