import React, { useEffect, useRef, useState } from "react";
import { User } from "lucide-react";
import { Camera } from "lucide-react";
import { Upload } from "lucide-react";
import { Trash2 } from "lucide-react";
import useAxios from "../hooks/useAxios";
import { toast } from "react-toastify";
function ProfilePhotoSection({ user,fetchUserInfo }) {
  const { axiosInstance } = useAxios();
  const fileUploadRef=useRef(null)
  const [selectedFile,setSelectedFile]=useState(null)
  const[imageError,setImageError]=useState("")
const [preview, setPreview] = useState(null);


  const imageUrl = user?.profilePictureUrl
    ? `${import.meta.env.VITE_PDF_URL}${user.profilePictureUrl}`
    : null;

    const handleImageUpload=(e)=>{
        e.preventDefault()
        fileUploadRef.current.click()
    }

    const handleSelectedImage=(e)=>{
        const selectFile=e.target.files[0]
        if(!selectFile){
            setImageError("Please select an image file.")
            setSelectedFile(null)
            setPreview(null)
          return 
        }
        const maxSize=2*1024*1024;
    const allowedTypes = ["image/png", "image/jpeg","image/jpg"];
    if(!allowedTypes.includes(selectFile.type)){
               setImageError("File type must be png or jpg");
      setSelectedFile(null);
      setPreview(null);
      return;

    }else if(selectFile.size>maxSize){
              setImageError("File size must be less than 2 MB");
      setSelectedFile(null);
      setPreview(null);
      return;

    };

        setImageError("");
    setSelectedFile(selectFile);
    setPreview(URL.createObjectURL(selectFile));




    }

    const uploadPhoto=async()=>{
        if(!selectedFile) return;

        try {
            const formData=new FormData()
            formData.append("profilePicture",selectedFile)
            const response=await axiosInstance.post(`${import.meta.env.VITE_SERVER_BASE_URL}/users/profile-picture`,formData)
            if(response?.status===200){
                fetchUserInfo()
                toast.success("Profile Picture updated")
            }
            
        } catch (error) {
            console.log(error)
            
        }

    }

    useEffect(()=>{
        if(selectedFile){
            uploadPhoto()
        }
    },[selectedFile])
  return (
    <div className="card p-6">
      <h2 className="text-xl font-semibold mb-6">Profile Photo</h2>
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="relative shrink-0">
          <div className="h-32 w-32 rounded-full bg-[hsl(var(--color-secondary))] flex items-center justify-center">
            {
                preview ? (
                                  <img
                src={preview}
                alt="Upload preview"
                className="image-preview"
              />

                ):
                     imageUrl ? (
              <img
                src={imageUrl}
                alt="Upload preview"
                className="image-preview"
              />
            ) : (
              <User className="h-16 w-16 text-[hsl(var(--color-primary))]" />
            )}


                
          </div>
          <div className="absolute bottom-0 right-0 h-10 w-10 rounded-full bg-[hsl(var(--color-primary))] flex items-center justify-center border-4 border-white cursor-pointer hover:bg-[hsl(var(--color-primary))]/90 transition-colors">
            <Camera className="h-5 w-5 text-white" />
          </div>
        </div>
        <div className="flex-1">
          <h3 className="font-medium mb-2">Upload Profile Picture</h3>
          <p className="text-sm text-[hsl(var(--color-muted-foreground))] mb-4">
            JPG, PNG or GIF. Max size of 5MB.
          </p>
          <div className="flex gap-2">
            <button className="btn btn-primary cursor-pointer" onClick={handleImageUpload}>
              <Upload className="h-4 w-4 mr-2" />
              Upload Photo
            </button>
             <input type="file" id="file" className="hidden" accept="image/*" ref={fileUploadRef} onChange={handleSelectedImage}/>
            {imageError && <p className="text-red-500">{imageError}</p>}


          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePhotoSection;
