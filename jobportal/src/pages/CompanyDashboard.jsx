import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import { Briefcase,Clock,MapPin,Star,Users,Edit, Eye, User, Download, List, Settings,Plus } from "lucide-react";
import { getDateMonthYear } from "../utils";
import CreateJob from "./CreateJob";
import { Link } from "react-router-dom";
import ResumeModal from "../components/ResumeModal";
function CompanyDashboard() {
  const {auth}=useAuth()
  const {axiosInstance}=useAxios()
  const[loading,setLoading]=useState(false)
  const[dashboardstats,setDashboardStats]=useState([])
  const[recentJobs,setRecentJobs]=useState([])
  const companySlug=localStorage.getItem("slug")
  const[jobToUpdate,setJobToUpdate]=useState(null)
  const[recentApplicants,setRecentApplicants]=useState([])
  const[showModal,setShowModal]=useState(false)
  const[resumeUrl,setResumeUrl]=useState(null)
  
  const fetchCompanyDashboardStats=async()=>{
    setLoading(true)
    try {
      const response=await axiosInstance.get(`${import.meta.env.VITE_SERVER_BASE_URL}/companies/dashboard/stats`)
      if(response?.status===200){
        setDashboardStats(response?.data?.data)
      }
      
    } catch (error) {
      console.log(error)
      
    }finally{
      setLoading(false)
    }

  }

   const fetchRecentJobByCompany=async()=>{
     setLoading(false)
     try {
      const response=await axiosInstance.get(`${import.meta.env.VITE_SERVER_BASE_URL}/companies/${companySlug}/jobs`)
      if(response?.status===200){
        setRecentJobs(response?.data?.data.slice(0,5))
      }
      
     } catch (error) {
      console.log(error)
      
     }finally{
      setLoading(false)
     }
   }

   
  useEffect(()=>{
    fetchCompanyDashboardStats()
    fetchRecentJobByCompany()
    fetchRecentApplicants()
  },[])

  const fetchRecentApplicants=async()=>{
    setLoading(true)
    try {
      const response=await axiosInstance.get(`${import.meta.env.VITE_SERVER_BASE_URL}/companies/applicants?sort="newest"`)
      if(response?.status===200){
        setRecentApplicants(response?.data?.data)
      }
      
    } catch (error) {
      console.log(error)
      
    }finally{
      setLoading(false)
    }
  }

  const handleJobEdit=(item)=>{
    setJobToUpdate(item)

  }

  const handleResume=(url)=>{
    console.log(url,"url")
    setResumeUrl(url)
  }

  return (
    <>
    {jobToUpdate ? <CreateJob jobToUpdate={jobToUpdate} onCreate={() => {
            setJobToUpdate(null);
          }}  /> :         <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {auth?.profile?.name}👋</h1>
        <p className="text-[hsl(var(--color-muted-foreground))]">
          Here's what's happening with your job postings today
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
              <Briefcase className="h-6 w-6 text-blue-600"/>
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-1">{dashboardstats?.activeJobs}</h3>
          <p className="text-sm text-[hsl(var(--color-muted-foreground))]">
            Active Jobs
          </p>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center">
              <Users className="h-6 w-6 text-green-600"/>
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-1">{dashboardstats?.totalApplicants}</h3>
          <p className="text-sm text-[hsl(var(--color-muted-foreground))]">
            Total Applicants
          </p>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="h-12 w-12 rounded-lg bg-yellow-100 flex items-center justify-center">
              <Clock className="h-6 w-6 text-yellow-600"/>
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-1">{dashboardstats?.pendingReviews}</h3>
          <p className="text-sm text-[hsl(var(--color-muted-foreground))]">
            Pending Reviews
          </p>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center">
              <Star className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-1">{dashboardstats?.shortLists}</h3>
          <p className="text-sm text-[hsl(var(--color-muted-foreground))]">
            Shortlisted
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <div className="p-6 border-b border-[hsl(var(--color-border))]">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Recent Job Posts</h2>
                {/* <a
                  href="#"
                  className="text-sm text-[hsl(var(--color-primary))] hover:underline"
                >
                  View All
                </a> */}
              </div>
            </div>
            <div className="divide-y divide-[hsl(var(--color-border))]">
              {
                Array.isArray(recentJobs) && recentJobs?.map((job)=><div key={job?.id} className="p-6 hover:bg-[hsl(var(--color-accent))] transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">
                      <a
                        href="#"
                        className="hover:text-[hsl(var(--color-primary))]"
                      >
                        {job?.title}
                      </a>
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-[hsl(var(--color-muted-foreground))]">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3"/>
                        {job?.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Briefcase className="h-3 w-3"/>
                        {job?.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3"/>
                         {getDateMonthYear(job?.updatedAt)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-[hsl(var(--color-muted-foreground))]">
                      <span className="font-semibold text-[hsl(var(--color-foreground))]">
                        {job?.applicants}
                      </span>
                      applicants
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link to={`/jobDetails/${job?.slug}`} className="btn btn-outline text-xs h-8">
                      <Eye className="h-3 w-3 mr-1"/>
                      View
                    </Link>
                    <button className="btn btn-outline text-xs h-8" onClick={()=>handleJobEdit(job)}>
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </button>
                  </div>
                </div>
              </div>)
              }



            </div>
          </div>

          <div className="card">
            <div className="p-6 border-b border-[hsl(var(--color-border))]">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Recent Applicants</h2>
                {/* <a
                  href="#"
                  className="text-sm text-[hsl(var(--color-primary))] hover:underline"
                >
                  View All
                </a> */}
              </div>
            </div>
            <div className="divide-y divide-[hsl(var(--color-border))]">
              {Array.isArray(recentApplicants) && recentApplicants?.map((item)=><div key={item?.id} className="p-6 hover:bg-[hsl(var(--color-accent))] transition-colors">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-[hsl(var(--color-secondary))] flex items-center justify-center flex-shrink-0">
                    <User  className="h-6 w-6 text-[hsl(var(--color-primary))]"/>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold mb-1">{item?.user?.name}</h3>
                        <p className="text-sm text-[hsl(var(--color-muted-foreground))]">
                          Applied for
                          <span className="font-medium text-[hsl(var(--color-foreground))]">
                            {item?.job?.title}
                          </span>
                        </p>
                      </div>
                      <span className="text-xs text-[hsl(var(--color-muted-foreground))]">
                        {getDateMonthYear(item?.createdAt)}
                      </span>
                    </div>
                    {/* <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="badge badge-secondary">React</span>
                      <span className="badge badge-secondary">Node.js</span>
                      <span className="badge badge-secondary">AWS</span>
                    </div> */}
                    <div className="flex items-center gap-2">
                      <button className="btn btn-primary text-xs h-8">
                        <i data-lucide="check" className="h-3 w-3 mr-1"></i>
                        Shortlist
                      </button>
                      <button className="btn btn-outline text-xs h-8">
                        <i data-lucide="eye" className="h-3 w-3 mr-1"></i>
                        View Profile
                      </button>
                      <button className="btn btn-outline text-xs h-8" onClick={()=>{setShowModal(!showModal),handleResume(item?.resumeUrl)}}>
                        <Download className="h-3 w-3 mr-1"/>
                        Resume
                      </button>
                    </div>
                  </div>
                </div>
              </div>)}



            </div>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="card p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Link to="/createJob" className="btn btn-primary w-full justify-start">
              <Plus className="h-4 w-4 mr-2"/>
                Post New Job
              </Link>
              <Link to="/managejobs" className="btn btn-outline w-full justify-start">
              <List className="h-4 w-4 mr-2"/>
                Manage Jobs
              </Link>
              <Link to="/applicants" className="btn btn-outline w-full justify-start">
              <Users className="h-4 w-4 mr-2"/>
                View Applicants
              </Link>
              <Link to="/companySetting" className="btn btn-outline w-full justify-start">
              <Settings className="h-4 w-4 mr-2"/>
                Company Settings
              </Link>
            </div>
          </div>

          <div className="card p-6 bg-blue-50 border-blue-200">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                <i data-lucide="lightbulb" className="h-5 w-5 text-white"></i>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-blue-900">Pro Tip</h4>
                <p className="text-sm text-blue-800">
                  Jobs with detailed descriptions get 40% more quality
                  applicants. Keep your postings updated!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>}

    {showModal && <ResumeModal resumeUrl={resumeUrl} onClose={()=>setShowModal(false)}/>}

    </>

  );
}

export default CompanyDashboard;
