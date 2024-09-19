import React from 'react'

const NavBar = ({showLogin,showRegistration,logout,logoutHandler}) => {
  const firmName = localStorage.getItem("firmName")
  return (
    <div className='navSection'>
      <div className='company'>
         Vendor Dashboard
      </div>
      <div className='firmName'>
        <h4>FirmName : {firmName}</h4>
      </div>
      <div className='userAuth'>
        {!logout ? <>
         <span onClick={showLogin}>Login / </span>  
         <span onClick={showRegistration}>Register</span> 
         </> : <span onClick={logoutHandler}>Logout</span> }
              
      </div>
    </div>
  )
}

export default NavBar
