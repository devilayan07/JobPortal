import React from "react";
import { X } from "lucide-react";
function EditSkills({skills,addSkills,setAddSkills,setUser}) {
  const handleAddSkills=()=>{
    if(!addSkills.trim()) return;

    setUser((prev)=>({
      ...prev,
      skills:[...prev.skills,addSkills.trim()]
    }))
    setAddSkills("")

  }

  const handleRemoveSkills=(skill)=>{
    const filteredSkills=skills.filter((item)=>item!==skill)
    setUser((prev)=>({
      ...prev,
      skills:filteredSkills
    }))
  }
  return (
    <div className="card p-6">
      <h2 className="text-xl font-semibold mb-6">Skills</h2>
      <div className="mb-4">
        <label for="skillInput" className="label block mb-2">
          Add Skills
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            id="skillInput"
            className="input flex-1"
            name="skills"
            placeholder="Type a skill and press Enter"
            value={addSkills}
            onChange={(e)=>{console.log(e.target.value),setAddSkills(e.target.value)}}
          />
          <button type="button" className="btn btn-primary" onClick={handleAddSkills}>
            <i data-lucide="plus" className="h-4 w-4 mr-2"></i>
            Add
          </button>
        </div>
        <p className="text-xs text-[hsl(var(--color-muted-foreground))] mt-2">
          Add skills relevant to your profession. Press Enter or click Add to
          add each skill.
        </p>
      </div>
      <div>
        <label className="label block mb-3">Current Skills</label>
        <div className="flex flex-wrap gap-2">
          {skills?.map((skill,index)=><span key={index} className="badge badge-secondary inline-flex items-center gap-1">
            {skill}
            <button type="button" className="hover:text-red-600" onClick={()=>handleRemoveSkills(skill)}>
            <X className="h-3 w-3" />
            </button>
          </span>)}


        </div>
      </div>
    </div>
  );
}

export default EditSkills;
