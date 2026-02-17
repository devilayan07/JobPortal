import React, { useEffect, useState,useMemo } from "react";
import HeroSection from "../components/HeroSection";
import Search from "../components/Search";
import JobType from "../components/JobType";
import ExperienceLevel from "../components/ExperienceLevel";
import Salary from "../components/Salary";
import Skills from "../components/Skills";
import SortJob from "../components/SortJob";
import JobCard from "../components/JobCard";
import Pagination from "../components/Pagination";
import useJobs from "../hooks/useJobs";
import Loading from "../components/Loading";
import { salaryRanges } from "../utils/data";
import axios from "axios";
import useAppliedJob from "../hooks/useAppliedJob";


const jobperPage=10;
function HomePage() {
    const{jobs,setJobs}=useJobs()
    const[page,setPage]=useState(1)
    const[loading,setLoading]=useState(false)
    const[hasMore,setHasMore]=useState(true)
    const[jobType,setJobType]=useState([])
    const[skills,setSkills]=useState([])
    const[selectedSalary,setSelectedSalary]=useState([])
    const[selectedExperience,setSelectedExperience]=useState("")
    const[search,setSearch]=useState("")
      const{appliedJob,fetchAppliedJob}=useAppliedJob()


    const fetchJobs=async({page,jobType,skills,minSalary,maxSalary,selectedExperience,search})=>{
      if(loading) return
        setLoading(true)
        try {
          const params=new URLSearchParams()
           params.append("page",page)
           params.append("limit",jobperPage)
           if(jobType?.length) params.append("type",jobType?.join(","))
            if(skills?.length) params.append("skills",skills.join(","))
          if(minSalary!==undefined) params.append("minSalary",minSalary)
            if(maxSalary!==null && maxSalary!==undefined) params.append("maxSalary",maxSalary)
            params.append("experienceLevel",selectedExperience)
          params.append("search",search)
            // const response=await axiosInstance.get(`${import.meta.env.VITE_SERVER_BASE_URL}/jobs?page=${page}&limit=${jobperPage}&type=${jobType.join(",")}&skills=${skills.join(",")}`)
              const response=await axios.get(`${import.meta.env.VITE_SERVER_BASE_URL}/jobs?${params.toString()}`)

            console.log(response?.data?.data)
            const newJobs=response?.data?.data

                  setJobs((prev)=>{
                    if(page===1) return newJobs;

                    return [...prev,...newJobs]
                  })

                
                           setHasMore(newJobs?.length===jobperPage)
             
            
            
        } catch (error) {
            console.log(error?.message)
            
        }finally{
            setLoading(false)
        }

    }

    const getSalaryParams=()=>{
      if(!selectedSalary?.length){
       return{
        minSalary:"",
        maxSalary:""
       }
      } 
              const selectedRangeId=selectedSalary[0];
      const range=salaryRanges?.find((item)=>item.id===selectedRangeId)
      if(!range){
        return {
          minSalary:"",
          maxSalary:""
        }
      } 

      return{
        minSalary:range?.min,
        maxSalary:range?.max
      }



    }
     
    useEffect(()=>{
      const {minSalary,maxSalary}=getSalaryParams()
      fetchJobs({page,jobType,skills,minSalary,maxSalary,selectedExperience,search})
    },[page,jobType,skills,selectedSalary,selectedExperience,search])

    useEffect(()=>{
      setJobs([])
      setPage(1)
      setHasMore(true)

    },[jobType,skills,selectedSalary,selectedExperience,search])

    
  const handleClear=()=>{
    setJobType("")
    setSkills("")
    setSelectedExperience("")
    setSelectedSalary("")
  }



  const appliedJobIds=useMemo(()=>{
    return appliedJob?.map((item)=>item?.jobId) 
  },[jobs,appliedJob])


  return (
    <main className="container mx-auto px-4 py-8">
      <HeroSection />

      <section className="mb-8">
        <div className="card p-6">
          <div className="space-y-4">
            <Search search={search} setSearch={setSearch} />

            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border">
              <span className="text-sm font-medium text-muted-foreground mr-2">
                Filters:
              </span>

              <JobType jobType={jobType} setJobType={setJobType}/>

              <ExperienceLevel selectedExperience={selectedExperience} setSelectedExperience={setSelectedExperience} />

              <Salary selectedSalary={selectedSalary}  setSelectedSalary={setSelectedSalary}/>

              <Skills skills={skills} setSkills={setSkills}/>

              <button className="btn btn-ghost text-xs h-8 px-3 text-muted-foreground hover:text-foreground" onClick={handleClear}>
                Clear All
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Available Jobs</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Showing 1,247 results
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <SortJob />
        </div>
      </div>

      <div className="grid gap-4 md:gap-6">
        {loading  ? (<Loading/>) :(<>
                {Array.isArray(jobs) && jobs?.map((job)=><JobCard key={job?.id} job={job} appliedJobIds={appliedJobIds} appliedJob={appliedJob} fetchAppliedJob={fetchAppliedJob}/>) }


        </>) }

        
      {hasMore && <Pagination setPage={setPage} loading={loading}/> }  
      </div>
    </main>
  );
}

export default HomePage;
