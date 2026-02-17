import React, { useState } from "react";
import { X } from "lucide-react";
import { Send } from "lucide-react";
import useAxios from "../hooks/useAxios";
import { toast } from "react-toastify";

function AppliedJobModal({onClose,jobId,fetchAppliedJob,fetchRecommendedJob}) {
    const maxLength=500;
    const[coverLetter,setCoverLetter]=useState("")
    const[loading,setLoading]=useState(false)
    const{axiosInstance}=useAxios()
    const handleChange=(e)=>{
        setCoverLetter(e.target.value)
    }

    const handleSubmitApplication=async(e)=>{
        e.preventDefault()
        setLoading(true)
        const payload={
            "coverLetter":coverLetter
        }
        try {
            const response=await axiosInstance.post(`${import.meta.env.VITE_SERVER_BASE_URL}/applications/jobs/${jobId}/apply`,payload)
            if(response?.status===201){
                toast.success("Job applied succesfully")
                                       onClose()

                await fetchAppliedJob()
                await fetchRecommendedJob()
            }
            
        } catch (error) {
            console.log(error)
            
        }finally{
            setLoading(false)
        }
    }
  return (
    <div
      id="applyDialog"
      className=" fixed inset-0 bg-black/50 z-50 items-center justify-center p-4"
    >
      <div className="card max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Apply for Position</h2>
              <p className="text-sm text-[hsl(var(--color-muted-foreground))] mt-1">
                Complete the form below to submit your application
              </p>
            </div>
            <button onClick={onClose} className="btn-ghost p-2">
                <X className="h-5 w-5"/>
            </button>
          </div>

          <div className="space-y-3">
            <label for="coverMessage" className="text-sm font-medium">
              Cover Message
              <span className="text-[hsl(var(--color-muted-foreground))]">
                (Optional)
              </span>
            </label>
            <textarea
              id="coverMessage"
              rows="5"
              maxLength={maxLength}
              value={coverLetter}
              name="coverLetter"
              className="input resize-none"
              placeholder="Write a brief message about why you're a great fit for this role..."
              onChange={handleChange}
            ></textarea>
            <p className="text-xs text-[hsl(var(--color-muted-foreground))]">
              <span id="charCount">{coverLetter?.length}</span>/{maxLength} characters
            </p>
          </div>

          <div className="flex gap-3 pt-4 border-t border-[hsl(var(--color-border))]">
            <button onClick={onClose} className="btn btn-outline flex-1">
              Cancel
            </button>
            <button
            onClick={handleSubmitApplication}
              className="btn btn-primary flex-1"
            >
                <Send className="h-4 w-4 mr-2"/>
                {loading ? "Submitting...." :"Submit Application"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppliedJobModal;
