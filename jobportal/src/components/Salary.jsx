import React, { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { salaryRanges } from "../utils/data";

function Salary({selectedSalary,setSelectedSalary}) {

  
    const[show,setShow]=useState(false)

    const handleSalaryChange=(event)=>{
      const value=event.target.value;
      const checked=event.target.checked;

      if(checked){
        setSelectedSalary([value])
      }else{
        setSelectedSalary([])
      }
     


    }

  return (
    <div className="dropdown">
      <button
        className="btn btn-outline text-xs h-8 px-3 flex items-center"
                onClick={()=>setShow(!show)}

      >
        Salary Range
        <ChevronDown className="ml-2 h-3 w-3" />
      </button>
      {show &&       <div id="salaryDropdown" className="dropdown-content card p-2">
        <div className="space-y-1">
          {
            salaryRanges?.map((range)=><label key={range?.id} className="flex items-center gap-2 p-2 hover:bg-accent rounded cursor-pointer">
            <input type="checkbox" className="rounded border-input" value={range?.id} checked={selectedSalary?.includes(range?.id)} onChange={handleSalaryChange} />
            <span className="text-sm">{range?.label}</span>
          </label>
)
          }
        </div>
      </div>
 }
    </div>
  );
}

export default Salary;
