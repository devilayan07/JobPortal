import React, { useState } from "react";
import { Mail } from "lucide-react";
import { Lock } from "lucide-react";
import { LogIn } from "lucide-react";
import { Eye } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function CompanyLoginForm() {
  const[company,setCompany]=useState({
    email:"",
    role:"COMPANY",
    password:""
  })
  const[error,setError]=useState("")
  const[showPassword,setShowPassword]=useState(true)
  const[loading,setLoading]=useState(false)
  const {logIn}=useAuth()
  const navigate=useNavigate()

  const validation=()=>{
    let error={};
    if(!company?.email){
      error.email="Email is required"
    }
    if(!company?.password){
      error.password="Passsword is required"
    }
    return error
  }

  const postUserData=(e)=>{
    const name=e.target.name;
    const value=e.target.value;
    setCompany((prev)=>({
      ...prev,
      [name]:value
    }))
    setError((prev)=>({
      ...prev,
     [name]:value ? "" :`${name} is required`
    }))
  }

  const handleSubmit=async(e)=>{
    e.preventDefault()
    const errors=validation()
    setError(errors)
    if(Object.keys(errors).length===0){
      setLoading(true)
      try {
        const payload={
          "email":company?.email,
          "role":company?.role,
          "password":company?.password
        }
        const response=await axios.post(`${import.meta.env.VITE_SERVER_BASE_URL}/auth/login`,payload)
        console.log(response?.data?.data)

        if(response?.status===200){
          toast.success("login successfull")
          const{data,token}=response.data
          logIn({profile:data,role:data?.role,token})
          navigate("/companyProfile")
        }
        
      } catch (error) {
        console.log(error)
        
      }
    }
  }
  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <label htmlFor="email" className="label">
          Email Address
          <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="email"
            id="email"
            name="email"
            value={company?.email}
            className="input pl-10"
            placeholder="you@example.com"
            onChange={postUserData}
          />
        </div>
                     <span style={{color:"red"}}>
    {" "}
        {error.email}{" "}
    </span>

      </div>
                        <div className="space-y-2">
        <label htmlFor="role" className="label">
          Role
          <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            type="text"
            id="role"
            name="role"
            value={company?.role}
            className="input pl-10"
            readOnly
            
          />

        </div>
      </div>

      <div className="space-y-2">
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

          <input
            type={showPassword ? "text" :"password"}
            id="password"
            name="password"
            value={company?.password}
            className="input pl-10 pr-10"
            placeholder="Enter your password"
            onChange={postUserData}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            onClick={()=>setShowPassword(!showPassword)}
          >
            <Eye className="h-4 w-4" />
          </button>
        </div>
                     <span style={{color:"red"}}>
    {" "}
        {error.password}{" "}
    </span>

      </div>

      <button type="submit" className="btn btn-primary w-full text-base h-11">
        <LogIn className="h-4 w-4 mr-2" />
        {loading ? "Loading...." :"Sign In"}
      </button>
    </form>
  );
}

export default CompanyLoginForm;
