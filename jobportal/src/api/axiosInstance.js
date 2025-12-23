import axios from "axios"

let axiosInstance=axios.create({
    baseURL:"http://localhost:5000/api"
})



export default axiosInstance