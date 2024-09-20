import React, { useState } from 'react'
import { API_URL } from '../data/apiPath'
const AddFirm = () => {
  const [ firmName,setFirmName]=useState("")
  const [area,setArea]=useState("")
  const [category,setCategory]=useState([])
  const [region,setRegion]=useState([])
  const [offers,setOffers]=useState("")
  const [file,setFile]=useState(null)

  const handleCategoryChange = (event)=>{
       const value = event.target.value;
       if(category.includes(value)){
        setCategory(category.filter((item)=>item !== value))
       }else{
        setCategory([...category,value])
       }
  }
  const handleRegionChange =(event)=>{
    const value = event.target.value;
    if(region.includes(value)){
       setRegion(region.filter((item)=>item !== value))
    }else{
      setRegion([...region,value])
    }
  }

  const handleImageUpload = (event)=>{
    const selectedImage = event.target.files[0];
    setFile(selectedImage)
  }
  const handleFirmSubmit = async(e)=>{
    e.preventDefault()
    try{
      const loginToken = localStorage.getItem("loginToken")
      if(!loginToken){
        console.error("User not authenticated")
      }

      const formData = new FormData();
      formData.append("firmName",firmName)
      formData.append("area",area)
      formData.append("offers",offers);

      category.forEach((value)=>{
        formData.append("category",value)
      })

      region.forEach((value)=>{
        formData.append("region",value)
      })

      formData.append("image",file)

      const response = await fetch(`${API_URL}/firm/add-firm`,{
        method:"POST",
        headers:{
          "token":`${loginToken}`
        },
        body:formData
      })

      const data = await response.json()
      if(response.ok){
        console.log(data)
        alert("Firm added successfully")
        setFirmName("")
        setArea("")
        setCategory([])
        setRegion([])
        setOffers("")
        setFile(null)
      }else if(data.message === "vendor can have only one firm"){
        alert("Firm exists. Only 1 firm can be added")
      }else{
        alert("Failed to add Firm")
      }
      console.log("addfirm",data)
      const firmId = data.firmId;
      localStorage.setItem("firmId",firmId)
    }catch(err){
       console.error(err.message)
       alert("Failed to add firm")
    }
  }
  return (
    <div className='firmSection'>
      <form className='tableForm' onSubmit={handleFirmSubmit}>
        <h3>Add Firm</h3>
        <label>Firm name</label> 
        <input type='text' name='firmName' value={firmName} onChange={(e)=>setFirmName(e.target.value)}/>  
        <label>Area</label> 
        <input type='text' name='area' value={area} onChange={(e)=>setArea(e.target.value)}/>
        <div className='checkInp'>
          <label>Category</label>
          <div className='inputsContainer'>
          <div className='checkboxContainer'>
            <label>Veg</label>
            <input type='checkbox' checked={category.includes("veg")} value="veg" onChange={handleCategoryChange}/>
          </div>
          <div className='checkboxContainer'>
            <label>Non-Veg</label>
            <input type='checkbox' checked={category.includes("non-veg")} value="non-veg" onChange={handleCategoryChange}/>
          </div>
          </div>
        </div>
        <div className='checkInp'>
          <label>Region</label>
          <div className='inputsContainer'>
          <div className='checkboxContainer'>
            <label>South-Indian</label>
            <input type='checkbox' checked={region.includes("south-indian")} value="south-indian" onChange={handleRegionChange}/>
          </div>
          <div className='checkboxContainer'>
            <label>North-Indian</label>
            <input type='checkbox' checked={region.includes("north-indian")} value="north-indian" onChange={handleRegionChange}/>
          </div>
          <div className='checkboxContainer'>
            <label>Chinesee</label>
            <input type='checkbox' checked={region.includes("chinese")} value="chinese" onChange={handleRegionChange}/>
          </div>
          <div className='checkboxContainer'>
            <label>Backery</label>
            <input type='checkbox' checked={region.includes("backery")} value="backery" onChange={handleRegionChange}/>
          </div>
          </div>
        </div>
        <label>Offer</label> 
        <input type='text' name='offers' value={offers} onChange={(e)=>setOffers(e.target.value)}/> 
        <label>Firm Iamge</label> 
        <input type='file' name='file' onChange={handleImageUpload}/> 
        <div className='btnSubmit'>
            <button type='submit'>submit</button>        
        </div>     
      </form>
    </div>
  )
}

export default AddFirm

// import React, { useState } from 'react';
// import { API_URL } from '../data/apiPath';

