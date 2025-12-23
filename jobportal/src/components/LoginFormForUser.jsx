import React, { useState } from "react";
import { useForm } from 'react-hook-form'
import { Eye } from "lucide-react";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";



function LoginFormForUser() {
    const{register,handleSubmit,formState:{errors},setError}=useForm()
    const[showPassword,setShowPassword]=useState(false)
    const[loading,setLoading]=useState(false)
    const {logIn}=useAuth()
    const navigate=useNavigate()

    const onSubmit=async(formData)=>{
        setLoading(true)
        try {
            const response=await axios.post(`${import.meta.env.VITE_SERVER_BASE_URL}/auth/login`,formData)
            if(response?.status===200){
                console.log(response?.data)
                const {data,token}=response.data
                logIn({user:data,token})
                navigate("/")
                
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
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <label for="email" className="label">
          Email Address
          <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <i
            data-lucide="mail"
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
          ></i>
          <input
          {...register("email",{required:"Email Id is required"})}
            type="email"
            id="email"
            name="email"
            className="input pl-10"
            placeholder="you@example.com"
            required
          />
        <p className="text-red-500">{errors.email && errors.email.message}</p>

        </div>
      </div>

                  <div className="space-y-2">
        <label for="email" className="label">
          Role
          <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
          {...register("role")}
            type="text"
            id="role"
            name="role"
            value="USER"
            className="input pl-10"
            required
          />

        </div>
      </div>


      <div className="space-y-2">
        <div className="relative">
          <i
            data-lucide="lock"
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
          ></i>
          <input
          {...register("password",{required:"Password is required",minLength:{
            value:8,
            message:"Password must be 8 character"
          },
        //   pattern: {
        //       value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        //       message: "Password must include one uppercase, one lowercase, one number, and one special character",
        //     },
        })}
            type={showPassword ? "text" :"password"}
            id="password"
            name="password"
            className="input pl-10 pr-10"
            placeholder="Enter your password"
            required
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            onClick={()=>setShowPassword(!showPassword)}
          >
  <Eye className="h-4 w-4" />
          </button>
        <p className="text-red-500">{errors.password && errors.password.message}</p>

        </div>
        {errors.root?.serverError.type===401 && <p className='text-center text-red-500'>{errors?.root?.serverError?.message}</p> }

      </div>


      
      <button type="submit" className="btn btn-primary w-full text-base h-11">
        <i data-lucide="log-in" className="h-4 w-4 mr-2"></i>
       {loading ? "loading...." :"Sign In"} 
      </button>
    </form>
  );
}

export default LoginFormForUser;
