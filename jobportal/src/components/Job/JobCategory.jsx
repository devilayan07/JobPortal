import React from "react";

function JobCategory({user,setUser,error,setError}) {
    const handleChange=(e)=>{
        const name=e.target.name
        const value=e.target.value
        setUser((prev)=>({
            ...prev,
            [name]:value
        }))
        setError((prev)=>({
            ...prev,
            [name]:value ? "" :`${name} is required`
        }))
    }
  return (
    <div>
      <label for="category" className="label block mb-2">
        Category *
      </label>
      <select id="category" className="select" name="category" value={user?.category} onChange={handleChange} >
        <option value="">Select category</option>
        <option value="engineering">Engineering</option>
        <option value="design">Design</option>
        <option value="product">Product</option>
        <option value="marketing">Marketing</option>
        <option value="sales">Sales</option>
        <option value="hr">Human Resources</option>
        <option value="finance">Finance</option>
        <option value="other">Other</option>
      </select>
                                                     <span style={{color:"red"}}>
    {" "}
        {error.category}{" "}
    </span>

    </div>
  );
}

export default JobCategory;
