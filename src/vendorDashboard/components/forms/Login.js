import React, { useState } from 'react'
import { API_URL } from '../data/apiPath'
const Login = ({showWelcome}) => {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const loginHandler = async(e)=>{
    e.preventDefault();
    try{
       const response = await fetch(`${API_URL}/vendor/login`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({email,password})
       })
       const data = await response.json()
       if(response.ok){
        console.log("login-data",data.success)
        setEmail("")
        setPassword("")
        alert("Login successfully..!")
        localStorage.setItem("loginToken",data.token)
        showWelcome()
       }
       const vendorId = data.vendorId
       const vendorResponse = await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`)
       const vendorData = await vendorResponse.json();
       if(vendorResponse.ok){
        const vendorFirmId = vendorData.vendorFirmId;
        const vendorFirmName = vendorData.vendor.firm[0].firmName;
        localStorage.setItem("firmId",vendorFirmId)
        localStorage.setItem("firmName",vendorFirmName)
        window.location.reload()
       }
    }catch(err){
       console.error(err.message)
       alert("Login failed")
    }
  }
  return (
    <div className='loginSection'>
      <form className='authForm' onSubmit={loginHandler}>
         <h3>Vendor Login</h3>
         <label>Email</label> 
         <input type='email' placeholder='Enter your email' value={email} onChange={(e)=>{setEmail(e.target.value)}}/> 
         <label>Password</label>   
         <input type='password' placeholder='Enter your password' value={password} onChange={(e)=>{setPassword(e.target.value)}}/> 
         <div className='btnSubmit'>
           <button type='submit'>Submit</button>         
         </div>     
      </form>
    </div>
  )
}

export default Login
