import { useContext } from "react"
import { JobContext } from "../context"

const useJobs=()=>{
    const{jobs,setJobs}=useContext(JobContext)
    return {jobs,setJobs}

}

export default useJobs