import React, { useEffect, useState } from "react";
import UserProfileInfo from "../components/UserProfileInfo";
import UserContactInformation from "../components/UserContactInformation";
import UserSkills from "../components/UserSkills";
import UserExperience from "../components/UserExperience";
import UserEducation from "../components/UserEducation";
import UserResume from "../components/UserResume";
import UserSocialLink from "../components/UserSocialLink";
import { User } from "lucide-react";
import { Camera } from "lucide-react";
import { LayoutDashboard } from "lucide-react";
import { FileText } from "lucide-react";
import { Bookmark } from "lucide-react";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import { Edit } from 'lucide-react'
import { Link } from "react-router-dom";

function UserProfile() {
  const [userInfo, setUserInfo] = useState([]);
  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);
  const { axiosInstance } = useAxios();
  const userId = auth?.profile?.id;

  const fetchUserInfo = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${import.meta.env.VITE_SERVER_BASE_URL}/users/${userId}`
      );
      console.log(response?.data?.data);
      if (response?.status === 200) {
        setUserInfo(response?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUserInfo();
  }, [userId]);

  const imageUrl=`${import.meta.env.VITE_PDF_URL}${userInfo?.profilePictureUrl}`

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="card p-8 mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="relative shrink-0">
            <div className="h-32 w-32 rounded-full bg-[hsl(var(--color-secondary))] flex items-center justify-center">
              {
                imageUrl ? (
                                <img
                src={imageUrl}
                alt="Upload preview"
                className="image-preview"
              />


                ):(
                  <User className="h-16 w-16 text-[hsl(var(--color-primary))]" />

                )
              }
            </div>
            <div className="absolute bottom-0 right-0 h-10 w-10 rounded-full bg-[hsl(var(--color-primary))] flex items-center justify-center border-4 border-white">
              <Camera className="h-5 w-5 text-white" />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-3">
              <UserProfileInfo
                name={userInfo?.name}
                location={userInfo?.location}
                title={userInfo?.title}
                createdAt={userInfo?.createdAt}
              />
              <Link to={"/editProfile"} className="btn btn-primary">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[hsl(var(--color-border))]">
              <div>
                <p className="text-2xl font-bold text-[hsl(var(--color-primary))]">
                  12
                </p>
                <p className="text-sm text-[hsl(var(--color-muted-foreground))]">
                  Applications
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[hsl(var(--color-primary))]">
                  5
                </p>
                <p className="text-sm text-[hsl(var(--color-muted-foreground))]">
                  In Review
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[hsl(var(--color-primary))]">
                  18
                </p>
                <p className="text-sm text-[hsl(var(--color-muted-foreground))]">
                  Saved Jobs
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-4">About</h2>
            <p className="text-[hsl(var(--color-foreground))] leading-relaxed">
              {userInfo?.bio}
            </p>
          </div>

          <UserContactInformation
            phone={userInfo?.phone}
            email={userInfo?.email}
            location={userInfo?.location}
            linkdinUrl={userInfo?.linkedinUrl}
          />
          <UserSkills skill={userInfo?.skills} />

          <UserExperience experience={userInfo?.experience} />

          <UserEducation education={userInfo?.education} />
        </div>

        <div className="lg:col-span-1 space-y-6">
          <UserResume
            resumeName={userInfo?.resumeOriginalName}
            resumeDate={userInfo?.resumeUploadDate}
            resumeUrl={userInfo?.resumeUrl}
            fetchUserInfo={fetchUserInfo}

          />
          <UserSocialLink githubUrl={userInfo?.githubUrl} linkedinUrl={userInfo?.linkedinUrl} portfolioUrl={userInfo?.portfolioUrl}/>

          <div className="card p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <a
                href="user-dashboard.html"
                className="btn btn-outline w-full justify-start"
              >
                <LayoutDashboard className="h-4 w-4 mr-2" />
                View Dashboard
              </a>
              <a href="#" className="btn btn-outline w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                My Applications
              </a>
              <a href="#" className="btn btn-outline w-full justify-start">
                <Bookmark className="h-4 w-4 mr-2" />
                Saved Jobs
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default UserProfile;
