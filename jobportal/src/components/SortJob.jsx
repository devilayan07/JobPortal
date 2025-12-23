import React from 'react'
import useJobs from '../hooks/useJobs'

function SortJob() {
    const{jobs,setJobs}=useJobs()

    const sortJobs=(value)=>{
        if(!value) return

        const sortedJobs=[...jobs].sort((a,b)=>{
            if(value==="lowToHigh"){
               return ((a.salaryMin+a.salaryMax)/2)-((b.salaryMin+b.salaryMax)/2) 
            }else if(value==="highToLow"){
            return ((b.salaryMin+b.salaryMax)/2)-((a.salaryMin+a.salaryMax)/2) 

            }
            return 0
        })
        setJobs(sortedJobs)

    }
  return (
                    <div  >
                        <select
                            id="sortDropdown"
                            className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2  bg-white"
                            onChange={(e)=>sortJobs(e.target.value)}


                        >
                            <option
                                className="w-full text-left text-sm p-2 hover:bg-accent rounded"
                            >
                                selecet 
                            </option>

                            <option
                            value="highToLow"
                                className="w-full text-left text-sm p-2 hover:bg-accent rounded"
                            >
                                Salary (High to Low)
                            </option>
                            <option
                            value="lowToHigh"
                                className="w-full text-left text-sm p-2 hover:bg-accent rounded"
                            >
                                Salary (Low to High)
                            </option>
                        </select>
 
                    </div>
  )
}

export default SortJob
