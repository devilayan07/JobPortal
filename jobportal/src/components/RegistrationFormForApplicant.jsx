import axios from 'axios'
import { Calendar, UserPlus,  Mail,
  Phone,
  Lock,
  Eye,
  User
 } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function RegistrationFormForApplicant() {
    const{register,handleSubmit,formState:{errors},setError,watch}=useForm()
    const password=watch("password")
    const[showPassword,setShowPassword]=useState(false)
    const[showConfirmPassword,setShowConfirmPassword]=useState(false)
    const[isLoading,setIsLoading]=useState(false)
    const navigate=useNavigate()


    const onSubmit=async(formData)=>{
        setIsLoading(true)
        const payload={
            role:"USER",
            name:formData.name,
            email:formData.email,
            phone:formData.phone,
            experience:formData.experience,
            password:formData.password
        }
        try {
            const response=await axios.post(`${import.meta.env.VITE_SERVER_BASE_URL}/auth/register`,payload)
            if(response?.status===201){
                toast.success("Accounts Created Successfully")
                navigate("/login")
            }
            
        } catch (error) {
            console.log(error)
                        setError("root.serverError",{
                type:error?.response?.status,
                message: error?.response?.data?.message || "Unauthorized request"

            })

            
        }finally{
            setIsLoading(false)
        }

    }
  return (
            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-2">
                <label for="name" className="label">
                  Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                  {...register("name",{required:"Name is required"})}
                    type="text"
                    id="name"
                    className="input pl-10"
                    placeholder="John"
                  />
                </div>
                <p className="text-red-500">{errors.name && errors.name.message}</p>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                      className="input pl-10"
                      placeholder="john.doe@example.com"
                    />
                  </div>
                    <p className="text-red-500">{errors.email && errors.email.message}</p>

                </div>
                <div className="space-y-2">
                  <label for="phone" className="label">
                    Phone Number
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                    {...register("phone",{required:"Phone is required"})}
                      type="tel"
                      id="phone"
                      name="phone"
                      className="input pl-10"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                    <p className="text-red-500">{errors.email && errors.email.message}</p>

                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label for="experience" className="label">
                    Years of Experience
                  </label>
                  <div className="relative">
                    <Calendar/>
                    <select
                      id="experience"
                      name="experience"
                      className="input pl-10"
                      {...register("experience",{required:"Experience is required"})}
                    >
                      <option value="">Select experience level</option>
                      <option value="entry">Entry Level (0-2 years)</option>
                      <option value="mid">Mid Level (3-5 years)</option>
                      <option value="senior">Senior (6-10 years)</option>
                      <option value="expert">Expert (10+ years)</option>
                    </select>
                  </div>
                </div>
                <p className="text-red-500">{errors.experience && errors.experience.message}</p>

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
                      <Eye className="h-4 w-4" />
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
                      return value===password || "Password do not match"
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
                      <Eye className="h-4 w-4" />
                    </button>
                                                    <p className="text-red-500">{errors.confirmPassword && errors.confirmPassword.message}</p>

                  </div>
                </div>

              </div>
              <p className="text-xs text-muted-foreground -mt-2">
                Password must be at least 8 characters with letters and numbers
              </p>

              <div className="flex items-start gap-2">
                <input
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
              </div>
             {errors.root?.serverError.type===401 && <p className='text-center text-red-500'>{errors?.root?.serverError?.message}</p> }

              <button
                type="submit"
                className="btn btn-primary w-full text-base h-11 mt-2"
              >
                <UserPlus className="h-4 w-4 mr-2"/>
              {isLoading ? "Loading..." :"Create Account"}  
              </button>
            </form>  )
}

export default RegistrationFormForApplicant
