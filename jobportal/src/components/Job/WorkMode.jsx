import React from "react";

function WorkMode({user,setUser,error,setError}) {
    const handleChange=(e)=>{
        const name=e.target.name;
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
      <label htmlFor="workMode" className="label block mb-2">
        Work Mode *
      </label>
      <select id="workMode" className="select" name="workMode" value={user?.workMode} onChange={handleChange}>
        <option value="">Select work mode</option>
        <option value="on-site">On-site</option>
        <option value="remote">Remote</option>
        <option value="hybrid">Hybrid</option>
      </select>
                                               <span style={{color:"red"}}>
    {" "}
        {error.workMode}{" "}
    </span>

    </div>
  );
}

export default WorkMode;
