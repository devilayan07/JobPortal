import React from "react";

function EditLocation({ user, setUser}) {

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
      <h2 className="text-xl font-semibold mb-6">Location</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label for="city" className="label block mb-2">
            City *
          </label>
          <input
            type="text"
            id="city"
            name="city"
            className="input"
            placeholder="Enter city"
            value={user?.city}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label for="state" className="label block mb-2">
            State/Province *
          </label>
          <input
            type="text"
            id="state"
            name="state"
            className="input"
            placeholder="Enter state"
            value={user?.state}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label for="country" className="label block mb-2">
            Country *
          </label>
          <input
            type="text"
            id="country"
            name="country"
            className="input"
            placeholder="Enter country"
            value={user?.country}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label for="zipcode" className="label block mb-2">
            Zip Code
          </label>
          <input
            type="text"
            id="zipcode"
            name="zipcode"
            className="input"
            placeholder="Enter zip code"
            value={user?.zipCode}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}

export default EditLocation;
