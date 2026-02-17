import React from "react";

function ApplicationStatusFilter({ status, setStatus }) {

  const handleStatusChange=(e)=>{
    const name=e.target.name;
    const checked=e.target.checked;
    
    if(checked){
      setStatus((prev)=>[...prev,name])
    }else{
      const filterStatus=status.filter((item)=>item!==name)
      setStatus(filterStatus)
    }
  }
  return (
    <div className="mb-6">
      <h4 className="text-sm font-medium mb-3">Application Status</h4>
      <div className="space-y-2">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            name="new"
            type="checkbox"
            className="rounded border-[hsl(var(--color-input))]"
            checked={status.includes("new")}
            onChange={handleStatusChange}
          />
          <span className="text-sm">New Applications</span>
          <span className="ml-auto text-xs text-[hsl(var(--color-muted-foreground))]">
            (8)
          </span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="shortlisted"
            checked={status.includes("shortlisted")}
            className="rounded border-[hsl(var(--color-input))]"
            onChange={handleStatusChange}
          />
          <span className="text-sm">Shortlisted</span>
          <span className="ml-auto text-xs text-[hsl(var(--color-muted-foreground))]">
            (8)
          </span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="interviewed"
            checked={status.includes("interviewed")}
            className="rounded border-[hsl(var(--color-input))]"
            onChange={handleStatusChange}
          />
          <span className="text-sm">Interviewed</span>
          <span className="ml-auto text-xs text-[hsl(var(--color-muted-foreground))]">
            (5)
          </span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="rejected"
            checked={status.includes("rejected")}
            className="rounded border-[hsl(var(--color-input))]"
            onChange={handleStatusChange}
          />
          <span className="text-sm">Rejected</span>
          <span className="ml-auto text-xs text-[hsl(var(--color-muted-foreground))]">
            (3)
          </span>
        </label>
      </div>
    </div>
  );
}

export default ApplicationStatusFilter;
