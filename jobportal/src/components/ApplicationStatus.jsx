import React from 'react'

function ApplicationStatus({selectedStatus,setSelectedStatus}) {
    const handleChange=(e)=>{
        const name=e.target.name;
        const checked=e.target.checked;
        if(checked){
        setSelectedStatus((prev)=>[...prev,name])

        }else{
            const filterStatus=selectedStatus?.filter((item)=>item!==name)
            setSelectedStatus(filterStatus)
        }

    }
  return (
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-3">Application Status</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="New"
                    className="rounded border-[hsl(var(--color-input))]"
                    onChange={handleChange}
                    checked={selectedStatus.includes("New")}
                  />
                  <span className="text-sm">New</span>
                  <span className="ml-auto text-xs text-[hsl(var(--color-muted-foreground))]">
                    12
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="Shortlisted"
                    className="rounded border-[hsl(var(--color-input))]"
                    onChange={handleChange}
                     checked={selectedStatus.includes("Shortlisted")}


                  />
                  <span className="text-sm">Shortlisted</span>
                  <span className="ml-auto text-xs text-[hsl(var(--color-muted-foreground))]">
                    5
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="Interviewed"
                    className="rounded border-[hsl(var(--color-input))]"
                    onChange={handleChange}
                    checked={selectedStatus.includes("Interviewed")}


                  />
                  <span className="text-sm">Interviewed</span>
                  <span className="ml-auto text-xs text-[hsl(var(--color-muted-foreground))]">
                    3
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="Rejected"
                    className="rounded border-[hsl(var(--color-input))]"
                     onChange={handleChange}
                    checked={selectedStatus.includes("Rejected")}


                  />
                  <span className="text-sm">Rejected</span>
                  <span className="ml-auto text-xs text-[hsl(var(--color-muted-foreground))]">
                    2
                  </span>
                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="Hired"
                    className="rounded border-[hsl(var(--color-input))]"
                    onChange={handleChange}
                                        checked={selectedStatus.includes("Hired")}


                  />
                  <span className="text-sm">Hired</span>
                  <span className="ml-auto text-xs text-[hsl(var(--color-muted-foreground))]">
                    2
                  </span>
                </label>

              </div>
            </div>  )
}

export default ApplicationStatus
