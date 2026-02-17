import React from "react";
import { User } from "lucide-react";
import { Briefcase } from "lucide-react";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";


function UserHeader() {
    const {auth,logOut}=useAuth()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[hsl(var(--color-border))] bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link to={"/"} className="flex items-center space-x-2">
          <Briefcase className="h-8 w-8 text-[hsl(var(--color-primary))]" />
            <span className="text-xl font-bold">LWS Job Portal</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className="text-sm font-medium text-[hsl(var(--color-muted-foreground))] transition-colors hover:text-[hsl(var(--color-primary))]"
            >
              Jobs
            </Link>
            <Link
              to={"/userDashboard"}
              className="text-sm font-medium text-[hsl(var(--color-muted-foreground))] transition-colors hover:text-[hsl(var(--color-primary))]"
            >
              Dashboard
            </Link>
            <Link
            to={"/myapplication"}
              className="text-sm font-medium text-[hsl(var(--color-muted-foreground))] transition-colors hover:text-[hsl(var(--color-primary))]"
            >
              My Applications
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-[hsl(var(--color-secondary))] flex items-center justify-center">
              <User className="h-4 w-4 text-[hsl(var(--color-primary))]" />
            </div>
            <Link to={"/profile"} className="text-sm font-medium hidden md:inline">{auth?.profile?.name}</Link>
          </div>
                    { auth ?          ( <button onClick={logOut} className="btn btn-ghost text-sm">
            Sign Out
          </button>) : (
                      <Link to={"/login"} className="btn btn-ghost text-sm">
            Sign In
          </Link>

          )
 }
          <a href="register-company.html" className="btn btn-primary text-sm">
            Post a Job
          </a>

        </div>
      </div>
    </header>
  );
}

export default UserHeader;
