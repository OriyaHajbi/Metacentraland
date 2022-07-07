import React , {useState} from "react";
import GoogleEntry from "../Components/GoogleEntry";
import httpRequestBuilder from "../httpRequest";
import { useNavigate } from "react-router-dom";
const axios = require('axios').default;


function Register(){

  const [user , setUser] = useState({
    username: "",
    password: ""
  });

  function updateUser(event){

    const { name, value } = event.target;

    setUser(prevValue => {
      return {
      ... prevValue,
      [name] : value
    }});
     console.log(user);
  }

    const navigate = useNavigate();

    const handleClick = (path) => {
        navigate(path);
    }

    async function sendUserData(){

    const URL = 'http://localhost:4000/users/register';

  
    axios.post(URL, {
      username: user.username,
      password: user.password
    })
    .then((res) => {
      if (res.data){
        console.log(res);
        handleClick("/login");
        setUser({username: "",password: ""});
      }else{
        alert("The details are wrong");
        handleClick("/register");
        setUser({username: "",password: ""});
      }
    });
  }




    return <div className="container mt-5 w-50">
  <h1 className="text-center mb-5">Register</h1>

  <div className="">
    <div className="">
      <div className="card">
        <div className="card-body text-center">

          
            <div className="form-group">
              <label for="email">Email</label>
              <input onChange={updateUser} type="email" className="form-control" name="username" required/>
            </div>
            <div className="form-group ">
              <label for="password">Password</label>
              <input onChange={updateUser} type="password" className="form-control" name="password" required/>
            </div>
            <button onClick={sendUserData} className="btn btn-dark ">Register</button>
          
        </div>
      </div>
    </div>

    <GoogleEntry text="Sign Up with Google"/>
    

  </div>
</div>;
}


export default Register;