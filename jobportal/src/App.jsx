import Header from "./components/Header"
import { Routes,Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import PublicRoutes from "./routes/PublicRoutes"
import PrivateRoutes from "./routes/PrivateRoutes"
import UserProfile from "./pages/UserProfile"
import EditProfile from "./pages/EditProfile"
import JobDetails from "./pages/JobDetails"
import AppliedJob from "./pages/AppliedJob"
import UserDashboard from "./pages/UserDashboard"
import UserRoute from "./routes/UserRoute"
import CompanyRoute from "./routes/CompanyRoute"
import CompanyLoginPage from "./pages/CompanyLoginPage"
import CompanyProfilePage from "./pages/CompanyProfilePage"
import ManageJobsForCompany from "./pages/ManageJobsForCompany"
import CreateJob from "./pages/CreateJob"
import CompanySetting from "./pages/CompanySetting"
import CompanyDashboard from "./pages/CompanyDashboard"
import Applicants from "./pages/Applicants"
import ApplicantRegistration from "./pages/ApplicantRegistration"
import CompanyRegistration from "./pages/CompanyRegistration"
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

      <Route element={<UserRoute/>}>
      <Route path="/profile" element={<UserProfile/>}/>
      <Route path="/editProfile" element={<EditProfile/>}/>
      <Route path="/myapplication" element={<AppliedJob/>}/>
      <Route path="/userDashboard" element={<UserDashboard/>}/>

      </Route>
      <Route element={<CompanyRoute/>}>
       <Route path="/companyProfile" element={<CompanyProfilePage/>}/>
             <Route path="/managejobs" element={<ManageJobsForCompany/>}/>
             <Route path="/createJob" element={<CreateJob/>}/>
             <Route path="/companySetting" element={<CompanySetting/>}/>
             <Route path="/companyDashboard" element={<CompanyDashboard/>}/>
             <Route path="/applicants" element={<Applicants/>}/>

      </Route >
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/companyLogin" element={<CompanyLoginPage/>}/>
      <Route path="/applicantRegister" element={<ApplicantRegistration/>}/>
      <Route path="/companyRegister" element={<CompanyRegistration/>}/>
    </Routes>
    </>
  )
}

export default App
