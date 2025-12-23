import React from 'react'
import { MapPin } from 'lucide-react'
import { Calendar } from 'lucide-react'
import { getDateMonthYear } from '../utils'
function UserProfileInfo({name,title,location,createdAt}) {
  return (
                            <div>
                                <h1 className="text-3xl font-bold mb-2">
                                    {name}
                                </h1>
                                <p
                                    className="text-lg text-[hsl(var(--color-muted-foreground))] mb-2"
                                >
                                    {title}
                                </p>
                                <div
                                    className="flex flex-wrap items-center gap-3 text-sm text-[hsl(var(--color-muted-foreground))]"
                                >
                                    <span className="flex items-center gap-1">
                                        <MapPin className='h-4 w-4'/>
                                        {location}
                                    </span>
                                    <span>•</span>
                                    <span className="flex items-center gap-1">
                                        <Calendar className='h-4 w-4'/>
                                        Member since {getDateMonthYear(createdAt)}
                                    </span>
                                </div>
                            </div>
  )
}

export default UserProfileInfo
