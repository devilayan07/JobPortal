import React from "react";

function UserSkills({skill}) {
  return (
    <div className="card p-6">
      <h2 className="text-xl font-semibold mb-4">Skills</h2>
      {skill?.map((item)=><div key={item} className="flex flex-wrap gap-2">
        <span className="badge badge-secondary">{item}</span>
      </div>
)}
    </div>
  );
}

export default UserSkills;
