import React, { useEffect, useState } from "react";
import JobHeader from "../components/JobHeader";
import JobOverview from "../components/JobOverview";
import SimilarJobs from "../components/SimilarJobs";
import JobDescription from "../components/JobDescription";
import { ChevronRight } from "lucide-react";
import { useParams } from "react-router-dom";
import axios from "axios";
function JobDetails() {
   const {slug}=useParams()
   console.log(slug)
   const[jobDetails,setJobDetails]=useState(null)

   const fetchJobDetails=async()=>{
    try {
        const response=await axios.get(`${import.meta.env.VITE_SERVER_BASE_URL}/jobs/${slug}`)
        console.log(response?.data?.data)
        setJobDetails(response?.data?.data)
        
    } catch (error) {
        console.log(error)
        
    }
   }

   useEffect(()=>{
    fetchJobDetails()
   },[slug])

  return (
    <main className="container mx-auto px-4 py-8">
      <nav className="mb-6 flex items-center gap-2 text-sm text-[hsl(var(--color-muted-foreground))]">
        <a
          href="../index.html"
          className="hover:text-[hsl(var(--color-foreground))]"
        >
          Jobs
        </a>
        <ChevronRight className="h-4 w-4"/>
        <a href="#" className="hover:text-[hsl(var(--color-foreground))]">
          Technology
        </a>
        <ChevronRight className="h-4 w-4"/>
        <span className="text-[hsl(var(--color-foreground))]">
          Senior Full Stack Developer
        </span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <JobHeader jobDetails={jobDetails}/>

          <JobOverview jobDetails={jobDetails}/>
          <JobDescription jobDetails={jobDetails}/>

          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-4">Required Skills</h2>
            {jobDetails?.skills?.map((item)=><div key={item} className="flex flex-wrap gap-2">
            <span className="badge badge-secondary">{item}</span>
      
  </div> )}

          </div>

          <SimilarJobs jobDetails={jobDetails}/>
        </div>

        {/* <!-- Sidebar Column --> */}
        <div className="lg:col-span-1 space-y-6">
          {/* <!-- Apply Section (Sticky) --> */}
          <div className="card p-6 lg:sticky lg:top-24">
            <div className="space-y-4">
              <div className="text-center pb-4 border-b border-[hsl(var(--color-border))]">
                <p className="text-2xl font-bold text-[hsl(var(--color-primary))] mb-1">
                  $120k - $180k
                </p>
                <p className="text-sm text-[hsl(var(--color-muted-foreground))]">
                  Per year
                </p>
              </div>

              <button
                className="btn btn-primary w-full text-base"
                onclick="openApplyDialog()"
              >
                <i data-lucide="send" className="h-4 w-4 mr-2"></i>
                Apply Now
              </button>

              <div className="pt-4 border-t border-[hsl(var(--color-border))] space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[hsl(var(--color-muted-foreground))]">
                    Applicants
                  </span>
                  <span className="font-medium">47</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-[hsl(var(--color-muted-foreground))]">
                    Posted
                  </span>
                  <span className="font-medium">2 days ago</span>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Company Info --> */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold mb-4">About Company</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-16 w-16 rounded-lg bg-[hsl(var(--color-secondary))] flex items-center justify-center flex-shrink-0">
                  <i
                    data-lucide="building-2"
                    className="h-8 w-8 text-[hsl(var(--color-primary))]"
                  ></i>
                </div>
                <div>
                  <h4 className="font-semibold">TechCorp Solutions</h4>
                  <p className="text-sm text-[hsl(var(--color-muted-foreground))]">
                    Technology & Software
                  </p>
                </div>
              </div>

              <p className="text-sm text-[hsl(var(--color-muted-foreground))]">
                TechCorp Solutions is a leading technology company specializing
                in enterprise software solutions. We help businesses transform
                their operations through innovative technology.
              </p>

              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-2 text-sm">
                  <i
                    data-lucide="globe"
                    className="h-4 w-4 text-[hsl(var(--color-muted-foreground))]"
                  ></i>
                  <a
                    href="#"
                    className="text-[hsl(var(--color-primary))] hover:underline"
                  >
                    www.techcorp.com
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <i
                    data-lucide="map-pin"
                    className="h-4 w-4 text-[hsl(var(--color-muted-foreground))]"
                  ></i>
                  <span className="text-[hsl(var(--color-muted-foreground))]">
                    San Francisco, CA
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <i
                    data-lucide="users"
                    className="h-4 w-4 text-[hsl(var(--color-muted-foreground))]"
                  ></i>
                  <span className="text-[hsl(var(--color-muted-foreground))]">
                    500-1000 employees
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <i
                    data-lucide="calendar"
                    className="h-4 w-4 text-[hsl(var(--color-muted-foreground))]"
                  ></i>
                  <span className="text-[hsl(var(--color-muted-foreground))]">
                    Founded in 2010
                  </span>
                </div>
              </div>

              <a
                href="../company/company-profile.html"
                className="btn btn-outline w-full mt-4"
              >
                View Company Profile
              </a>
            </div>
          </div>

          {/* <!-- Share Job --> */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold mb-4">Share this Job</h3>
            <div className="flex gap-2">
              <button
                className="btn btn-outline flex-1"
                title="Share on LinkedIn"
              >
                <i data-lucide="linkedin" className="h-4 w-4"></i>
              </button>
              <button
                className="btn btn-outline flex-1"
                title="Share on Twitter"
              >
                <i data-lucide="twitter" className="h-4 w-4"></i>
              </button>
              <button
                className="btn btn-outline flex-1"
                title="Share on Facebook"
              >
                <i data-lucide="facebook" className="h-4 w-4"></i>
              </button>
              <button className="btn btn-outline flex-1" title="Copy link">
                <i data-lucide="link" className="h-4 w-4"></i>
              </button>
            </div>
          </div>

          {/* <!-- Report Job --> */}
          <button className="w-full text-sm text-[hsl(var(--color-muted-foreground))] hover:text-[hsl(var(--color-foreground))] flex items-center justify-center gap-2">
            <i data-lucide="flag" className="h-4 w-4"></i>
            Report this job
          </button>
        </div>
      </div>
    </main>
  );
}

export default JobDetails;
