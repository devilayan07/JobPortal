import React from "react";
import { Bookmark, Clock, MapPin, Users } from "lucide-react";
import { getDateMonthYear } from "../../utils";

function AvailableJobInCompany({job}) {
  return (
    <article className="border border-[hsl(var(--color-border))] rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <h3 className="text-lg font-semibold mb-1">
            <a href="job-details.html" className="hover:underline">
              {job?.title}
            </a>
          </h3>
          <div className="flex flex-wrap items-center gap-2 text-sm text-[hsl(var(--color-muted-foreground))]">
            <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4"/>
                {job?.location}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
                <Clock className="h-4 w-4"/>
               Posted on {getDateMonthYear(job?.createdAt)}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
                <Users className="h-4 w-4"/>
              {job?.applicants} applicants
            </span>
          </div>
        </div>
        <button className="btn-ghost p-2 shrink-0" title="Save job">
            <Bookmark className="h-5 w-5"/>
        </button>
      </div>

      {/* <p className="text-sm text-[hsl(var(--color-muted-foreground))] mb-3">

        We're looking for an experienced Full Stack Developer to join our
        dynamic team. You'll be working on cutting-edge web applications using
        React, Node.js, and cloud technologies.
      </p> */}
                                  <ul
                                className="list-disc list-inside space-y-2 text-[hsl(var(--color-muted-foreground))]"
                            >
                                {job?.requirements?.split("\\n-")?.map((item,index)=><li key={index}>
                                    {item}
                                </li>
)}
                            </ul>
      <div className="flex flex-wrap gap-2 mb-3">
      {
        job?.skills?.map((item)=>
        <span key={item} className="badge badge-secondary">{item}</span>
      )
      }
      </div>


      <div className="flex items-center justify-between pt-3 border-t border-[hsl(var(--color-border))]">
        <span className="text-sm font-semibold text-[hsl(var(--color-primary))]">
          ${job?.salaryMin}k - ${job?.salaryMax}k
        </span>
        {/* <div className="flex gap-2">
          <a href="job-details.html" className="btn btn-outline text-sm">
            View Details
          </a>
          <button className="btn btn-primary text-sm">Apply Now</button>
        </div> */}
      </div>
    </article>
  );
}

export default AvailableJobInCompany;
