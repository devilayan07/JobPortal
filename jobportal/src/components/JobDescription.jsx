import React from 'react'

function JobDescription({jobDetails}) {
  return (
                    <div className="card p-6">
                        <h2 className="text-xl font-semibold mb-4">
                            Job Description
                        </h2>
                        <div
                            className="prose prose-sm max-w-none space-y-4 text-[hsl(var(--color-foreground))]"
                        >
                            <p>
                                {jobDetails?.description}
                            </p>

                            <h3 className="text-lg font-semibold mt-6 mb-3">
                                Required Qualifications
                            </h3>
                            <ul
                                className="list-disc list-inside space-y-2 text-[hsl(var(--color-muted-foreground))]"
                            >
                                {jobDetails?.requirements?.split("\\n-")?.map((item,index)=><li key={index}>
                                    {item}
                                </li>
)}
                            </ul>

                            <h3 className="text-lg font-semibold mt-6 mb-3">
                                What We Offer
                            </h3>
                            <ul
                                className="list-disc list-inside space-y-2 text-[hsl(var(--color-muted-foreground))]"
                            >
                                {jobDetails?.benefits?.split("\\n")?.map((item,index)=><li key={index}>
                                    {item}
                                </li>
)}
                            </ul>
                        </div>
                    </div>  )
}

export default JobDescription
