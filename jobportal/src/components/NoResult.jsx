import React from 'react'

function NoResult() {
  return (
            <div className="card p-12 text-center hidden" id="empty-state">
                <svg
                    className="mx-auto h-12 w-12 text-muted-foreground mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
                <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
                <p className="text-sm text-muted-foreground mb-4">
                    Try adjusting your filters or search terms to find more
                    opportunities.
                </p>
                <button className="btn btn-outline">Clear Filters</button>
            </div>
  )
}

export default NoResult
