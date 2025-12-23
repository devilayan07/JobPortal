import React from "react";
import { GraduationCap } from "lucide-react";
import { getDateMonthYear } from "../utils";
function UserEducation({education}) {
  return (
    <div className="card p-6">
      <h2 className="text-xl font-semibold mb-4">Education</h2>
      <div className="space-y-4">
        {education?.map((item)=><div key={item} className="flex gap-4">
          <div className="h-12 w-12 rounded-lg bg-[hsl(var(--color-secondary))] flex items-center justify-center shrink-0">
            <GraduationCap className="h-6 w-6 text-[hsl(var(--color-primary))]" />
          </div>
          <div>
            <h3 className="font-semibold mb-1">
                {item?.degree}
            </h3>
            <p className="text-sm text-[hsl(var(--color-muted-foreground))] mb-1">
              {item?.schoolName}
            </p>
            <p className="text-xs text-[hsl(var(--color-muted-foreground))]">
             {getDateMonthYear(item?.startDate)}  - {getDateMonthYear(item?.endDate)}
            </p>
          </div>
        </div>)        
}

      </div>
    </div>
  );
}

export default UserEducation;
