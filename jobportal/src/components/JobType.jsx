import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

function JobType({jobType,setJobType}) {
    const[showJob,setShowJob]=useState(false)

    const handleShowJobType=()=>{
        setShowJob(!showJob)
    }

    const handleJobChange=(event)=>{
        const name=event.target.name;
        const checked=event.target.checked
        if(checked){
            setJobType((prev)=>[...prev,name])
        }else{
            const filtered=jobType?.filter((item)=>item!==name)
            setJobType(filtered)
        }
    }
  return (
    <div className="dropdown">
      <button
        className="btn btn-outline text-xs h-8 px-3 flex items-center"
        onClick={handleShowJobType}
      >
        Job Type
        <ChevronDown className="ml-2 h-3 w-3" />
      </button>
      {showJob && <div id="jobTypeDropdown" className="dropdown-content card p-2">
        <div className="space-y-1">
          <label className="flex items-center gap-2 p-2 hover:bg-accent rounded cursor-pointer">
            <input type="checkbox" name="Full-time" value="Full-time" className="rounded border-input" checked={jobType?.includes("Full-time")} onChange={handleJobChange} />
            <span className="text-sm">Full-time</span>
          </label>
          <label className="flex items-center gap-2 p-2 hover:bg-accent rounded cursor-pointer">
            <input type="checkbox" name="Part-time" value="Part-time" className="rounded border-input" checked={jobType?.includes("Part-time")} onChange={handleJobChange} />
            <span className="text-sm">Part-time</span>
          </label>
          <label className="flex items-center gap-2 p-2 hover:bg-accent rounded cursor-pointer">
            <input type="checkbox" name="Contract" value="Contract" className="rounded border-input" checked={jobType?.includes("Contract")} onChange={handleJobChange} />
            <span className="text-sm">Contract</span>
          </label>
          <label className="flex items-center gap-2 p-2 hover:bg-accent rounded cursor-pointer">
            <input type="checkbox" name="Internship" value="Internship" className="rounded border-input" checked={jobType?.includes("Internship")} onChange={handleJobChange}/>
            <span className="text-sm">Internship</span>
          </label>
        </div>
      </div>
  }
    </div>
  );
}

export default JobType;
