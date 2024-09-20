import React from 'react'

const SideBar = ({ showFirm, showProduct, showAllProducts, showFirmTitle }) => {
  return (
    <aside className='sidebar-section'>
      <ul className='sidebar-list'>
        {showFirmTitle ? <li className='sidebar-item' onClick={showFirm}>Add Firm</li> :""}
         <li className='sidebar-item' onClick={showProduct}>Add Product</li>
         <li className='sidebar-item' onClick={showAllProducts}>All Products</li> 
         <li className='sidebar-item' >User Details</li>         
      </ul>
      </aside>
  )
}

export default SideBar

