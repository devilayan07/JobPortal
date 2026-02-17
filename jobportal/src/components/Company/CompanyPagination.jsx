import React from 'react'
import { ChevronLeft } from 'lucide-react'
import { ChevronRight } from 'lucide-react'

function CompanyPagination({totalPages,setCurrentPage,currentPage,itemsPerPage,totalJobs}) {
  console.log(totalPages,"totalPages")
  

    const handlePrevChange=()=>{
        if(currentPage>1){
            setCurrentPage(currentPage-1)
        }
    }

    const handleNextChange=()=>{
        if(currentPage<totalPages){
            setCurrentPage(currentPage+1)
        }
    }

    const startItem=(currentPage-1)*itemsPerPage+1
    const endItem=Math.min(currentPage*itemsPerPage,totalJobs)
  return (
      <div className="p-4 border-t border-[hsl(var(--color-border))]">
        <div className="flex items-center justify-between">
          <div className="text-sm text-[hsl(var(--color-muted-foreground))]">
            Showing <span className="font-medium">{startItem}</span> to
            <span className="font-medium">{endItem}</span> of
            <span className="font-medium">{totalJobs}</span> jobs
          </div>
          <div className="flex items-center gap-2">
            <button className="btn btn-outline h-9 px-3" onClick={handlePrevChange} disabled={currentPage===1}>
                <ChevronLeft className="h-4 w-4" />
            </button>
            {Array.from({length:totalPages},(_,index)=>{
              return   <button key={index} className="btn btn-primary h-9 px-3" onClick={()=>setCurrentPage(index+1)}>{index+1}</button>

            })}
           <button className="btn btn-outline h-9 px-3" onClick={handleNextChange} disabled={currentPage===totalPages}>
            <ChevronRight className="h-4 w-4"/>
            </button>
          </div>
        </div>
      </div>  )
}

export default CompanyPagination
