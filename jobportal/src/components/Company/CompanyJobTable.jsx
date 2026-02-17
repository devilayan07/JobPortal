import React from "react";
import CompanyPagination from "./CompanyPagination";
import { getDateMonthYear } from "../../utils";
import { Edit } from "lucide-react";
import { Trash2 } from "lucide-react";
import useAxios from "../../hooks/useAxios";
import { toast } from "react-toastify";

function CompanyJobTable({totalPages,openPosition,setCurrentPage,currentPage,itemsPerPage,totalJobs,onEdit,fetchOpenPositions}) {
   const {axiosInstance}=useAxios()
  const handleDeleteJob=async(id)=>{
    try {
      const response=await axiosInstance.delete(`${import.meta.env.VITE_SERVER_BASE_URL}/jobs/${id}`)
      if(response?.status===200){
        toast.success(response?.data?.message)
         await fetchOpenPositions()
      }
      
    } catch (error) {
      console.log(error)
      
    }

  }

  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[hsl(var(--color-muted))] border-b border-[hsl(var(--color-border))]">
            <tr>
              <th className="text-left py-4 px-6 text-sm font-medium">
                <input
                  type="checkbox"
                  className="rounded border-[hsl(var(--color-input))]"
                />
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium">
                Job Title
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium">
                Status
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium">
                Applicants
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium">
                Posted Date
              </th>
              {/* <th className="text-left py-4 px-6 text-sm font-medium">
                Expires
              </th> */}
              <th className="text-right py-4 px-6 text-sm font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[hsl(var(--color-border))]">
            {Array.isArray(openPosition) && openPosition?.map((item)=>  <tr key={item?.id} className="hover:bg-[hsl(var(--color-accent))] transition-colors">
              <td className="py-4 px-6">
                <input
                  type="checkbox"
                  className="rounded border-[hsl(var(--color-input))]"
                />
              </td>
              <td className="py-4 px-6">
                <div>
                  <a
                    href="job-details.html"
                    className="font-medium hover:text-[hsl(var(--color-primary))]"
                  >
                    {item?.title}
                  </a>
                  <div className="flex items-center gap-3 mt-1 text-xs text-[hsl(var(--color-muted-foreground))]">
                    <span className="flex items-center gap-1">
                      <i data-lucide="map-pin" className="h-3 w-3"></i>
                      {item?.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <i data-lucide="briefcase" className="h-3 w-3"></i>
                      {item?.type}
                    </span>
                  </div>
                </div>
              </td>
              <td className="py-4 px-6">
                <span className="badge badge-success">{item?.status}</span>
              </td>
              <td className="py-4 px-6">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{item?.applicants}</span>
                </div>
              </td>
              <td className="py-4 px-6 text-sm text-[hsl(var(--color-muted-foreground))]">
                {getDateMonthYear(item?.createdAt)}
              </td>
              {/* <td className="py-4 px-6 text-sm text-[hsl(var(--color-muted-foreground))]">
                Dec 28, 2025
              </td> */}
              <td className="py-4 px-6">
                <div className="flex items-center justify-end gap-2">
                  <button className="btn-ghost p-2" title="Edit" onClick={()=>onEdit(item)}>
                    <Edit className="h-4 w-4"/>
                  </button>

                  <button className="btn-ghost p-2 text-red-600" title="Delete" onClick={()=>handleDeleteJob(item?.id)}>
                    <Trash2 className="h-4 w-4"/>
                  </button>
                </div>
              </td>
            </tr>)}



          </tbody>
        </table>
      </div>

      <div
        className=" p-4 bg-[hsl(var(--color-accent))] border-t border-[hsl(var(--color-border))]"
        id="bulkActionsBar"
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">
            <span id="selectedCount">0</span> jobs selected
          </span>
          <div className="flex items-center gap-2">
            <button className="btn btn-outline text-sm h-9">
              <i data-lucide="pause-circle" className="h-3 w-3 mr-2"></i>
              Deactivate
            </button>
            <button className="btn btn-outline text-sm h-9">
              <i data-lucide="play-circle" className="h-3 w-3 mr-2"></i>
              Activate
            </button>
            <button className="btn btn-outline text-sm h-9 text-red-600">
              <i data-lucide="trash-2" className="h-3 w-3 mr-2"></i>
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* <!-- Pagination --> */}
      <CompanyPagination totalPages={totalPages} setCurrentPage={setCurrentPage} currentPage={currentPage} itemsPerPage={itemsPerPage} totalJobs={totalJobs}/>

    </div>
  );
}

export default CompanyJobTable;
