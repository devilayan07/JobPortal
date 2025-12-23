import React from "react";
import { Building2 } from "lucide-react";
import { MapPin } from "lucide-react";
import { Clock } from "lucide-react";
import { Bookmark } from "lucide-react";

function JobHeader({jobDetails}) {
  return (
    <div className="card p-6">
      <div className="flex items-start gap-4">
        <div className="shrink-0">
          <div className="h-20 w-20 rounded-lg bg-[hsl(var(--color-secondary))] flex items-center justify-center">
            <Building2 className="h-10 w-10 text-[hsl(var(--color-primary))]" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                {jobDetails?.title}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-[hsl(var(--color-muted-foreground))]">
                <a
                  href="company-profile.html"
                  className="text-lg font-medium hover:text-[hsl(var(--color-primary))]"
                >
                  {jobDetails?.company?.name}
                </a>
                <span>•</span>
                <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                  {jobDetails?.location}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4"/>
                  Posted 2 days ago
                </span>
              </div>
            </div>
            <button className="btn-ghost p-2 shrink-0" title="Save job">
                <Bookmark className="h-6 w-6"/>
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="badge badge-secondary">{jobDetails?.type}</span>
            <span className="badge badge-outline">{jobDetails?.workMode}</span>
            <span className="badge badge-outline">{jobDetails?.experienceLevel}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobHeader;
