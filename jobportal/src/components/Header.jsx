import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import UserHeader from "./UserHeader";
import { Briefcase } from "lucide-react";
import CompanyHeader from "./Company/CompanyHeader";

function Header() {
  const { auth } = useAuth();
  if(auth?.role==="USER") return <UserHeader/>
  if(auth?.role==="COMPANY") return <CompanyHeader/>
  return (
    <>
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
          <div className="container mx-auto flex h-16 items-center justify-between px-4">
            <div className="flex items-center gap-8">
              <Link to={"/"} className="flex items-center space-x-2">
              <Briefcase className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold">LWS Job Portal</span>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Link to={"/login"} className="text-sm bg-green-500 rounded-md px-3 py-2 text-white">
                Candidate Login
              </Link>

              <Link
                className="btn btn-primary text-sm"
                to={"/companyLogin"}
              >
                Employer Login
              </Link>
            </div>
          </div>
        </header>
    
    </>
  );
}

export default Header;
