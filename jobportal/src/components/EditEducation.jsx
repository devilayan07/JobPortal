import React from "react";
import { Trash2 } from "lucide-react";
import { formatDateForInput } from "../utils";
import { Plus } from "lucide-react";

function EditEducation({ education, setUser }) {
  const handleChange = (e, index) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser((prev) => {
      const updatedEducation = [...prev.education];
      updatedEducation[index] = {
        ...updatedEducation[index],
        [name]: value,
      };

      return { ...prev, education: updatedEducation };
    });
  };

  const handleAddEducation=()=>{
    setUser(prev=>({
        ...prev,
        education:[
            ...prev.education,
            {
                      schoolName:"",
      degree:"",
      fieldOfStudy:"",
      startDate:"",
      endDate:""

            }
        ]

    }))
  }

  const handleRemoveEducation = (index) => {
    const filterEducation = education?.filter((_, i) => index !== i);
    setUser((prev) => ({
      ...prev,
      education: filterEducation,
    }));
  };


  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Education</h2>
        <button type="button" className="btn btn-outline" onClick={handleAddEducation}>
            <Plus className="w-4 h-4"/>
          Add Education
        </button>
      </div>

      {education?.map((item, index) => (
        <div
          key={index}
          className="p-4 border border-[hsl(var(--color-border))] rounded-lg"
        >
          <div className="flex items-start justify-between mb-4">
            <h3 className="font-medium">
                Education{index+1}
            </h3>

            <button
              type="button"
              className="btn-ghost p-1 text-red-600 hover:bg-red-50"
              onClick={() => handleRemoveEducation(index)}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label block mb-2">Institution</label>
              <input
                type="text"
                className="input"
                name="schoolName"
                value={item?.schoolName}
                onChange={(e) => handleChange(e, index)}
              />
            </div>
            <div>
              <label className="label block mb-2">Degree</label>
              <input
                type="text"
                className="input"
                name="degree"
                value={item?.degree}
                onChange={(e) => handleChange(e, index)}
              />
            </div>
            <div>
              <label className="label block mb-2">Start Year</label>
              <input
                type="date"
                className="input"
                name="startDate"
                value={formatDateForInput(item?.startDate)}
                onChange={(e) => handleChange(e, index)}
              />
            </div>
            <div>
              <label className="label block mb-2">End Year</label>
              <input
                type="date"
                className="input"
                name="endDate"
                value={formatDateForInput(item?.endDate)}
                onChange={(e) => handleChange(e, index)}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default EditEducation;
