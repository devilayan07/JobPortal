import {  useState } from "react"
import { AuthContext } from "../context"
import { Navigate } from "react-router-dom";


const AuthProvider=({children})=>{
    const[auth,setAuth]=useState(()=>{
        const stored=localStorage.getItem("auth");
        return stored ? JSON.parse(stored) :null
    })
      

      
    const logIn=(authData)=>{
        setAuth(authData)
        localStorage.setItem("auth",JSON.stringify(authData))
    }

    const logOut=()=>{
        setAuth(null)
        localStorage.removeItem("auth")
        localStorage.removeItem("slug")
    }
    return(
        <AuthContext.Provider value={{auth,setAuth,logIn,logOut}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider