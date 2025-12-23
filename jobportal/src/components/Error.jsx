import React from 'react'

function Error() {
  return (
            <div className="card p-12 text-center hidden" id="error-state">
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
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
                <h3 className="text-lg font-semibold mb-2">Something went wrong</h3>
                <p className="text-sm text-muted-foreground mb-4">
                    We couldn't load the jobs. Please try again.
                </p>
                <button className="btn btn-primary">Retry</button>
            </div>
  )
}

export default Error
