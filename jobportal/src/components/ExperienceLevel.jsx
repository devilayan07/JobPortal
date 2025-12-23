import React, {  useState } from "react";
import { ChevronDown } from "lucide-react";

function ExperienceLevel({selectedExperience,setSelectedExperience}) {
    const[show,setShow]=useState(false)

    const handleExperience=(event)=>{
         setSelectedExperience(event.target.value)
    }
  return (
    <div className="dropdown">
      <button
        className="btn btn-outline text-xs h-8 px-3 flex items-center"
        onClick={()=>setShow(!show)}
      >
        Experience Level
        <ChevronDown className="ml-2 h-3 w-3" />
      </button>
      {show &&        <div id="experienceDropdown" className="dropdown-content card p-2">
        <div className="space-y-1">
          <label className="flex items-center gap-2 p-2 hover:bg-accent rounded cursor-pointer">
            <input type="radio" className="rounded border-input" name="experience" value={"Entry"} checked={selectedExperience?.includes("Entry")} onChange={handleExperience} />
            <span className="text-sm">Entry Level</span>
          </label>
          <label className="flex items-center gap-2 p-2 hover:bg-accent rounded cursor-pointer">
            <input type="radio" className="rounded border-input" name="experience" value={"Mid"} checked={selectedExperience?.includes("Mid")} onChange={handleExperience}/>
            <span className="text-sm">Mid Level</span>
          </label>
          <label className="flex items-center gap-2 p-2 hover:bg-accent rounded cursor-pointer">
            <input type="radio" className="rounded border-input" name="experience" value={"Senior"} checked={selectedExperience?.includes("Senior")} onChange={handleExperience} />
            <span className="text-sm">Senior Level</span>
          </label>
          <label className="flex items-center gap-2 p-2 hover:bg-accent rounded cursor-pointer">
            <input type="radio" className="rounded border-input" name="experience" value={"Lead"} checked={selectedExperience?.includes("Lead")} onChange={handleExperience} />
            <span className="text-sm">Lead</span>
          </label>
        </div>
      </div>
  }
    </div>
  );
}

export default ExperienceLevel;
