import React, { useState } from 'react'
import { PropTypes } from 'prop-types'
import './Login.css'
import { SERVER_IP } from './constants'

export default function Login ({setToken}){
    const [username,setUsername] = useState(null)
    const [password,setPassword] = useState(null)

    async function loginUser(credentials) {
        return fetch('http://'+SERVER_IP+':5000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(credentials)
        })
          .then(data => data.json()).catch(error=>{alert("Login Failed")});
       }


    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
          username,
          password
        });
        if (token){
          setToken(token);
        }
        else{
          alert("Login Failed")
        }
      }

    return(
        <>
        
        <div className="container-bg">
            
        <img class="splash-logo" id = "image" alt="bg-crescent" src="/logo.png"/>
        <div class="login-container">
            <div class="login">    
                    <p className="heading">Crescent Steel</p> 
                    <label className="label2">
                        <b>User Name</b>    
                    </label>    
                    <input type="text" name="Uname" id="Uname" placeholder="Username" onChange={(e)=>{setUsername(e.target.value)}}/>    
                    <br/><br/>    
                    <label className="label2">
                        <b>Password</b>    
                    </label>    
                    <input type="Password" name="Pass" id="Pass" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}}/>    
                    <br/><br/>    
                    <input type="button" name="log" id="log" value="Log In Here" onClick={handleSubmit}/>   
                    
            </div>
            <div class="imagelog">
                        <img src="./12.jpeg" alt="login" width="550px" height="450" />
                    </div>
            {/* <div>
                <img src="./new.jpeg" alt="login"  />
            </div> */}
        </div>
        </div>
        </>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
  }
