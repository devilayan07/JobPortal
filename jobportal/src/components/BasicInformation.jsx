import React from "react";

function BasicInformation({user,setUser}) {

  const handleChange=(e)=>{
    const name=e.target.name;
    const value=e.target.value;

    setUser((prev)=>({
      ...prev,
      [name]:value
    }))
  }
  return (
    <div className="card p-6">
      <h2 className="text-xl font-semibold mb-6">Basic Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="label block mb-2">
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="input"
            placeholder="Enter last name"
            value={user?.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="label block mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="input"
            placeholder="Enter email"
            value={user?.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="phone" className="label block mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="input"
            placeholder="Enter phone number"
            value={user?.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="title" className="label block mb-2">
            Professional Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="input"
            placeholder="e.g. Full Stack Developer"
            value={user?.title}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}

export default BasicInformation;
