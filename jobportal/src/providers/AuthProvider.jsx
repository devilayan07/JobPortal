import {  useState } from "react"
import { AuthContext } from "../context"


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
    }
    return(
        <AuthContext.Provider value={{auth,setAuth,logIn,logOut}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider