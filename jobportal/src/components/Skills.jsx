import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
function Skills({skills,setSkills}) {
    const[show,setShow]=useState(false)

    const handleSkillChange=(event)=>{
      const name=event.target.name;
      const checked=event.target.checked;
      
      if(checked){
        setSkills((prev)=>[...prev,name])
      }else{
        const filtered=skills.filter((item)=>item!==name)
        setSkills(filtered)
      }

    }
  return (
    <div className="dropdown">
      <button
        className="btn btn-outline text-xs h-8 px-3 flex items-center"
        onClick={()=>setShow(!show)}
      >
        Skills
        <ChevronDown className="ml-2 h-3 w-3" />
      </button>
      {show && <div id="skillsDropdown" className="dropdown-content card p-2">
        <div className="space-y-1">
          <label className="flex items-center gap-2 p-2 hover:bg-accent rounded cursor-pointer">
            <input type="checkbox" name="React" className="rounded border-input" checked={skills.includes("React")} onChange={handleSkillChange} />
            <span className="text-sm">React</span>
          </label>
          <label className="flex items-center gap-2 p-2 hover:bg-accent rounded cursor-pointer">
            <input type="checkbox" name="Node.js" className="rounded border-input" checked={skills.includes("Node.js")} onChange={handleSkillChange} />
            <span className="text-sm">Node.js</span>
          </label>
          <label className="flex items-center gap-2 p-2 hover:bg-accent rounded cursor-pointer">
            <input type="checkbox" name="Python" className="rounded border-input" checked={skills.includes("Python")} onChange={handleSkillChange} />
            <span className="text-sm">Python</span>
          </label>
          <label className="flex items-center gap-2 p-2 hover:bg-accent rounded cursor-pointer">
            <input type="checkbox" name="TypeScript" className="rounded border-input" checked={skills.includes("TypeScript")} onChange={handleSkillChange}/>
            <span className="text-sm">TypeScript</span>
          </label>
        </div>
      </div>
 }
    </div>
  );
}

export default Skills;
