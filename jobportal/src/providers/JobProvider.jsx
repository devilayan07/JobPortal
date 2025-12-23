import { useState } from "react"
import { JobContext } from "../context"

const JobProvider=({children})=>{
    const[jobs,setJobs]=useState([])
  return(
    <JobContext.Provider value={{jobs,setJobs}}>
        {children}
    </JobContext.Provider>
  )
}

export default JobProvider