import React from "react";

function JobTypeForCreation({user,setUser,error,setError}) {
  const handleChange=(e)=>{
    const name=e.target.name;
    const value=e.target.value
    setUser((prev)=>({
      ...prev,
      [name]:value
    }))
    setError((prev)=>({
      ...prev,
      [name]:value? "" :`${name} is required`
    }))
  }
  return (
    <div>
      <label for="jobType" className="label block mb-2">
        Job Type *
      </label>
      <select id="jobType" className="select" name="type" value={user?.type} onChange={handleChange}>
        <option value="">Select job type</option>
        <option value="full-time">Full-time</option>
        <option value="part-time">Part-time</option>
        <option value="contract">Contract</option>
        <option value="freelance">Freelance</option>
        <option value="internship">Internship</option>
      </select>
                                         <span style={{color:"red"}}>
    {" "}
        {error.type}{" "}
    </span>

    </div>
  );
}

export default JobTypeForCreation;
