import React from "react";
import { Briefcase } from "lucide-react";
import { MapPin } from "lucide-react";
import { DollarSign } from "lucide-react";
import { BarChart } from "lucide-react";
import { Calendar } from "lucide-react";
import { Users } from "lucide-react";

function JobOverview({jobDetails}) {
  return (
    <div className="card p-6">
      <h2 className="text-xl font-semibold mb-4">Job Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-lg bg-[hsl(var(--color-secondary))] flex items-center justify-center shrink-0">
            <Briefcase className="h-5 w-5 text-[hsl(var(--color-primary))]" />
          </div>
          <div>
            <p className="text-sm text-[hsl(var(--color-muted-foreground))]">
              Job Type
            </p>
            <p className="font-medium">{jobDetails?.type}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-lg bg-[hsl(var(--color-secondary))] flex items-center justify-center shrink-0">
            <MapPin className="h-5 w-5 text-[hsl(var(--color-primary))]" />
          </div>
          <div>
            <p className="text-sm text-[hsl(var(--color-muted-foreground))]">
              Location
            </p>
            <p className="font-medium">{jobDetails?.location}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-lg bg-[hsl(var(--color-secondary))] flex items-center justify-center shrink-0">
            <DollarSign className="h-5 w-5 text-[hsl(var(--color-primary))]" />
          </div>
          <div>
            <p className="text-sm text-[hsl(var(--color-muted-foreground))]">
              Salary
            </p>
            <p className="font-medium">${jobDetails?.salaryMin}k - ${jobDetails?.salaryMax}k / year</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-lg bg-[hsl(var(--color-secondary))] flex items-center justify-center shrink-0">
            <BarChart className="h-5 w-5 text-[hsl(var(--color-primary))]" />
          </div>
          <div>
            <p className="text-sm text-[hsl(var(--color-muted-foreground))]">
              Experience
            </p>
            <p className="font-medium">5+ years</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-lg bg-[hsl(var(--color-secondary))] flex items-center justify-center shrink-0">
            <Calendar className="h-5 w-5 text-[hsl(var(--color-primary))]" />
          </div>
          <div>
            <p className="text-sm text-[hsl(var(--color-muted-foreground))]">
              Application Deadline
            </p>
            <p className="font-medium">December 31, 2025</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-lg bg-[hsl(var(--color-secondary))] flex items-center justify-center shrink-0">
            <Users className="h-5 w-5 text-[hsl(var(--color-primary))]" />
          </div>
          <div>
            <p className="text-sm text-[hsl(var(--color-muted-foreground))]">
              Applicants
            </p>
            <p className="font-medium">{jobDetails?.applicants} applications</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobOverview;
