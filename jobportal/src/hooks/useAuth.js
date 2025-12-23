import { useContext } from "react"
import { AuthContext } from "../context"

const useAuth=()=>{
    const{auth,setAuth,logIn,logOut}=useContext(AuthContext)

    return {auth,setAuth,logIn,logOut}
}

export default useAuth