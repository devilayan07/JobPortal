import React, { useEffect, useState } from "react";
import CompanyPageHeader from "../components/Company/CompanyPageHeader";
import CompanyJobTable from "../components/Company/CompanyJobTable";
import { Search } from "lucide-react";
import { Filter } from "lucide-react";
import { ChevronDown } from "lucide-react";
import useAxios from "../hooks/useAxios";
import { ArrowUpDown } from "lucide-react";
import CreateJob from "./CreateJob";

function ManageJobsForCompany() {
  const { axiosInstance } = useAxios();
  const [openPosition, setOpenPosition] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 10;
  const [searchTerm, setSearchTerm] = useState("");
  const [showStatus, setShowStatus] = useState(false);
  const[showSort,setShowSort]=useState(false)
  const [selectedStatus, setSelectedStatus] = useState("Active");
  const[selectedSortOrder,setSelectedSortOrder]=useState("newest")
  const[totalJobs,setTotalJobs]=useState(0)
  const[jobToUpdate,setJobToUpdate]=useState(null)
  

  const handleStatus = (status) => {
    setSelectedStatus(status);
  };
  const handleSelectedSortOrder=(order)=>{
    setSelectedSortOrder(order)
  }

  const fetchOpenPositions = async ({
    currentPage=1,
    searchTerm="",
    selectedStatus="Active",
    selectedSortOrder=""
  }={}) => {
    try {
      const response = await axiosInstance.get(
        `${
          import.meta.env.VITE_SERVER_BASE_URL
        }/companies/jobs?page=${currentPage}&limit=${itemsPerPage}&search=${searchTerm}&status=${selectedStatus}&sort=${selectedSortOrder}`
      );
      console.log(response?.data?.data);
      setOpenPosition(response?.data?.data);
      setTotalPages(Math.ceil(response?.data?.count / itemsPerPage));
      setTotalJobs(response?.data?.count)
      console.log(currentPage, "currentPage");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOpenPositions({currentPage, searchTerm, selectedStatus,selectedSortOrder});
  }, [currentPage, searchTerm, selectedStatus,selectedSortOrder]);


  const handleEditJob=(job)=>{
    setJobToUpdate(job)
     
  }
  return (
    <>
    {
      jobToUpdate ? <CreateJob jobToUpdate={jobToUpdate}           onCreate={() => {
            setJobToUpdate(null);
          }}
/> :(
                <main className="container mx-auto px-4 py-8">
      <CompanyPageHeader />

      <div className="card p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[hsl(var(--color-muted-foreground))]" />
              <input
                type="search"
                placeholder="Search jobs by title"
                className="input pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <button
                className="btn btn-outline"
                onClick={() => setShowStatus(!showStatus)}
              >
                <Filter className="h-4 w-4 mr-2" />
                Status
                <ChevronDown className="h-4 w-4 ml-2" />
              </button>
              {showStatus && (
                <div
                  id="statusFilter"
                  className=" absolute top-full right-0 mt-2 w-48 card p-2 shadow-lg z-10"
                >
                  <button
                    className="w-full text-left px-3 py-2 text-sm rounded hover:bg-[hsl(var(--color-accent))]"
                    onClick={() => {
                      handleStatus("Active"), setShowStatus(false);
                    }}
                  >
                    Active
                  </button>
                  <button
                    className="w-full text-left px-3 py-2 text-sm rounded hover:bg-[hsl(var(--color-accent))]"
                    onClick={() => {
                      handleStatus("Closed"), setShowStatus(false);
                    }}
                  >
                    Closed
                  </button>
                  <button
                    className="w-full text-left px-3 py-2 text-sm rounded hover:bg-[hsl(var(--color-accent))]"
                    onClick={() => {
                      handleStatus("Archived"), setShowStatus(false);
                    }}
                  >
                    Archived
                  </button>
                </div>
              )}
            </div>
            <div className="relative">
              <button
                className="btn btn-outline"
                onClick={() => setShowSort(!showSort)}
              >
                <ArrowUpDown className="h-4 w-4 mr-2" />
                Sort
                <ChevronDown className="h-4 w-4 ml-2" />
              </button>
              {showSort &&   <div
                id="sortFilter"
                className="absolute top-full right-0 mt-2 w-48 card p-2 shadow-lg z-10"
              >
                <button className="w-full text-left px-3 py-2 text-sm rounded hover:bg-[hsl(var(--color-accent))]" onClick={()=>handleSelectedSortOrder("newest")}>
                  Newest First
                </button>
                <button className="w-full text-left px-3 py-2 text-sm rounded hover:bg-[hsl(var(--color-accent))]" onClick={()=>handleSelectedSortOrder("oldest")}>
                  Oldest First
                </button>
              </div>}

            </div>
          </div>
        </div>
      </div>

      <CompanyJobTable
        totalPages={totalPages}
        openPosition={openPosition}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
        totalJobs={totalJobs}
        onEdit={handleEditJob}
        fetchOpenPositions={fetchOpenPositions}
      />
    </main>

      )
    }

    </>

  );
}

export default ManageJobsForCompany;
