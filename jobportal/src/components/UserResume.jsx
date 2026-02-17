import React, { useRef, useState } from "react";
import { FileText } from "lucide-react";
import { Download } from "lucide-react";
import { Upload } from "lucide-react";
import { getDateMonthYear } from "../utils";
import axios from "axios";
import useAxios from "../hooks/useAxios";
import { toast } from "react-toastify";

function UserResume({resumeName,resumeDate,resumeUrl,fetchUserInfo}) {
  const resumeRef=useRef(null)
  const[selectedFile,setSelectedFile]=useState(null)
  const[fileError,setFileError]=useState("")
  const{axiosInstance}=useAxios()


  const handleDownloadResume=async()=>{
    try {
      const response=await axios.get(`${import.meta.env.VITE_PDF_URL}${resumeUrl}`,{
        responseType:"blob",
                headers: {
          Accept: "application/pdf",
        },

      })
         // Create a Blob from the response data
         const pdfBlob=new Blob([response?.data],{type:"application/pdf"});
        
         // Create a temporary URL for the Blob
         const url=window.URL.createObjectURL(pdfBlob)

        // Create a temporary <a> element to trigger the download

        const tempLink=document.createElement("a");
        tempLink.href=url;
        tempLink.setAttribute(
          "download",
          `${resumeName}`
        ); //  Set the desired filename for the downloaded file

              // Append the <a> element to the body and click it to trigger the download
        document.body.appendChild(tempLink);
        tempLink.click();

                // Clean up the temporary elements and URL
        document.body.removeChild(tempLink);
        window.URL.revokeObjectURL(url);


      
    } catch (error) {
      console.log("Error downloading PDF",error)
      
    }

  }

  const handleResumeUpload=(e)=>{
    e.preventDefault()
    resumeRef.current.click()
  }

  const updateResume=async(e)=>{
        let selectFile = e.target.files[0];
    if (!selectFile) {
      setFileError("Please select a resume file.");
      setSelectedFile(null);
      return;
    }
    const maxSize = 5 * 1024 * 1024;
  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ];

    if (!allowedTypes.includes(selectFile.type)) {
      setFileError("Only PDF, DOC, or DOCX files are allowed.");
      setSelectedFile(null);
      return;
    } else if (selectFile.size > maxSize) {
      setFileError("File size must be less than 5 MB");
      setSelectedFile(null);
      return;
    }
    setSelectedFile(selectFile);

     const formData=new FormData()
     formData.append("resume",e.target.files[0])

     try {
      const response=await axiosInstance.post(`${import.meta.env.VITE_SERVER_BASE_URL}/users/resume`,formData)
      console.log(response?.data?.data)
      if(response?.status===200){
              fetchUserInfo()

        toast.success("Resume updated or uploaded successfully")
      }
      
     } catch (error) {
      console.log(error)
      
     }finally{
      e.target.value=""
     }
  }
  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold mb-4">Resume</h3>
      <div className="space-y-4">
        <div className="p-4 bg-[hsl(var(--color-secondary))] rounded-lg">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-12 w-12 rounded-lg bg-white flex items-center justify-center shrink-0">
              <FileText className="h-6 w-6 text-[hsl(var(--color-primary))]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">
                {resumeName}
              </p>
              <p className="text-xs text-[hsl(var(--color-muted-foreground))]">
                Updated {getDateMonthYear(resumeDate)}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="btn btn-outline w-full text-xs h-9" onClick={handleDownloadResume}>
                <Download className="h-3 w-3 mr-2" />
              Download
            </button>
          </div>
        </div>
        <div>
                  <button  className="btn btn-outline w-full" onClick={handleResumeUpload}>
            <Upload className="h-4 w-4 mr-2"/>
          Update Resume
        </button>
          <input type="file" ref={resumeRef} id="file"  className="hidden"   accept=".pdf,.doc,.docx" onChange={updateResume}/>
                     {fileError && <p className="text-red-500">{fileError}</p>}


        </div>

      </div>
    </div>
  );
}

export default UserResume;
