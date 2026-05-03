import axios from 'axios'
import { X } from 'lucide-react'
import React, { useEffect, useState } from 'react'

function ResumeModal({resumeUrl,onClose}) {
    const[pdfUrl,setPdfUrl]=useState(null)

    const getResume=async()=>{
        try {
            const response=await axios.get(`${import.meta.env.VITE_PDF_URL}${resumeUrl}`,{
                        responseType:"blob",
                headers: {
          Accept: "application/pdf",
        },

            })
        const pdfBlob=new Blob([response?.data],{type:"application/pdf"});
            const fileURL = URL.createObjectURL(pdfBlob); // ✅ Convert to URL

        setPdfUrl(fileURL)

            
        } catch (error) {
            console.log(error)
            
        }
    }

    useEffect(()=>{
        getResume()
    },[])
    
  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 '>
        <div className='rounded-md p-2 relative bg-white w-full'>
            <div className='flex justify-between'>
            <h1 className='text-lg font-bold'>Resume.pdf</h1>
            <button onClick={onClose}>
                <X className='h-5 w-5'/>
            </button>

            </div>
            <div className='flex justify-center '>
             <iframe src={pdfUrl} height="100%"></iframe>
            </div>

        </div>
      
    </div>
  )
}

export default ResumeModal
