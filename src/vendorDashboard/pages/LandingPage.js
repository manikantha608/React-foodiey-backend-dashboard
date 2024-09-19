import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import Login from '../components/forms/Login'
import Register from '../components/forms/Register'
import AddFirm from '../components/forms/AddFirm'
import AddProduct from '../components/forms/AddProduct'
import Welcome from '../components/forms/Welcome'
import AllProducts from '../components/AllProducts'

const LandingPage = () => {
  const [isLogin,setIsLogin] = useState(false);
  const [isRegister,setIsRegister] = useState(false);  
  const [firm,setFirm]=useState(false) 
  const [product,setProduct]=useState(false)
  const [welcome,setWelcome]=useState(false)
  const [allProducts,setAllProducts] = useState(false)
  const [logout,setLogout]=useState(false)
  const [showFirmTitle,setShowFirmTitle]=useState(true)

  useEffect(()=>{
    const loginToken = localStorage.getItem("loginToken")
    if(loginToken){
       setLogout(true)
    }
  },[])

  useEffect(()=>{
    const firmName = localStorage.getItem("firmName");
    if(firmName){
      setShowFirmTitle(false)
    }
  },[])

  const logoutHandler = ()=>{
    window.confirm("Are you sure to Logout?")
    localStorage.removeItem("loginToken");
    localStorage.removeItem("firmId");
    localStorage.removeItem("firmName")
    setLogout(false)
    setShowFirmTitle(true)
  }
  const showLogin = ()=>{
      setIsRegister(false)
      setIsLogin(true)    
      setFirm(false)
      setProduct(false)
      setWelcome(false) 
      setAllProducts(false) 
  }
  const showRegistration = () =>{
      setIsRegister(true)
      setIsLogin(false)    
      setFirm(false)
      setProduct(false)
      setWelcome(false) 
      setAllProducts(false) 
  } 
  const showFirm = ()=>{
    if(logout){
      setIsRegister(false)
      setIsLogin(false)    
      setFirm(true)
      setProduct(false)  
      setWelcome(false) 
      setAllProducts(false)  
    }else{
      alert("Please login");
      setIsLogin(true)
    }       
  } 
  const showProduct = ()=>{
    if(logout){
      setIsRegister(false)
      setIsLogin(false)    
      setFirm(false)
      setProduct(true)  
      setWelcome(false)  
      setAllProducts(false) 
    }else{
      alert("Please login");
      setIsLogin(true)
    }           
  } 
  const showWelcome = () =>{
      setIsRegister(false)
      setIsLogin(false)    
      setFirm(false)
      setProduct(false) 
      setWelcome(true) 
      setAllProducts(false)
  }
  const showAllProducts = ()=>{
    if(logout){
     setAllProducts(true)
     setIsRegister(false)
      setIsLogin(false)    
      setFirm(false)
      setProduct(false) 
      setWelcome(false) 
    }else{
      alert("Please login");
      setIsLogin(true)
    }
  }            
  return (
    <div>
      <NavBar showLogin={showLogin} showRegistration={showRegistration} logout={logout} logoutHandler={logoutHandler}/>
      <div className='collectionSection'>
      <SideBar showFirm={showFirm} showProduct={showProduct} showAllProducts={showAllProducts} showFirmTitle={showFirmTitle}/>
      {isLogin && <Login showWelcome={showWelcome}/>} 
      {isRegister && <Register showLogin={showLogin}/>}
      {firm && logout && <AddFirm/>}
      {product && logout && <AddProduct/>}
      {welcome && <Welcome/>}
      {allProducts && logout && <AllProducts/>}
      </div>
    </div>
  )
}

export default LandingPage
