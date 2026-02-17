import React, { useEffect, useState } from "react";
import ProfilePhotoSection from "../components/ProfilePhotoSection";
import BasicInformation from "../components/BasicInformation";
import EditLocation from "../components/EditLocation";
import EditSkills from "../components/EditSkills";
import EditExperience from "../components/EditExperience";
import useAxios from "../hooks/useAxios";
import useAuth from "../hooks/useAuth";
import EditEducation from "../components/EditEducation";
import EditSocialLink from "../components/EditSocialLink";
import { formatDateForApi } from "../utils";
import { toast } from "react-toastify";
import { Save } from "lucide-react";
import { Link } from "react-router-dom";

function EditProfile() {
  const {axiosInstance}=useAxios()
  const {auth}=useAuth()
  const[loading,setLoading]=useState(false)
  const[user,setUser]=useState({
    name:"",
    title:"",
    bio:"",
    city:"",
    state:"",
    country:"",
    zipCode:"",
    phone:"",
    portfolioUrl:"",
    linkdinUrl:"",
    githubUrl:"",
    experienceLevel:"",
    skills:[],
    experience:[{
      companyName:"",
      companyType:"",
      startDate:"",
      endDate:""
    }],
    education:[{
      schoolName:"",
      degree:"",
      fieldOfStudy:"",
      startDate:"",
      endDate:""

    }
    ]

  })

  const[addSkills,setAddSkills]=useState("")
  const userId=auth?.profile?.id

  const fetchUserInfo=async()=>{
    try {
      const response=await axiosInstance.get(`${import.meta.env.VITE_SERVER_BASE_URL}/users/${userId}`)
      console.log(response?.data?.data)
      if(response?.status===200){
        setUser(response?.data?.data)
      }
      
    } catch (error) {
      console.log(error)
      
    }
  }

  useEffect(()=>{
    fetchUserInfo()
  },[userId])

  const handleChange=(e)=>{
    const name=e.target.name;
    const value=e.target.value;
    setUser((prev)=>({
      ...prev,
      [name]:value
    }))
  }


  const handleSubmit=async(e)=>{
    e.preventDefault()

    const payload={
      ...user,
      experience:user?.experience?.map((item)=>{
        return {
          ...item,
          startDate:formatDateForApi(item?.startDate),
          endDate:item?.endDate ? formatDateForApi(item?.endDate) :""
        }
      }),
      education:user?.education?.map((item)=>{
        return{
          ...item,
          startDate:formatDateForApi(item?.startDate),
          endDate:item?.endDate ? formatDateForApi(item?.endDate) :""
        }
      })
    }
    
    setLoading(true)
    try {
       const response=await axiosInstance.put(`${import.meta.env.VITE_SERVER_BASE_URL}/users/profile`,payload)
       console.log(response?.data?.data)
       if(response?.status===200){
          toast.success("Profile Updated Successfully")
          fetchUserInfo()
       }
    } catch (error) {
      console.log(error)
      
    }finally{
      setLoading(false)
    }
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-[hsl(var(--color-muted-foreground))] mb-2">
          <a
            href="user-dashboard.html"
            className="hover:text-[hsl(var(--color-primary))]"
          >
            Dashboard
          </a>
          <i data-lucide="chevron-right" className="h-4 w-4"></i>
          <Link
          to={"/profile"}
            className="hover:text-[hsl(var(--color-primary))]"
          >
            My Profile
          </Link>
          <i data-lucide="chevron-right" className="h-4 w-4"></i>
          <span className="text-[hsl(var(--color-foreground))]">
            Edit Profile
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Edit Profile</h1>
            <p className="text-[hsl(var(--color-muted-foreground))]">
              Update your personal information and preferences
            </p>
          </div>
          <a href="user-profile.html" className="btn btn-outline">
            <i data-lucide="x" className="h-4 w-4 mr-2"></i>
            Cancel
          </a>
        </div>
      </div>

      {/* <!-- Edit Form --> */}
      <form className="space-y-6">
        <ProfilePhotoSection user={user} fetchUserInfo={fetchUserInfo}/>

        <BasicInformation user={user} setUser={setUser} />

        <EditLocation user={user} setUser={setUser}/>

        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-6">About</h2>
          <div>
            <label for="bio" className="label block mb-2">
              Professional Summary
            </label>
            <textarea
              id="bio"
              className="textarea w-full"
              rows="5"
              name="bio"
              placeholder="Write a brief summary about yourself, your experience, and what you're looking for..."
              value={user?.bio}
              onChange={(e)=>handleChange(e)}

            />
          </div>
        </div>

        <EditSkills skills={user?.skills} addSkills={addSkills} setAddSkills={setAddSkills} setUser={setUser}/>
        <EditExperience experience={user?.experience} setUser={setUser} />
        <EditEducation education={user?.education} setUser={setUser}/>


        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-6">Resume/CV</h2>
          <div className="space-y-4">
            <div className="p-4 bg-[hsl(var(--color-secondary))] rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-12 w-12 rounded-lg bg-white flex items-center justify-center shrink-0">
                  <i
                    data-lucide="file-text"
                    className="h-6 w-6 text-[hsl(var(--color-primary))]"
                  ></i>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">
                    John_Doe_Resume.pdf
                  </p>
                  <p className="text-xs text-[hsl(var(--color-muted-foreground))]">
                    Updated Nov 28, 2025 • 245 KB
                  </p>
                </div>
                <button
                  type="button"
                  className="btn-ghost p-2 text-red-600 hover:bg-red-50"
                >
                  <i data-lucide="trash-2" className="h-4 w-4"></i>
                </button>
              </div>
            </div>

            <div>
              <label className="btn btn-outline w-full cursor-pointer">
                <i data-lucide="upload" className="h-4 w-4 mr-2"></i>
                Upload New Resume
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                />
              </label>
              <p className="text-xs text-[hsl(var(--color-muted-foreground))] mt-2">
                Supported formats: PDF, DOC, DOCX. Max size: 5MB
              </p>
            </div>
          </div>
        </div>

        <EditSocialLink user={user} setUser={setUser}/>

        <div className="card p-6">
          <div className="flex flex-col sm:flex-row gap-3 justify-end">
            <a href="user-profile.html" className="btn btn-outline">
              <i data-lucide="x" className="h-4 w-4 mr-2"></i>
              Cancel
            </a>
            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
              <Save className="h-4 w-4 mr-2"/>
             {loading ? "Loading..." :"Save Changes"} 
            </button >
          </div>
        </div>
      </form>
    </main>
  );
}

export default EditProfile;
