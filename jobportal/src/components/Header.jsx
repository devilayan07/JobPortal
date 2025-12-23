import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Header() {
  const {auth,logOut}=useAuth()
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link to={"/"} className="flex items-center space-x-2">
            <i data-lucide="briefcase" className="h-8 w-8 text-primary"></i>
            <span className="text-xl font-bold">LWS Job Portal</span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          {auth ?          ( <button onClick={logOut} className="btn btn-ghost text-sm">
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

export default Header;
