import React from 'react'

const SideBar = ({showFirm,showProduct,showAllProducts,showFirmTitle}) => {
  return (
    <div>
      <div className='sideBarSection'>
      <ul>
        {showFirmTitle ? <li onClick={showFirm}>Add Firm</li> :""}
         <li onClick={showProduct}>Add Product</li>
         <li onClick={showAllProducts}>All Products</li> 
         <li>User Details</li>         
      </ul>
      </div>
    </div>
  )
}

export default SideBar
