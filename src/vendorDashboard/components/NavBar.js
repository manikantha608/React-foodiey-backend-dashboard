import React from 'react';

const NavBar = ({ showLogin, showRegistration, logout, logoutHandler }) => {
  const firmName = localStorage.getItem('firmName');
  
  return (
    <nav className='nav-section'>
      <div className='company'>
        <h2>Vendor Dashboard</h2>
      </div>
      <div className='firm-name'>
        <h4>Firm Name: {firmName}</h4>
      </div>
      <div className='user-auth'>
        {!logout ? (
          <>
            <span className='auth-link' onClick={showLogin}>Login</span>
            <span className='divider'>/</span>
            <span className='auth-link' onClick={showRegistration}>Register</span>
          </>
        ) : (
          <span className='auth-link' onClick={logoutHandler}>Logout</span>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
