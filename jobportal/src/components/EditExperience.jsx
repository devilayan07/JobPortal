import React from "react";
import {formatDateForInput } from "../utils";
import { Trash2 } from "lucide-react";
function EditExperience({experience=[],setUser}) {

  const handleChange=(e,index)=>{
    const name=e.target.name;
    const value=e.target.value;

    setUser(prev=>{
      const updatedExperience=[...prev.experience]
      updatedExperience[index]={
          ...updatedExperience[index],
          [name]:value

      };
      return {...prev,experience:updatedExperience}
    })

  }

  const handleAddExperience=()=>{
    setUser(prev=>({
      ...prev,
      experience:[
                ...prev.experience,
        {
          companyName: "",
          employmentType: "",
          startDate: "",
          endDate: ""
        }

      ]
    }))
    
  }

  const handleRemoveExperience=(index)=>{
    setUser(prev=>({
      ...prev,
      experience:prev.experience.filter((_,i)=>i!==index)
    }))
  }
  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Work Experience</h2>
        <button type="button" className="btn btn-outline" onClick={handleAddExperience}>
          <i data-lucide="plus" className="h-4 w-4 mr-2"></i>
          Add Experience
        </button>
      </div>

      <div className="space-y-6">
        {experience?.map((item,index)=><div key={index} className="p-4 border border-[hsl(var(--color-border))] rounded-lg">
          <div className="flex items-start justify-between mb-4">
            <h3 className="font-medium">Experience{index+1}</h3>
            {/* <!-- Remove should be implemented on the local state until the user saves the changes. --> */}
            <button
              type="button"
              className="btn-ghost p-1 text-red-600 hover:bg-red-50"
              onClick={()=>handleRemoveExperience(index)}
            >
              <Trash2 className="h-4 w-4"/>
            </button>
          </div>
          <div  className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label block mb-2">Company</label>
              <input type="text" name="companyName" className="input" value={item?.companyName} onChange={(e)=>handleChange(index,e)}/>
            </div>
            <div>
              <label className="label block mb-2">Employment Type</label>
              <input type="text" name="employmentType" className="input" value={item?.employmentType}  onChange={(e)=>handleChange(index,e)}/>
            </div>
            <div>
              <label className="label block mb-2">Start Date</label>
              <input type="date" className="input" name="startDate" value={formatDateForInput(item?.startDate)} onChange={(e)=>handleChange(index,e)}/>
            </div>
            <div>
              <label className="label block mb-2">End Date</label>
              <input type="date" className="input" name="endDate" placeholder="Present" value={formatDateForInput(item?.endDate)} onChange={(e)=>handleChange(index,e)}/>
            </div>
          </div>

        </div>)}

      </div>
    </div>
  );
}

export default EditExperience;
