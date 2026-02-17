import React, { useEffect, useState } from "react";
import { Code } from "lucide-react";
import axios from "axios";
function SimilarJobs({jobDetails}) {
    const[similarJob,setSimilarJob]=useState([])
    const id=jobDetails?.id
    console.log(id,"id")

    const fetchSimilarJobs=async()=>{
        try {
            const response=await axios.get(`${import.meta.env.VITE_SERVER_BASE_URL}/jobs/${id}/similar`)
            console.log(response?.data?.data)
            setSimilarJob(response?.data?.data)
            
        } catch (error) {
            console.log(error)
            
        }
    }

    useEffect(()=>{
        fetchSimilarJobs()
    },[id])
  return (
    <>
    {Array.isArray(similarJob) && similarJob?.map((item)=><div key={item?.id} className="card p-6">
      <h2 className="text-xl font-semibold mb-4">Similar Jobs</h2>
      <div className="space-y-4">
        <article className="border-b border-[hsl(var(--color-border))] pb-4 last:border-0 last:pb-0">
          <div className="flex gap-4">
            <div className="shrink-0">
              <div className="h-12 w-12 rounded-lg bg-[hsl(var(--color-secondary))] flex items-center justify-center">
                <Code className="h-6 w-6 text-[hsl(var(--color-primary))]" />
              </div>
            </div>
            <div  className="flex-1 min-w-0">
              <h3 className="font-semibold mb-1">
                <a href="job-details.html" className="hover:underline">
                    {item?.title}
                </a>
              </h3>
              <p className="text-sm text-[hsl(var(--color-muted-foreground))] mb-2">
                {item?.company?.name} • {item?.company?.location} • {item?.type}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[hsl(var(--color-primary))]">
                  ${item?.salaryMin}k - ${item?.salaryMax}k
                </span>
                <a
                  href="job-details.html"
                  className="text-sm text-[hsl(var(--color-primary))] hover:underline"
                >
                  View Details
                </a>
              </div>
            </div>

          </div>
        </article>
      </div>
    </div>)}
    </>

  );
}

export default SimilarJobs;
