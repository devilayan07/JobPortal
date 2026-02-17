import React,{useState} from 'react'
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import AppliedJobModal from "./AppliedJobModal";
import useAppliedJob from "../hooks/useAppliedJob";
import { useNavigate,Link } from 'react-router-dom';
import { Cpu } from "lucide-react";
import { MapPin } from "lucide-react";
import axiosInstance from '../api/axiosInstance';


function RecommendedJobCard({item,fetchRecommendedJob}) {
        const{auth}=useAuth()
    const[showModal,setShowModal]=useState(false)
    const navigate=useNavigate()
    const {fetchAppliedJob,appliedJob}=useAppliedJob()

    const appliedJobIds=appliedJob?.map((item)=>item?.jobId)
    const appliedJobId=appliedJobIds?.includes(item?.id)

        const handleNavigate=()=>{
    toast("Please login to apply for a job")
        navigate("/login")
    }

    const handleWithDrawApplication=async(jobId)=>{
        const filterJobs=appliedJob?.filter((item)=>item?.jobId===jobId)
        const filterJobId=filterJobs[0].id
        try {
          const response=await axiosInstance.delete(`${import.meta.env.VITE_SERVER_BASE_URL}/applications/${filterJobId}`)
          if(response?.status===200){
            toast.success(response?.data?.message)
            await fetchAppliedJob()
            await fetchRecommendedJob()
          }
          
        } catch (error) {
          console.log(error)
        }

    }

  return (
    <>
            <article key={item?.id} className="border border-[hsl(var(--color-border))] rounded-lg p-4 hover:shadow-md transition-shadow">
          <div className="flex items-start gap-4">
            <div className="shrink-0">
              <div className="h-12 w-12 rounded-lg bg-[hsl(var(--color-secondary))] flex items-center justify-center">
                <Cpu className="h-6 w-6 text-[hsl(var(--color-primary))]"/>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h3 className="font-semibold mb-1">
                    <Link to={`/jobDetails/${item?.slug}`} className="hover:underline">
                        {item?.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-[hsl(var(--color-muted-foreground))]">
                    {item?.company?.name}
                  </p>
                </div>
              </div>
              <p className="text-sm text-[hsl(var(--color-muted-foreground))] mb-3">
                {item?.description}
              </p>
              <div  className="flex flex-wrap gap-2 mb-3">
              {Array.isArray(item?.skills) && item?.skills?.map((item)=><span key={item} className="badge badge-secondary">{item}</span>)}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs text-[hsl(var(--color-muted-foreground))]">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3"/>
                    {item?.workMode}
                  </span>
                  <span className="font-semibold text-[hsl(var(--color-primary))]">
                    ${item?.salaryMin}k - ${item?.salaryMax}k
                  </span>
                </div>
                <div className="flex gap-2">
                  <Link
                  to={`/jobDetails/${item?.slug}`}
                    className="btn btn-outline text-xs h-8"
                  >
                    View Details
                  </Link>
                  {auth?.user ? (appliedJobId ? (<button onClick={()=>handleWithDrawApplication(item?.id)} className="btn px-4 py-2 bg-red-500 text-xs h-8">
                    WithDrawApplication
                  </button>) :(<button onClick={()=>setShowModal(true)} className="btn btn-primary text-xs h-8">
                    Apply Now
                  </button>) )  :( <button onClick={handleNavigate} className="btn btn-primary text-xs h-8">
                    Apply Now
                  </button>
)  }
                </div>
              </div>
            </div>
          </div>
        </article>
        {showModal && <AppliedJobModal jobId={item?.id} onClose={()=>setShowModal(false)} fetchAppliedJob={fetchAppliedJob} fetchRecommendedJob={fetchRecommendedJob}/>}
    </>
    )
}

export default RecommendedJobCard
