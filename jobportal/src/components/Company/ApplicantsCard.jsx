import React from 'react'
import { Mail } from 'lucide-react'
import { Briefcase } from 'lucide-react'
import { Calendar } from 'lucide-react'
import { getDateMonthYear } from '../../utils'
import { FileText } from 'lucide-react'
import { UserCheck } from 'lucide-react'
import { XCircle } from 'lucide-react'
import useAxios from '../../hooks/useAxios'
import { toast } from 'react-toastify'
const statusClasses = {
  new: "badge-info",
  success: "badge-success",
  rejected: "badge-rejected",
};


function ApplicantsCard({item,fetchApplicants}) {
    const{axiosInstance}=useAxios()

    const handleJobStatus=async(status)=>{
        alert("hello")
        const payload={
            status:status
        }
        try {
            const response=await axiosInstance.patch(`${import.meta.env.VITE_SERVER_BASE_URL}/applications/${item?.id}/status`,payload)
            if(response?.status===200){
                toast.success("Job status updated successfully")
  fetchApplicants({ reset: true, pageNo: 1 });
            }
            
        } catch (error) {
            console.log(error)
            
        }
    }
  return (
            <div className="card p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="shrink-0">
                  <div className="h-16 w-16 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold">
                    JD
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-lg font-semibold mb-1">{item?.user?.name}</h3>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-[hsl(var(--color-muted-foreground))]">
                        <span className="flex items-center gap-1">
                            <Mail className="h-3 w-3"/>
                            {item?.user?.email}
                        </span>
                        <span className="flex items-center gap-1">
                            <Briefcase className="h-3 w-3" />
                            {item?.user?.experienceLevel}
                        </span>
                        <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3"/>
                            {getDateMonthYear(item?.createdAt)}
                        </span>
                      </div>
                    </div>
                    <span className={`badge ${statusClasses[item?.status?.toLowerCase()] || "badge-info"}`}>{item?.status}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="badge badge-secondary">JavaScript</span>
                    <span className="badge badge-secondary">React</span>
                    <span className="badge badge-secondary">Node.js</span>
                    <span className="badge badge-secondary">TypeScript</span>
                    <span className="badge badge-secondary">AWS</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <a href="#" className="btn btn-outline text-sm h-9">
                      <i data-lucide="eye" className="h-3 w-3 mr-2"></i>
                      View Profile
                    </a>
                    <a href="#" className="btn btn-outline text-sm h-9">
                      <i data-lucide="file-text" className="h-3 w-3 mr-2"></i>
                      Resume
                    </a>
                    <button className="btn btn-primary text-sm h-9" onClick={()=>handleJobStatus("Shortlisted")}>
                        <UserCheck className="h-3 w-3 mr-2"/>
                      Shortlist
                    </button>
                    <button className="btn btn-outline text-sm h-9 text-red-600 hover:text-red-600" onClick={()=>handleJobStatus("Rejected")}>
                        <XCircle className="h-3 w-3 mr-2"/>
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            </div>  )
}

export default ApplicantsCard
