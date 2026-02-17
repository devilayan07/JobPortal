import React from "react";
import {
  Building2,
  Briefcase,
  Bell,
  UserPlus,
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
import RegistrationFormForApplicant from "../components/RegistrationFormForApplicant";

function ApplicantRegistration() {
  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-8">
            <a href="index.html" className="flex items-center space-x-2">
              <Briefcase className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">LWS Job Portal</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Already have an account?
            </span>
            <Link to={"/login"} className="btn btn-ghost text-sm">
              Sign In
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <UserPlus className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight mb-3">
              Create Your Account
            </h1>
            <p className="text-lg text-muted-foreground">
              Join thousands of professionals finding their dream jobs
            </p>
          </div>

          <div className="w-full text-center">
            <div className="card p-2 mb-8 inline-flex mx-auto w-full max-w-md">
              <div className="grid grid-cols-2 gap-2 w-full">
                <button className="btn btn-primary text-center">
                  <User className="h-4 w-4 mr-2" />
                  Job Seeker
                </button>
                <Link
                to={"/companyRegister"}
                  className="btn btn-ghost text-center"
                >
                  <Building2 className="h-4 w-4 mr-2" />
                  Employer
                </Link>
              </div>
            </div>
          </div>

          <div className="card p-8 md:p-10">
            <RegistrationFormForApplicant/>


            <div className="relative my-8">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-card text-muted-foreground font-medium">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-8 text-center text-sm text-muted-foreground">
              Already have an account?
              <Link
                to={"/login"}
                className="text-primary hover:underline font-medium"
              >
                Sign in
              </Link>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Briefcase className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-1">
                  Thousands of Jobs
                </h3>
                <p className="text-xs text-muted-foreground">
                  Access opportunities from top companies worldwide
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Bell className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-1">Job Alerts</h3>
                <p className="text-xs text-muted-foreground">
                  Get notified when new jobs match your profile
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <ShieldCheck className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-1">Secure & Private</h3>
                <p className="text-xs text-muted-foreground">
                  Your data is protected with industry-standard security
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              By creating an account, you'll get access to thousands of job
              opportunities from top companies worldwide.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}

export default ApplicantRegistration;
