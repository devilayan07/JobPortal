import React, { useEffect } from "react";
import ApplicationStatus from "../components/ApplicationStatus";
import ApplicationDate from "../components/ApplicationDate";
import { ChevronDown } from "lucide-react";
import { Building2 } from "lucide-react";
import { Briefcase } from "lucide-react";
import { MapPin } from "lucide-react";
import { Clock } from "lucide-react";
import { DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import { getDateMonthYear } from "../utils";
import { Eye } from "lucide-react";
import useAppliedJob from "../hooks/useAppliedJob";

function AppliedJob() {
  const{appliedJob,fetchAppliedJob,selectJobOrder,setSelectJobOrder,selectedStatus,setSelectedStatus,selectedDate,setSelectedDate}=useAppliedJob()


  useEffect(()=>{
    fetchAppliedJob({selectJobOrder,selectedStatus,selectedDate})
  },[selectJobOrder,selectedStatus,selectedDate])
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-[hsl(var(--color-muted-foreground))] mb-2">
          <a
            href="user-dashboard.html"
            className="hover:text-[hsl(var(--color-primary))]"
          >
            Dashboard
          </a>
          <i data-lucide="chevron-right" className="h-4 w-4"></i>
          <span className="text-[hsl(var(--color-foreground))]">
            Applied Jobs
          </span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Applied Jobs</h1>
            <p className="text-[hsl(var(--color-muted-foreground))]">
              Track all your job applications in one place
            </p>
          </div>
          <div className="text-sm text-[hsl(var(--color-muted-foreground))]">
            <span className="font-medium text-[hsl(var(--color-foreground))]">
              12
            </span>
            applications
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <aside className="lg:col-span-1">
          <div className="card p-6 sticky top-20">
            <h2 className="font-semibold mb-4">Filters</h2>

             <ApplicationStatus selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus}/>
              <ApplicationDate setSelectedDate={setSelectedDate} selectedDate={selectedDate}/>


            <button className="btn btn-outline w-full">
              <i data-lucide="rotate-ccw" className="h-4 w-4 mr-2"></i>
              Reset Filters
            </button>
          </div>
        </aside>

        <div className="lg:col-span-3 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 ">
            <div className="flex items-center gap-2 ">
              <span className="text-sm text-[hsl(var(--color-muted-foreground))]">
                Sort by:
              </span>
              <div >
                <select
                  id="sortDropdown"
                  className="  p-2  w-48 card  shadow-lg z-10"
                  onChange={(e)=>{console.log(e.target.value),setSelectJobOrder(e.target.value)}}
                >
                    <option value="" className="w-full text-left px-3 py-2 text-sm rounded hover:bg-[hsl(var(--color-accent))]">
                  </option>

                  <option value="Newest First" className="w-full text-left px-3 py-2 text-sm rounded hover:bg-[hsl(var(--color-accent))]">
                    Newest First
                  </option>
                  <option value="Oldest First" className="w-full text-left px-3 py-2 text-sm rounded hover:bg-[hsl(var(--color-accent))]">
                    Oldest First
                  </option>
                </select>
              </div>
            </div>
          </div>

          {/* <!-- Application Card 1 - Interview Scheduled --> */}
          {appliedJob?.map((item)=><div key={item?.id} className="card p-6 hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="shrink-0">
                <div className="h-16 w-16 rounded-lg bg-[hsl(var(--color-secondary))] flex items-center justify-center">
                  <Building2  className="h-8 w-8 text-[hsl(var(--color-primary))]"/>
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">
                      <a
                        href="job-details.html"
                        className="hover:text-[hsl(var(--color-primary))]"
                      >
                        {item?.job?.title}
                      </a>
                    </h3>
                    <p className="text-sm text-[hsl(var(--color-muted-foreground))] mb-2">
                      <Link
                      to={item?.job?.company?.logoUrl}
                        className="hover:text-[hsl(var(--color-primary))]"
                      >
                        {item?.job?.company?.name}
                      </Link>
                    </p>
                  </div>
                  <span className="badge badge-warning">{item?.status}</span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm text-[hsl(var(--color-muted-foreground))] mb-4">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4"/>
                    {item?.job?.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Briefcase className="h-4 w-4"/>
                    {item?.job?.type}
                  </span>
                  <span className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4"/>
                    ${item?.job?.salaryMin}k - ${item?.job?.salaryMax}k
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-4 text-xs text-[hsl(var(--color-muted-foreground))]">
                    <span className="flex items-center gap-1">
                      <i data-lucide="clock" className="h-3 w-3"></i>
                      Applied on {getDateMonthYear(item?.createdAt)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/jobDetails/${item?.job?.slug}`}
                      className="btn btn-outline text-sm h-9"
                    >
                      <Eye className="h-4 w-4 mr-2"/>
                      View Job
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>)}

        </div>
      </div>
    </main>
  );
}

export default AppliedJob;
