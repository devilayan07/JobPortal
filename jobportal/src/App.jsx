import Header from "./components/Header"
import { Routes,Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import PublicRoutes from "./routes/PublicRoutes"
import PrivateRoutes from "./routes/PrivateRoutes"
import UserProfile from "./pages/UserProfile"
import EditProfile from "./pages/EditProfile"
import JobDetails from "./pages/JobDetails"
function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<PublicRoutes>
        <HomePage/>
      </PublicRoutes>}/>
            <Route path="/jobDetails/:slug" element={<PublicRoutes>
        <JobDetails/>
      </PublicRoutes>}/>

      <Route element={<PrivateRoutes/>}>
      <Route path="/profile" element={<UserProfile/>}/>
      <Route path="/editProfile" element={<EditProfile/>}/>

      </Route>
      <Route path="/login" element={<LoginPage/>}/>
    </Routes>
    </>
  )
}

export default App
