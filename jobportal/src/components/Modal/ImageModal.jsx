import { X,Save } from 'lucide-react'
import React from 'react'

function ImageModal({preview,onClose,onSave}) {
  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center'>
     <div className='rounded-md p-2 relative bg-white w-full'>
      <div className='flex  justify-end'>
        <button onClick={onClose}>
          <X className='h-5 w-5'/>

        </button>

      </div>
      <div className='flex flex-col justify-center items-center'>
        <h1>Do you want to save this Image?</h1>
        {preview &&  <img src={preview} alt="" className='image-preview' style={{height:"200px",width:"200px"}}/>}
        <div className='flex gap-4 mt-4'>

          <button className="btn btn-outline" onClick={onClose}>
            <X className='h-5 w-5'/>

           Cancel

          </button>

        <button type='submit' className='btn btn-primary' onClick={onSave}>
          <Save className="h-4 w-4 mr-2"/>
          Save

        </button>


        </div>
      </div>

     </div>
      
    </div>
  )
}

export default ImageModal
