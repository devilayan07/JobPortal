import React from "react";
import { Link } from "react-router-dom";

function JobCard({job}) {
  return (
    <article className="card p-6 hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="shrink-0">
          <div className="h-16 w-16 rounded-lg bg-secondary flex items-center justify-center">
            <i data-lucide="building-2" className="h-8 w-8 text-primary"></i>
          </div>
        </div>

        <div className="flex-1 space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-1">
                <Link
                to={`/jobDetails/${job?.slug}`}
                  className="hover:underline"
                >
                    {job?.title}
                </Link>
              </h3>
              <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <a
                  href="company-profile.html"
                  className="hover:text-primary font-medium"
                >
                  {job?.company?.name}
                </a>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <i data-lucide="map-pin" className="h-4 w-4"></i>
                  {job?.company?.location}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <i data-lucide="clock" className="h-4 w-4"></i>
                  Posted 2 days ago
                </span>
              </div>
            </div>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2">
            {job?.description}
          </p>

          <div className="flex flex-wrap gap-2">
            <span className="badge badge-secondary">{job?.type}</span>
            {job?.skills?.map((item)=><span key={item} className="badge badge-outline">{item}</span>
)}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold text-primary">
                ${job?.salaryMin}k - ${job?.salaryMax}k
              </span>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <i data-lucide="users" className="h-4 w-4"></i>
                {job?.applicants}applicants
              </span>
            </div>
            <div className="flex gap-2">
              <a
                href="job-seeker/job-details.html"
                className="btn btn-outline text-sm"
              >
                View Details
              </a>
              <button className="btn btn-primary text-sm">Apply Now</button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default JobCard;
