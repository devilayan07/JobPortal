import { useContext } from "react"
import { AppliedJobContext } from "../context"

const useAppliedJob=()=>{
    const{appliedJob,setAppliedJob,fetchAppliedJob,selectJobOrder,setSelectJobOrder,selectedStatus,setSelectedStatus,selectedDate,setSelectedDate}=useContext(AppliedJobContext)

    return {appliedJob,setAppliedJob,fetchAppliedJob,selectJobOrder,setSelectJobOrder,selectedStatus,setSelectedStatus,selectedDate,setSelectedDate}
}

export default useAppliedJob