// const AddFirm = () => {
//   const [firmName, setFirmName] = useState("");
//   const [area, setArea] = useState("");
//   const [category, setCategory] = useState([]);
//   const [region, setRegion] = useState([]);
//   const [offers, setOffers] = useState("");
//   const [file, setFile] = useState(null);

//   const handleCategoryChange = (event) => {
//     const value = event.target.value;
//     if (category.includes(value)) {
//       setCategory(category.filter((item) => item !== value));
//     } else {
//       setCategory([...category, value]);
//     }
//   };

//   const handleRegionChange = (event) => {
//     const value = event.target.value;
//     if (region.includes(value)) {
//       setRegion(region.filter((item) => item !== value));
//     } else {
//       setRegion([...region, value]);
//     }
//   };

//   const handleImageUpload = (event) => {
//     const selectedImage = event.target.files[0];
//     setFile(selectedImage);
//   };

//   const handleFirmSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const loginToken = localStorage.getItem("loginToken");
//       if (!loginToken) {
//         console.error("User not authenticated");
//         return;
//       }

//       const formData = new FormData();
//       formData.append("firmName", firmName);
//       formData.append("area", area);
//       formData.append("offers", offers);
//       category.forEach((value) => {
//         formData.append("category", value);
//       });
//       region.forEach((value) => {
//         formData.append("region", value);
//       });
//       formData.append("image", file);

//       const response = await fetch(`${API_URL}/firm/add-firm`, {
//         method: "POST",
//         headers: {
//           "token": `${loginToken}`,
//         },
//         body: formData,
//       });

//       const data = await response.json();
//       if (response.ok) {
//         alert("Firm added successfully");
//         setFirmName("");
//         setArea("");
//         setCategory([]);
//         setRegion([]);
//         setOffers("");
//         setFile(null);
//         localStorage.setItem("firmId", data.firmId);
//       } else if (data.message === "vendor can have only one firm") {
//         alert("Firm exists. Only 1 firm can be added");
//       } else {
//         alert("Failed to add Firm");
//       }
//     } catch (err) {
//       console.error(err.message);
//       alert("Failed to add firm");
//     }
//   };

//   return (
//     <div className='firmSection'>
//       <form className='tableForm' onSubmit={handleFirmSubmit}>
//         <h3>Add Firm</h3>
//         <label>Firm name</label> 
//         <input type='text' name='firmName' value={firmName} onChange={(e) => setFirmName(e.target.value)} />  
//         <label>Area</label> 
//         <input type='text' name='area' value={area} onChange={(e) => setArea(e.target.value)} />
//         <div className='checkInp'>
//           <label>Category</label>
//           <div className='inputsContainer'>
//             <div className='checkboxContainer'>
//               <label>Veg</label>
//               <input type='checkbox' checked={category.includes("veg")} value="veg" onChange={handleCategoryChange} />
//             </div>
//             <div className='checkboxContainer'>
//               <label>Non-Veg</label>
//               <input type='checkbox' checked={category.includes("non-veg")} value="non-veg" onChange={handleCategoryChange} />
//             </div>
//           </div>
//         </div>
//         <div className='checkInp'>
//           <label>Region</label>
//           <div className='inputsContainer'>
//             <div className='checkboxContainer'>
//               <label>South-Indian</label>
//               <input type='checkbox' checked={region.includes("south-indian")} value="south-indian" onChange={handleRegionChange} />
//             </div>
//             <div className='checkboxContainer'>
//               <label>North-Indian</label>
//               <input type='checkbox' checked={region.includes("north-indian")} value="north-indian" onChange={handleRegionChange} />
//             </div>
//             <div className='checkboxContainer'>
//               <label>Chinese</label>
//               <input type='checkbox' checked={region.includes("chinese")} value="chinese" onChange={handleRegionChange} />
//             </div>
//             <div className='checkboxContainer'>
//               <label>Bakery</label>
//               <input type='checkbox' checked={region.includes("bakery")} value="bakery" onChange={handleRegionChange} />
//             </div>
//           </div>
//         </div>
//         <label>Offer</label> 
//         <input type='text' name='offers' value={offers} onChange={(e) => setOffers(e.target.value)} /> 
//         <label>Firm Image</label> 
//         <input type='file' name='file' onChange={handleImageUpload} /> 
//         <div className='btnSubmit'>
//           <button type='submit'>Submit</button>        
//         </div>     
//       </form>
//     </div>
//   );
// };

// export default AddFirm;


