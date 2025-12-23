import { useEffect } from "react"
import useAuth from "./useAuth"
import axiosInstance from "../api/axiosInstance"

const useAxios=()=>{
    const{auth}=useAuth()

    
     useEffect(()=>{
     const requestIntercept=axiosInstance.interceptors.request.use((config)=>{
        const token=auth?.token;
        if(token){
            config.headers.Authorization=`Bearer ${token}`
        }
    return config;

},(error)=>{
    return Promise.reject(error)
})

const responseIntercept=axiosInstance.interceptors.response.use((response)=>{
    return response

},(error)=>{
    console.log(error?.response)
    if(error?.response && error?.response.status===401){
        console.log("Unauthorized logging out...")
        localStorage.removeItem("token")
        window.location.href="/login"
    }
    return Promise.reject(error)
})

  return ()=>{
    axiosInstance.interceptors.request.eject(requestIntercept)
    axiosInstance.interceptors.response.eject(responseIntercept)
  }
},[auth?.token])

      
return {axiosInstance}

}

export default useAxios