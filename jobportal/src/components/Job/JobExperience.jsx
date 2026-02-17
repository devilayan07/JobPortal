import React from "react";

function JobExperience({user,setUser,error,setError}) {
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
      <label for="experience" className="label block mb-2">
        Experience Level *
      </label>
      <select id="experience" name="experienceLevel" className="select" value={user?.experienceLevel} onChange={handleChange}>
        <option value="">Select experience level</option>
        <option value="entry">Entry Level (0-2 years)</option>
        <option value="mid">Mid Level (2-5 years)</option>
        <option value="senior">Senior Level (5-10 years)</option>
        <option value="lead">Lead (10+ years)</option>
      </select>
                                                     <span style={{color:"red"}}>
    {" "}
        {error.experienceLevel}{" "}
    </span>

    </div>
  );
}

export default JobExperience;
