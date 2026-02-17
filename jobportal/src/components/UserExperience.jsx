import React from 'react'
import { getDateMonthYear } from '../utils'
function UserExperience({experience}) {
  return (
                    <div className="card p-6">
                        <h2 className="text-xl font-semibold mb-4">
                            Work Experience
                        </h2>
                        <div className="space-y-6">
                            {/* <!-- Experience 1 --> */}
                            { Array.isArray(experience) && experience?.map((item)=> <div key={item}
                                className="relative pl-8 pb-6 border-l-2 border-[hsl(var(--color-border))] last:pb-0"
                            >
                                <div
                                    className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-[hsl(var(--color-primary))] border-2 border-white"
                                ></div>
                                <div>
                                    <h3 className="font-semibold mb-1">
                                        {item?.title}
                                    </h3>
                                    <p
                                        className="text-sm text-[hsl(var(--color-muted-foreground))] mb-2"
                                    >
                                        {item?.companyName} • {item?.employmentType}
                                    </p>
                                    <p
                                        className="text-xs text-[hsl(var(--color-muted-foreground))] mb-3"
                                    >
                                        {getDateMonthYear(item?.startDate)} - Present • 2 years
                                    </p>
                                    <p
                                        className="text-sm text-[hsl(var(--color-foreground))]"
                                    >
                                        {item?.description}
                                    </p>
                                </div>
                            </div>
)}

                        </div>
                    </div>
  )
}

export default UserExperience
