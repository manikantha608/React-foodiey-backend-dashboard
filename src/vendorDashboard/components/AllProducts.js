// import React, { useEffect ,useState} from 'react'
// import { API_URL } from './data/apiPath';

// const AllProducts = () => {
//   const [products,setProducts] = useState([]);
//   console.log(products)
//   const productsHandler = async()=>{
//       const firmId = localStorage.getItem("firmId");
//       console.log("jnhgcfxd",firmId)
//       try{
//           const response = await fetch(`${API_URL}/product/${firmId}/products`);
//           const newProductsData = await response.json();
//           setProducts(newProductsData.products);
//       }catch(err){

//       }              
//   }
//   useEffect(()=>{
//     productsHandler()
//   },[])

//   const deleteProductById = async(productId)=>{
//     try {
//       const response = await fetch(`${API_URL}/product/${productId}`,{
//           method: 'DELETE'
//       })
//       console.log(response)
//   if(response.ok){
//       setProducts(products.filter(product =>product._id !== productId));
//       window.confirm("are you sure, you want to delete?")
//       alert("Product deleted Successfully")
//   }
// } catch (error) {
//   console.error('Failed to delete product');
//   alert('Failed to delete product')
// }
//   }
//   return (
//     <div className='productSection'>
//       {
//         !products ? (
//           <p>No products added</p>
//         ) : (
//            <table className='product-table'>
//                <thead>
//                     <tr>
//                     <th>Product Name</th>
//                     <th>Price</th>
//                     <th>Image</th>
//                     <th>Delete</th>                 
//                     </tr>
//                </thead>
//                <tbody>
//                     {products.map((item)=>{
//                        return (
//                            <>
//                            <tr key={item.id}>
//                              <td>{item.productName}</td> 
//                              <td>{item.price}</td> 
//                              <td>
//                                 {item.image && (
//                                   <img src={`${API_URL}/uploads/${item.image}`} alt={item.productName}
//                                   style={{width:"100px",height:"100px"}}
//                                   />      
//                                 ) }        
//                              </td> 
//                              <td>
//                              <button onClick={()=>deleteProductById(item._id)}
//                                         className='deleteBtn'
//                                         >Delete</button>     
//                              </td>        
//                            </tr>
//                            </>
//                        )                 
//                     })}
//                </tbody>
//            </table>         
//         )           
//       }
//     </div>
//   )
// }

// export default AllProducts


import React, { useEffect, useState } from 'react';
import { API_URL } from './data/apiPath';

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  const productsHandler = async () => {
    const firmId = localStorage.getItem("firmId");
    try {
      const response = await fetch(`${API_URL}/product/${firmId}/products`);
      const newProductsData = await response.json();
      setProducts(newProductsData.products);
    } catch (err) {
      console.error('Failed to fetch products', err);
    }
  };

  useEffect(() => {
    productsHandler();
  }, []);

  const deleteProductById = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const response = await fetch(`${API_URL}/product/${productId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setProducts(products.filter(product => product._id !== productId));
        alert("Product deleted successfully");
      } else {
        alert("Failed to delete product");
      }
    } catch (error) {
      console.error('Failed to delete product', error);
      alert('Failed to delete product');
    }
  };

  return (
    <div className='productSection'>
      {!products ? (<p>No products added</p>):(<table className='product-table'>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Image</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr key={item._id}>
                <td>{item.productName}</td>
                <td>{item.price}</td>
                <td>
                  {item.image && (
                    <img src={`${API_URL}/uploads/${item.image}`} alt={item.productName} />
                  )}
                </td>
                <td>
                  <button onClick={() => deleteProductById(item._id)} className='deleteBtn'>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>)}
    </div>
  );
};

export default AllProducts;

