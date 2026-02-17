import React from "react";
import { Briefcase } from "lucide-react";
import { Plus } from "lucide-react";
import { Building2 } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

function CompanyHeader() {
    const{auth,logOut}=useAuth()
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[hsl(var(--color-border))] bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <a href="../index.html" className="flex items-center space-x-2">
          <Briefcase  className="h-8 w-8 text-[hsl(var(--color-primary))]"/>
            <span className="text-xl font-bold">LWS Job Portal</span>
          </a>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to={"/companyDashboard"}
              className="text-sm font-medium text-[hsl(var(--color-muted-foreground))] transition-colors hover:text-[hsl(var(--color-primary))]"
            >
              Dashboard
            </Link>
                        <Link
                        to={"/companySetting"}
              className="text-sm font-medium text-[hsl(var(--color-muted-foreground))] transition-colors hover:text-[hsl(var(--color-primary))]"
            >
              CompanySetting
            </Link>

            <Link
              to={"/managejobs"}
              className="text-sm font-medium text-[hsl(var(--color-muted-foreground))] transition-colors hover:text-[hsl(var(--color-primary))]"
            >
              Manage Jobs
            </Link>
            <Link
              to={"/applicants"}
              className="text-sm font-medium text-[hsl(var(--color-muted-foreground))] transition-colors hover:text-[hsl(var(--color-primary))]"
            >
              Applicants
            </Link>
          </nav>
        </div>
                
                    { auth ?          ( <button onClick={logOut} className="btn btn-ghost text-sm">
            Sign Out
          </button>) : (
                      <Link to={"/login"} className="btn btn-ghost text-sm">
            Sign In
          </Link>

          )
 }

        <div className="flex items-center gap-4">
          <Link to={"/createJob"} className="btn btn-primary">
            <Plus className="h-4 w-4 mr-2"/>
            Post Job
          </Link>

          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-[hsl(var(--color-secondary))] flex items-center justify-center">
                <Building2 className="h-4 w-4 text-[hsl(var(--color-primary))]"/>
            </div>
            <span className="text-sm font-medium hidden md:inline">
              TechCorp Solutions
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default CompanyHeader;
