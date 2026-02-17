import React from 'react'

function ExperienceFilter({experience,setExperience}) {
  const handleExperienceChange=(e)=>{
    const name=e.target.name;
    const checked=e.target.checked;
    if(checked){
      setExperience((prev)=>[...prev,name])
    }else{
      const filterExperience=experience.filter((item)=>item!==name)
      setExperience(filterExperience)
    }
  }
  return (
            <div className="mb-6">
              <h4 className="text-sm font-medium mb-3">Experience Level</h4>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="rounded border-[hsl(var(--color-input))]"
                    name="entry"
                    onChange={handleExperienceChange}
                  />
                  <span className="text-sm">Entry Level (0-2 years)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="mid"
                    className="rounded border-[hsl(var(--color-input))]"
                    onChange={handleExperienceChange}

                  />
                  <span className="text-sm">Mid Level (3-5 years)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="rounded border-[hsl(var(--color-input))]"
                    name="senior"
                    onChange={handleExperienceChange}
                  />
                  <span className="text-sm">Senior (5+ years)</span>
                </label>
              </div>
            </div>  )
}

export default ExperienceFilter
