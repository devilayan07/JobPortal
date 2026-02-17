import React from "react";
import CompanyLoginForm from "../components/Company/CompanyLoginForm";
import { Link } from "react-router-dom";
function CompanyLoginPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <i data-lucide="log-in" className="h-8 w-8 text-primary"></i>
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-3">
            Welcome Back
          </h1>
          <p className="text-lg text-muted-foreground">
            Sign in to access your account
          </p>
        </div>

        <div className="card p-8 md:p-10">
          <CompanyLoginForm />

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
            Don't have an account?
            <Link
            to={"/companyRegister"}
              className="text-primary hover:underline font-medium"
              id="signupLink"
            >
              Sign up as Company
            </Link>
          </div>
        </div>

        <div className="mt-6 text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <i data-lucide="shield-check" className="h-4 w-4"></i>
            <p>
              Your information is protected with industry-standard encryption
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default CompanyLoginPage;
