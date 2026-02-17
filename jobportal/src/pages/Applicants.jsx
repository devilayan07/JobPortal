import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ApplicationStatusFilter from "../components/Company/ApplicationStatusFilter";
import ExperienceFilter from "../components/Company/ExperienceFilter";
import useAxios from "../hooks/useAxios";
import ApplicantsCard from "../components/Company/ApplicantsCard";
import { Loader } from "lucide-react";

const applicantPerPage=10
function Applicants() {
  const[applicants,setApplicants]=useState([])
  const[page,setPage]=useState(1)
  const[hasMore,setHasMore]=useState(true)
  const loaderRef=useRef(null)
  const {axiosInstance}=useAxios()
  const[status,setStatus]=useState([])
  const[isLoading,setIsLoading]=useState(false)
  const[experience,setExperience]=useState([])
  const[selectDate,setSelectDate]=useState("")

  const fetchApplicants=async({reset = false,pageNo=page}={})=>{
    if(isLoading) return
      try {
        setIsLoading(true)
        const params=new URLSearchParams()
        params.append("page",pageNo)
        params.append("limit",applicantPerPage)
        params.append("status",status.join(","))
        params.append("experienceLevel",experience.join(","))
        params.append("date",selectDate)
        const response=await axiosInstance.get(`${import.meta.env.VITE_SERVER_BASE_URL}/companies/applicants?${params.toString()}`)
        if(response?.data?.data?.length===0){
          setHasMore(false)
          return;
        }
             if (reset) {
      setApplicants(response.data.data);
      setPage(2);
      setHasMore(true);
    } 
        else{
                  if(response?.status===200){
          console.log(response?.data?.data,"applicants")

          setApplicants(prevApplicants=>[...prevApplicants,...response.data.data])
          setPage((prev)=>prev+1)
        }


        }
        
      } catch (error) {
        console.log(error)
        
      }finally{
        setIsLoading(false)
      }
  }


  useEffect(()=>{
    const onIntersection=(items)=>{
      const loaderItem=items[0];

      if(loaderItem.isIntersecting && hasMore){
          fetchApplicants()
      }

    }
    const observer=new IntersectionObserver(onIntersection)

    if(observer && loaderRef.current){
      observer.observe(loaderRef.current)
    }

    // cleanup

    return ()=>{
      if(observer) observer.disconnect()
    }
  },[hasMore,page])


 useEffect(()=>{
   setApplicants([])
   setHasMore(true)
   setPage(1)
   fetchApplicants({reset:true,pageNo:1})
 },[status,experience,selectDate])

 const handleDateChange=(e)=>{
  setSelectDate(e.target.value)
 }

 const handleReset=()=>{
  setStatus([])
  setExperience([])
  setSelectDate("")
 }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-[hsl(var(--color-muted-foreground))] mb-2">
          <Link
            to={"/companyDashboard"}
            className="hover:text-[hsl(var(--color-primary))]"
          >
            Dashboard
          </Link>
          <i data-lucide="chevron-right" className="h-4 w-4"></i>
          <span className="text-[hsl(var(--color-foreground))]">
            Applicants
          </span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Job Applicants</h1>
            <p className="text-[hsl(var(--color-muted-foreground))]">
              Review and manage applicants
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* <!-- Filters Sidebar --> */}
        <aside className="lg:col-span-1">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Filters</h3>
              <button onClick={handleReset} className="text-sm text-[hsl(var(--color-primary))] hover:underline">
                Reset
              </button>
            </div>

            {/* <!-- Status Filter --> */}
            <ApplicationStatusFilter status={status} setStatus={setStatus}/>


            {/* <!-- Experience Filter --> */}
            <ExperienceFilter experience={experience} setExperience={setExperience}/>


            {/* <!-- Date Filter --> */}
            <div>
              <h4 className="text-sm font-medium mb-3">Applied Date</h4>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="date"
                    className="border-[hsl(var(--color-input))]"
                    value={"last 7 day"}
                    checked={selectDate.includes("last 7 day")}
                    onChange={handleDateChange}
                  />
                  <span className="text-sm">Last 7 days</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="date"
                    value={"last 30 day"}
                    checked={selectDate.includes("last 30 day")}

                    className="border-[hsl(var(--color-input))]"
                    onChange={handleDateChange}

                  />
                  <span className="text-sm">Last 30 days</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="date"
                    className="border-[hsl(var(--color-input))]"
                    value={"3 month"}
                    checked={selectDate.includes("3 month")}

                    onChange={handleDateChange}
                  />
                  <span className="text-sm">3 month</span>
                </label>
              </div>
            </div>
          </div>
        </aside>

        {/* <!-- Applicants List --> */}
        <div className="lg:col-span-3">
          {/* <!-- Applicant Cards --> */}
          <div className="space-y-4">
            {
              applicants?.map((item)=><ApplicantsCard key={item?.id} item={item} fetchApplicants={fetchApplicants}/>)
            }

          </div>

       {hasMore && <div className="mt-6 text-center" ref={loaderRef}>
            <button className="btn btn-outline">
              <Loader className="h-4 w-4 mr-2"/>
              Load More Applicants
            </button>
          </div> }   
        </div>
      </div>
    </main>
  );
}

export default Applicants;
