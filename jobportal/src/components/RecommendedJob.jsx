import React, { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import RecommendedJobCard from "./RecommendedJobCard";
import { Link } from "react-router-dom";


function RecommendedJob() {
    const[recommendedJob,setRecommendedJob]=useState([])
    const{axiosInstance}=useAxios()
    
    const fetchRecommendedJob=async()=>{
        try {
            const response=await axiosInstance.get(`${import.meta.env.VITE_SERVER_BASE_URL}/jobs/recommendations`)
            console.log(response?.data?.data)
            setRecommendedJob(response?.data?.data)
            
        } catch (error) {
            console.log(error)
            
        }
    }

    useEffect(()=>{
        fetchRecommendedJob()
    },[])


    
  return (
    <>
        <div className="card p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Recommended for You</h2>
        <Link
          to={"/"}
          className="text-sm text-[hsl(var(--color-primary))] hover:underline"
        >
          Browse All Jobs
        </Link>
      </div>
      <div className="space-y-4">
        {Array.isArray(recommendedJob) && recommendedJob?.map((item)=><RecommendedJobCard key={item?.id} item={item} fetchRecommendedJob={fetchRecommendedJob}/>)}


      </div>
    </div>
    </>

  );
}

export default RecommendedJob;
