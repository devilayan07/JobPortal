import React, { useState,useEffect } from 'react'
import { AppliedJobContext } from '../context'
import useAxios from "../hooks/useAxios";
import useAuth from '../hooks/useAuth';


function AppliedJobProvider({children}) {
const[appliedJob,setAppliedJob]=useState([])
  const[selectJobOrder,setSelectJobOrder]=useState("")
  const[selectedStatus,setSelectedStatus]=useState([])
  const[selectedDate,setSelectedDate]=useState("")
  const{auth}=useAuth()

      const {axiosInstance}=useAxios()


  const fetchAppliedJob=async({selectJobOrder="",selectedStatus=[],selectedDate=""}={})=>{
    try {
      const params=new URLSearchParams()
      params.append("sort",selectJobOrder)
      params.append("date",selectedDate)
     if(selectedStatus?.length) params.append("status",selectedStatus.join(","))
      const response=await axiosInstance.get(`${import.meta.env.VITE_SERVER_BASE_URL}/applications/my-applications?${params.toString()}`)
      console.log(response?.data?.data)
       if(response?.status===200){
        setAppliedJob(response?.data?.data)
       }
      
    } catch (error) {
      console.log(error)
      
    }
  }

    useEffect(()=>{
      if(auth?.role==="USER"){
        fetchAppliedJob({selectJobOrder,selectedStatus,selectedDate})
      }
    },[auth,selectJobOrder,selectedStatus,selectedDate])
  

    
  return (
    <AppliedJobContext.Provider value={{appliedJob,setAppliedJob,fetchAppliedJob,selectJobOrder,setSelectJobOrder,selectedStatus,setSelectedStatus,selectedDate,setSelectedDate}}>
        {children}
    </AppliedJobContext.Provider>
  )
}

export default AppliedJobProvider
