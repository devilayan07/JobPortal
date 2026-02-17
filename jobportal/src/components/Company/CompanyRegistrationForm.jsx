import axios from "axios";
import {
  Briefcase,
  Building,
  Building2,
  Calendar,
  Lock,
  Mail,
  MapPin,
  Shield,
  Users,
  Globe,
  Eye
} from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CompanyRegistrationForm() {
    const{register,handleSubmit,formState:{errors},setError,watch}=useForm({
        defaultValues:{
            terms:false,
            verified:false
        }
    })
    const minLength=100;
    const[showPassword,setShowPassword]=useState(false)
    const[showConfirmPassword,setShowConfirmPassword]=useState(false)
    const password=watch("password")
    const[loading,setLoading]=useState(false)
    const navigate=useNavigate()

    const onSubmit=async(formData)=>{
        setLoading(true)
        try {
            const payload={
                role:"COMPANY",
                name:formData?.name,
                email:formData?.email,
                websiteUrl:formData?.websiteUrl,
                industry:formData?.industry,
                foundedYear:String(formData?.foundedYear),
                employeeCount:formData?.employeeCount,
                location:formData?.location,
                description:formData?.description,
                password:formData?.password
            }

            const response=await axios.post(`${import.meta.env.VITE_SERVER_BASE_URL}/auth/register`,payload)
            if(response?.status===201){
                toast.success("Accounts created successfully")
                navigate("/companyLogin")
            }
            
        } catch (error) {
            console.log(error)
                                    setError("root.serverError",{
                type:error?.response?.status,
                message: error?.response?.data?.message || "Unauthorized request"

            })

            
        }finally{
            setLoading(false)
        }
    

    }
  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-5">
        <div className="flex items-center gap-2 pb-2 border-b border-border">
          <Building className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Company Information</h2>
        </div>

        <div className="space-y-2">
          <label for="companyName" className="label">
            Company Name
            <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
               {...register("name",{required:"Name is required"})}
              type="text"
              id="companyName"
              name="name"
              className="input pl-10"
              placeholder="e.g., TechCorp Solutions"
            />
          </div> 
          <p className="text-red-500">{errors.name && errors.name.message}</p>
        </div>

        <div className="space-y-2">
          <label for="email" className="label">
            Email Address
            <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
            {...register("email",{required:"Email is required"})}
              type="email"
              id="email"
              name="email"
              className="input pl-10"
              placeholder="john.doe@company.com"
            />
          </div>
          <p className="text-red-500">{errors.email && errors.email.message}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label for="website" className="label">
              Company Website
              <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
              {...register("websiteUrl",{required:"Website Url is required"})}
                type="url"
                id="website"
                name="websiteUrl"
                className="input pl-10"
                placeholder="https://example.com"
              />
            </div>
            <p className="text-red-500">{errors.websiteUrl && errors.websiteUrl.message}</p>
          </div>
          <div className="space-y-2">
            <label for="industry" className="label">
              Industry
              <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <select
              {...register("industry",{required:"Industry is required"})}
                id="industry"
                name="industry"
                className="input pl-10"
              >
                <option value="">Select industry</option>
                <option value="technology">Technology</option>
                <option value="finance">Finance & Banking</option>
                <option value="healthcare">Healthcare</option>
                <option value="education">Education</option>
                <option value="retail">Retail & E-commerce</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="consulting">Consulting</option>
                <option value="marketing">Marketing & Advertising</option>
                <option value="other">Other</option>
              </select>
            </div>
                      <p className="text-red-500">{errors.industry && errors.industry.message}</p>

          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label for="companySize" className="label">
              Company Size
            </label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <select 
              {...register("employeeCount",{required:"Please select employee size"})}
              id="companySize" 
              name="employeeCount" 
              className="input pl-10" >
                <option value="">Select company size</option>
                <option value="1-10">1-10 employees</option>
                <option value="11-50">11-50 employees</option>
                <option value="51-200">51-200 employees</option>
                <option value="201-500">201-500 employees</option>
                <option value="501-1000">501-1000 employees</option>
                <option value="1000+">1000+ employees</option>
              </select>
            </div>
            <p className="text-red-500">{errors.employeeCount && errors.employeeCount.message}</p>
          </div>
          <div className="space-y-2">
            <label for="foundedYear" className="label">
              Founded Year
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
              {...register("foundedYear",{required:"Found Year is required",
                     validate: (value) =>
      !isNaN(value) || "Founded Year is required",

                min:{
                value:1800,
                message: "Founded year must be after 1800",

              } , max: {value:2025,
                message:"Founded year cannot be after 2025"
              },
                  valueAsNumber: true,

            })}
                type="number"
                id="foundedYear"
                name="foundedYear"
                className="input pl-10"
                placeholder="e.g., 2010"
                // min="1800"
                // max="2025"
              />
            </div>
                      <p className="text-red-500">{errors.foundedYear && errors.foundedYear.message}</p>

          </div>
        </div>

        <div className="space-y-2">
          <label for="location" className="label">
            Headquarters Location
            <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
            {...register("location",{required:"Location is rqeuired"})}
              type="text"
              id="location"
              name="location"
              className="input pl-10"
              placeholder="City, Country"
            />
          </div>
          <p className="text-red-500">{errors.location && errors.location.message}</p>
        </div>

        <div className="space-y-2">
          <label for="description" className="label">
            Company Description
            <span className="text-red-500">*</span>
          </label>
          <textarea
          {...register("description",{required:"Description is required",minLength:100})}
            id="description"
            name="description"
            className="textarea min-h-[120px]"
            placeholder="Tell us about your company, mission, and what makes it a great place to work..."
          ></textarea>
          <p className="text-xs text-muted-foreground">
            Minimum {minLength} characters. This will be displayed on your company
            profile.
          </p>
        </div>
                  <p className="text-red-500">{errors.description && errors.description.message}</p>

      </div>

      <div className="space-y-5">
        <div className="flex items-center gap-2 pb-2 border-b border-border">
          <Shield className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Account Security</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label for="password" className="label">
              Password
              <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
              {...register("password",{required:"Password is required",minLength:{
                value:8,
                message:"Password must be 8 character"
              }})}
                type={showPassword ? "text":"password"}
                id="password"
                name="password"
                className="input pl-10 pr-10"
                placeholder="Create a strong password"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                onClick={()=>setShowPassword(!showPassword)}
              >
                <Eye className="h-4 w-4"/>
              </button>
            </div>
            <p className="text-red-500">{errors.password && errors.password.message}</p>
          </div>
          <div className="space-y-2">
            <label for="confirmPassword" className="label">
              Confirm Password
              <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
              {...register("confirmPassword",{required:"Confirm Password is required",validate:(value)=>{
                return value===password || 'Password do not match'
              }})}
                type={showConfirmPassword ? "text":"password"}
                id="confirmPassword"
                name="confirmPassword"
                className="input pl-10 pr-10"
                placeholder="Re-enter your password"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                onClick={()=>setShowConfirmPassword(!showConfirmPassword)}
              >
                <Eye className="h-4 w-4"/>
              </button>
            </div>
            <p className="text-red-500">{errors.confirmPassword && errors.confirmPassword.message}</p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground -mt-2">
          Password must be at least 8 characters with letters and numbers
        </p>
      </div>

      <div className="space-y-3 pt-2">
        <div className="flex items-start gap-2">
          <input
          {...register("terms",{
                    required: "You must agree to the Terms of Service",

          })}
            type="checkbox"
            id="terms"
            name="terms"
            className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-ring"
          />
          <label for="terms" className="text-sm text-muted-foreground">
            I agree to the
            <a href="#" className="text-primary hover:underline">
              Terms of Service
            </a>
            and
            <a href="#" className="text-primary hover:underline">
              Privacy Policy
            </a>
          </label>
            <p className="text-red-500 ">
    {errors.terms?.message}
  </p>

        </div>

        <div className="flex items-start gap-2">
          <input
          {...register("verified",{
                    required: "You must confirm authorization",

          })}
            type="checkbox"
            id="verified"
            name="verified"
            className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-ring"
            
          />
          <label for="verified" className="text-sm text-muted-foreground">
            I confirm that I am an authorized representative of this company and
            have the right to register on its behalf
          </label>
            <p className="text-red-500">
    {errors.verified?.message}
  </p>

        </div>

        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            id="updates"
            name="updates"
            className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-ring"
          />
          <label for="updates" className="text-sm text-muted-foreground">
            Send me product updates, hiring tips, and promotional offers via
            email
          </label>
        </div>
      </div>
        {errors?.root?.serverError?.type===401 && <p className="text-center text-red-500">{errors?.root?.serverError?.message}</p>   }
      <button type="submit" className="btn btn-primary w-full text-base h-11 mt-2">
        <Building2 className="h-4 w-4 mr-2"/>
      {loading ? "Loading..." :"Register Company"}  
      </button>
    </form>
  );
}

export default CompanyRegistrationForm;
