import React from 'react'

function Search({search,setSearch}) {
  return (
                        <div className="flex flex-col md:flex-row gap-4">
                            <div
                                className="flex-1 ring ring-transparent focus-within:ring-primary rounded-md place-content-center transition-all"
                            >
                                <div className="relative">
                                    <i
                                        data-lucide="search"
                                        className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                                    ></i>
                                    <input
                                        type="search"
                                        placeholder="Search jobs by title, skill..."
                                        className="input pl-10 w-full outline-none border-none"
                                        value={search}
                                        onChange={(e)=>setSearch(e.target.value)}
                                    />
                                </div>
                            </div>

                        </div>
  )
}

export default Search
