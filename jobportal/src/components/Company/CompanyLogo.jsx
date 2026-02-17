import React from "react";
import { Building2 } from "lucide-react";

function CompanyLogo() {
  return (
    <div className="shrink-0">
      <div className="h-32 w-32 rounded-xl bg-[hsl(var(--color-secondary))] flex items-center justify-center">
        <Building2 className="h-16 w-16 text-[hsl(var(--color-primary))]" />
      </div>
    </div>
  );
}

export default CompanyLogo;
