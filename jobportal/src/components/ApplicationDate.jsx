import React from "react";

function ApplicationDate({ selectedDate, setSelectedDate }) {
  const handleChange = (e) => {
    setSelectedDate(e.target.value);
  };
  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium mb-3">Application Date</h3>
      <div className="space-y-2">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="date"
            value="last 7 days"
            className="border-[hsl(var(--color-input))]"
            checked={selectedDate==="last 7 days"}
            onChange={handleChange}
          />
          <span className="text-sm">Last 7 Days</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="date"
            value="last 14 days"
            className="border-[hsl(var(--color-input))]"
            onChange={handleChange}
            checked={selectedDate==="last 14 days"}
          />
          <span className="text-sm">Last 14 Days</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="date"
            value="last 30 days"
            className="border-[hsl(var(--color-input))]"
            onChange={handleChange}
            checked={selectedDate==="last 30 days"}
          />
          <span className="text-sm">Last 30 Days</span>
        </label>
      </div>
    </div>
  );
}

export default ApplicationDate;
