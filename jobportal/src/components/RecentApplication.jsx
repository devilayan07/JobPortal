import React from "react";

function RecentApplication() {
  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Recent Applications</h2>
        <a
          href="#"
          className="text-sm text-[hsl(var(--color-primary))] hover:underline"
        >
          View All
        </a>
      </div>
      <div className="space-y-4">
        <div className="border border-[hsl(var(--color-border))] rounded-lg p-4">
          <div className="flex items-start gap-4">
            <div className="shrink-0">
              <div className="h-12 w-12 rounded-lg bg-[hsl(var(--color-secondary))] flex items-center justify-center">
                <i
                  data-lucide="building-2"
                  className="h-6 w-6 text-[hsl(var(--color-primary))]"
                ></i>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h3 className="font-semibold mb-1">
                    <a href="job-details.html" className="hover:underline">
                      Senior Full Stack Developer
                    </a>
                  </h3>
                  <p className="text-sm text-[hsl(var(--color-muted-foreground))]">
                    TechCorp Solutions
                  </p>
                </div>
                <span className="badge badge-success">Under Review</span>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs text-[hsl(var(--color-muted-foreground))] mb-3">
                <span className="flex items-center gap-1">
                  <i data-lucide="map-pin" className="h-3 w-3"></i>
                  San Francisco, CA
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <i data-lucide="calendar" className="h-3 w-3"></i>
                  Applied on Nov 28, 2025
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <i data-lucide="dollar-sign" className="h-3 w-3"></i>
                  $120k - $180k
                </span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="job-details.html"
                  className="btn btn-outline text-xs h-8"
                >
                  View Job
                </a>
                <button className="btn btn-ghost text-xs h-8">
                  Withdraw Application
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecentApplication;
