import React, { useEffect,useState } from "react";
import AvailableJobInCompany from "../components/Company/AvailableJobInCompany";
import CompanySocialMedia from "../components/Company/CompanySocialMedia";
import CompanyLogo from "../components/Company/CompanyLogo";
import useAxios from "../hooks/useAxios";
import { Building2, Globe, Heart, Lightbulb, Mail, MapPin, Phone, Share2, Target, Users, } from "lucide-react";
import { Building } from "lucide-react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
function CompanyProfilePage() {
  const[companyProfile,setCompanyProfile]=useState(null)
  const {axiosInstance}=useAxios()
  const profilePageUrl=`${window.location.origin}/companyProfile`
  const[openPosition,setOpenPosition]=useState([])

  const fetchCompanyProfile=async()=>{
    try {
      const response=await axiosInstance.get(`${import.meta.env.VITE_SERVER_BASE_URL}/companies/profile`)
      console.log(response?.data?.data)
      setCompanyProfile(response?.data?.data)
      localStorage.setItem("slug",response?.data?.data?.slug)
      
      
    } catch (error) {
      console.log(error)
      
    }
  }

  useEffect(()=>{
    fetchCompanyProfile()
  },[])

  const fetchJobsInCompany=async()=>{
    if(!companyProfile?.slug) return 
    try {
      const response=await axiosInstance.get(`${import.meta.env.VITE_SERVER_BASE_URL}/companies/${companyProfile?.slug}/jobs`)
      console.log(response?.data?.data)
      setOpenPosition(response?.data?.data)
      
    } catch (error) {
      console.log(error)
      
    }
  }

  useEffect(()=>{
    fetchJobsInCompany()

  },[companyProfile?.slug])

  const handleShareClick=async(url)=>{
    try {
       await navigator.clipboard.writeText(url)
       toast.success("Link copied to clipboard")
    } catch (error) {
              console.log("Failed to copy",error)
        toast.error("Failed to copy link")

    }

  }
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="card p-8 mb-8">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <CompanyLogo />
          <div className="shrink-0">
            <div className="h-32 w-32 rounded-xl bg-[hsl(var(--color-secondary))] flex items-center justify-center">
              <Building2                 className="h-16 w-16 text-[hsl(var(--color-primary))]"
 />
            </div>
          </div>

          <div className="flex-1 h-full items-center">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">{companyProfile?.name}</h1>
                <div className="flex flex-wrap items-center gap-3 text-[hsl(var(--color-muted-foreground))]">
                  <span className="flex items-center gap-1">
                    <Building className="h-4 w-4"/>
                    {companyProfile?.industry}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4"/>
                    {companyProfile?.location}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4"/>
                    {companyProfile?.employeeCount} employees
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="btn btn-outline" onClick={()=>handleShareClick(profilePageUrl)}>
                  <Share2 className="h-4 w-4 mr-2"/>
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-4">About Company</h2>
            <div className="space-y-4 text-[hsl(var(--color-foreground))]">
              <p>
                {companyProfile?.description}
              </p>
            </div>
          </div>

          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-4">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex gap-3">
                <div className="shrink-0">
                  <div className="h-10 w-10 rounded-lg bg-[hsl(var(--color-secondary))] flex items-center justify-center">
                    <Lightbulb className="h-5 w-5 text-[hsl(var(--color-primary))]"/>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Innovation</h3>
                  <p className="text-sm text-[hsl(var(--color-muted-foreground))]">
                    We encourage creative thinking and embrace new ideas to
                    solve problems.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="shrink-0">
                  <div className="h-10 w-10 rounded-lg bg-[hsl(var(--color-secondary))] flex items-center justify-center">
                    <Users                       className="h-5 w-5 text-[hsl(var(--color-primary))]"/>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Collaboration</h3>
                  <p className="text-sm text-[hsl(var(--color-muted-foreground))]">
                    Teamwork and open communication are at the heart of
                    everything we do.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="shrink-0">
                  <div className="h-10 w-10 rounded-lg bg-[hsl(var(--color-secondary))] flex items-center justify-center">
                    <Target                       className="h-5 w-5 text-[hsl(var(--color-primary))]"/>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Excellence</h3>
                  <p className="text-sm text-[hsl(var(--color-muted-foreground))]">
                    We strive for the highest quality in our products and
                    services.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="shrink-0">
                  <div className="h-10 w-10 rounded-lg bg-[hsl(var(--color-secondary))] flex items-center justify-center">
                    <Heart                       className="h-5 w-5 text-[hsl(var(--color-primary))]"/>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Integrity</h3>
                  <p className="text-sm text-[hsl(var(--color-muted-foreground))]">
                    Honesty and transparency guide our decisions and actions.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="card p-6" id="jobs">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Open Positions</h2>
              <span className="text-sm text-[hsl(var(--color-muted-foreground))]">
                {openPosition?.length} jobs available
              </span>
            </div>
            <div className="space-y-4">
              {Array.isArray(openPosition) && openPosition?.map((job)=><AvailableJobInCompany key={job?.id} job={job}/>)}
            </div>

            {/* <div className="mt-6 text-center">
              <a href="../index.html" className="btn btn-outline">
                View All Open Positions
                <i data-lucide="arrow-right" className="h-4 w-4 ml-2"></i>
              </a>
            </div> */}
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="card p-6">
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Globe                   className="h-5 w-5 text-[hsl(var(--color-muted-foreground))] shrink-0 mt-0.5"
/>
                <div>
                  <p className="text-sm text-[hsl(var(--color-muted-foreground))] mb-1">
                    Website
                  </p>
                  <Link
                  to={companyProfile?.websiteUrl}
                    className="text-sm font-medium text-[hsl(var(--color-primary))] hover:underline"
                  >
                    {companyProfile?.websiteUrl}
                  </Link>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail/>
                <i
                  data-lucide="mail"
                  className="h-5 w-5 text-[hsl(var(--color-muted-foreground))] shrink-0 mt-0.5"
                ></i>
                <div>
                  <p className="text-sm text-[hsl(var(--color-muted-foreground))] mb-1">
                    Email
                  </p>
                  <a
                    href="mailto:careers@techcorp.com"
                    className="text-sm font-medium text-[hsl(var(--color-primary))] hover:underline"
                  >
                    {companyProfile?.email}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-[hsl(var(--color-muted-foreground))] shrink-0 mt-0.5"/>
                <div>
                  <p className="text-sm text-[hsl(var(--color-muted-foreground))] mb-1">
                    Phone
                  </p>
                  <a href="tel:+14155551234" className="text-sm font-medium">
                    {companyProfile?.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin                   className="h-5 w-5 text-[hsl(var(--color-muted-foreground))] shrink-0 mt-0.5"/>
                <div>
                  <p className="text-sm text-[hsl(var(--color-muted-foreground))] mb-1">
                    Headquarters
                  </p>
                  <p className="text-sm font-medium">
                    {companyProfile?.city}
                    <br />
                    {companyProfile?.state}
                    <br />
                    {companyProfile?.country}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <CompanySocialMedia socialLinks={companyProfile?.socialLinks}/>

        </div>
      </div>
    </main>
  );
}

export default CompanyProfilePage;
