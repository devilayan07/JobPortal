import React, { useState } from "react";
import CompanyPageHeader from "../components/Company/CompanyPageHeader";
import JobTypeForCreation from "../components/Job/JobTypeForCreation";
import WorkMode from "../components/Job/WorkMode";
import JobCategory from "../components/Job/JobCategory";
import JobExperience from "../components/Job/JobExperience";
import { Plus } from "lucide-react";
import { X } from "lucide-react";
import { formatDateForApi, formatDateForInput } from "../utils";
import useAxios from "../hooks/useAxios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
function CreateJob({ jobToUpdate, onCreate }) {
  const [user, setUser] = useState(
    jobToUpdate || {
      title: "",
      type: "",
      workMode: "",
      category: "",
      experienceLevel: "",
      location: "",
      salaryMin: 5000,
      salaryMax: 7000,
      salaryPeriod: "",
      description: "",
      requirements: "",
      benefits: "",
      skills: [],
      vacancies: 1,
      deadline: "",
    }
  );
  const [error, setError] = useState("");
  const [addSkills, setAddSkills] = useState("");
  const [loading, setLoading] = useState(false);
  const { axiosInstance } = useAxios();

  const validation = () => {
    let error = {};
    if (!user.title) {
      error.title = "Job Title is required";
    }
    if (!user?.type) {
      error.type = "Job Type is required";
    }
    if (!user?.workMode) {
      error.workMode = "Workmode is required";
    }
    if (!user?.category) {
      error.category = "Category is required";
    }
    if (!user?.experienceLevel) {
      error.experienceLevel = "Experience is required";
    }
    if (!user?.location) {
      error.location = "Location is required";
    }
    if (user?.salaryMin <= 0) {
      error.salaryMin = "Minimum salary must be greater than 50000";
    }
    if (user?.salaryMax <= 0) {
      error.salaryMax = "Maximum salary must be greater than 7000";
    }
    if (user?.salaryMax < user?.salaryMin) {
      error.salaryMax = "Maximum salary must be greater than minimum salary";
    }
    if (!user?.salaryPeriod) {
      error.salaryPeriod = "Salary Period is required";
    }
    if (!user?.description) {
      error.description = "Description is required";
    }
    if (user.salaryMax < user.salaryMin) {
      error.salaryMax = "Maximum salary must be greater than minimum salary";
    }

    if (!user.requirements) {
      error.requirements = "Requirements is required";
    }
    if (!user.benefits) {
      error.benefits = "Benefits is required";
    }
    if (user.skills.length === 0) {
      error.skills = "At least One Skill is required";
    }
    if (user?.vacancies <= 0) {
      error.vacancies = "Vacancies must be at least 1";
    }
    if (!user?.deadline) {
      error.deadline = "Deadline is required";
    }
    return error;
  };

  const postUserData = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError((prev) => ({
      ...prev,
      [name]: value ? "" : `${name} is required`,
    }));
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setUser((prev) => ({
      ...prev,
      [name]:
        name === "salaryMin" || name === "salaryMax" || name === "vacancies"
          ? Number(value)
          : name === "deadline"
          ? formatDateForApi(value)
          : value,
    }));

    setError((prev) => ({
      ...prev,
      [name]: e.target.value ? "" : `${name} is required`,
    }));
  };

  const handleAddSkills = () => {
    if (!addSkills.trim()) return;

    setUser((prev) => ({
      ...prev,
      skills: [...prev.skills, addSkills.trim()],
    }));
    setAddSkills("");
  };

  const handleRemoveSkills = (item) => {
    const filterSkills = user?.skills?.filter((skill) => item !== skill);
    setUser((prev) => ({
      ...prev,
      skills: filterSkills,
    }));
  };
  const isCreate = jobToUpdate === null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validation();
    setError(errors);
    if (Object.keys(errors).length === 0) {
      setLoading(true);
      let response;
      if (isCreate) {
        try {
          response = await axiosInstance.post(
            `${import.meta.env.VITE_SERVER_BASE_URL}/jobs`,
            user
          );
          if (response?.status === 201) {
            toast.success("Job created successfully");
            setUser({
              title: "",
              type: "",
              workMode: "",
              category: "",
              experienceLevel: "",
              location: "",
              salaryMin: 5000,
              salaryMax: 7000,
              salaryPeriod: "",
              description: "",
              requirements: "",
              benefits: "",
              skills: [],
              vacancies: 1,
              deadline: "",
            });
          }
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      } else {
        try {
          response = await axiosInstance.put(
            `${import.meta.env.VITE_SERVER_BASE_URL}/jobs/${jobToUpdate?.id}`,
            user
          );
          if (response?.status === 200) {
            toast.success("Job Updated Successfully");
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    onCreate?.();
  };
  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <div class="mb-8">
        <div className="flex items-center gap-2 text-sm text-[hsl(var(--color-muted-foreground))] mb-2">
          <Link
            to={"/companyDashboard"}
            className="hover:text-[hsl(var(--color-primary))]"
          >
            Dashboard
          </Link>
          <i data-lucide="chevron-right" class="h-4 w-4"></i>
          <span className="text-[hsl(var(--color-foreground))]">
            Create Job
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Post a New Job</h1>
            <p className="text-[hsl(var(--color-muted-foreground))]">
              Fill in the details to create a new job posting
            </p>
          </div>
        </div>
      </div>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-6">Basic Information</h2>
          <div className="space-y-6">
            <div>
              <label for="jobTitle" className="label block mb-2">
                Job Title *
              </label>
              <input
                type="text"
                id="jobTitle"
                name="title"
                className="input"
                value={user?.title}
                placeholder="e.g. Senior Full Stack Developer"
                onChange={postUserData}
              />
              <span style={{ color: "red" }}> {error.title} </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <JobTypeForCreation
                user={user}
                setUser={setUser}
                error={error}
                setError={setError}
              />

              <WorkMode
                user={user}
                setUser={setUser}
                error={error}
                setError={setError}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <JobCategory
                user={user}
                setUser={setUser}
                error={error}
                setError={setError}
              />

              <JobExperience
                user={user}
                setUser={setUser}
                error={error}
                setError={setError}
              />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-6">
            Location & Compensation
          </h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label for="city" className="label block mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  id="city"
                  name="location"
                  className="input"
                  placeholder="e.g. San Francisco"
                  value={user?.location}
                  onChange={postUserData}
                />
                <span style={{ color: "red" }}> {error.location} </span>
              </div>

              <div>
                <label for="salaryMin" className="label block mb-2">
                  Minimum Salary ($)
                </label>
                <input
                  type="text"
                  id="salaryMin"
                  className="input"
                  name="salaryMin"
                  value={user?.salaryMin}
                  placeholder="e.g. 100000"
                  onChange={handleChange}
                />
                <span style={{ color: "red" }}> {error.salaryMin} </span>
              </div>

              <div>
                <label for="salaryMax" className="label block mb-2">
                  Maximum Salary ($)
                </label>
                <input
                  type="text"
                  id="salaryMax"
                  name="salaryMax"
                  className="input"
                  value={user?.salaryMax}
                  placeholder="e.g. 150000"
                  onChange={handleChange}
                />
                <span style={{ color: "red" }}> {error.salaryMax} </span>
              </div>

              <div>
                <label for="salaryPeriod" className="label block mb-2">
                  Salary Period
                </label>
                <select
                  id="salaryPeriod"
                  className="select"
                  name="salaryPeriod"
                  value={user?.salaryPeriod}
                  onChange={handleChange}
                >
                  <option value="">Select Salary Period</option>

                  <option value="yearly">Yearly</option>
                  <option value="monthly">Monthly</option>
                  <option value="hourly">Hourly</option>
                </select>
              </div>
              <span style={{ color: "red" }}> {error.salaryPeriod} </span>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-6">Job Description</h2>
          <div className="space-y-6">
            <div>
              <label for="description" className="label block mb-2">
                Job Description *
              </label>
              <textarea
                id="description"
                className="textarea w-full"
                name="description"
                rows="8"
                placeholder="Describe the role, responsibilities, and what makes this opportunity exciting..."
                value={user?.description}
                onChange={postUserData}
              ></textarea>
              <span style={{ color: "red" }}> {error.description} </span>

              <p className="text-xs text-[hsl(var(--color-muted-foreground))] mt-2">
                Provide a detailed description of the role and responsibilities
              </p>
            </div>

            <div>
              <label for="requirements" className="label block mb-2">
                Requirements & Qualifications
              </label>
              <textarea
                id="requirements"
                name="requirements"
                className="textarea w-full"
                rows="6"
                placeholder="List the required skills, qualifications, and experience..."
                value={user?.requirements}
                onChange={postUserData}
              ></textarea>
              <span style={{ color: "red" }}> {error.requirements} </span>
            </div>

            <div>
              <label for="benefits" className="label block mb-2">
                Benefits & Perks
              </label>
              <textarea
                id="benefits"
                className="textarea w-full"
                name="benefits"
                value={user?.benefits}
                onChange={postUserData}
                rows="5"
                placeholder="Describe the benefits, perks, and what makes your company a great place to work..."
              ></textarea>
            </div>
            <span style={{ color: "red" }}> {error.benefits} </span>
          </div>
        </div>

        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-6">Required Skills</h2>
          <div className="space-y-4">
            <div>
              <label for="skillInput" className="label block mb-2">
                Add Skills *
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  id="skillInput"
                  name="skills"
                  className="input flex-1"
                  value={addSkills}
                  placeholder="Type a skill and press Add"
                  onChange={(e) => {
                    setAddSkills(e.target.value),
                      setError((prev) => ({
                        ...prev,
                        skills: e.target.value ? "" : `${name} is required`,
                      }));
                  }}
                />
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleAddSkills}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  {isCreate ? "Add" : "Update"}
                </button>
              </div>
              <p className="text-xs text-[hsl(var(--color-muted-foreground))] mt-2">
                Add technical and soft skills required for this position
              </p>

              <span style={{ color: "red" }}> {error.skills} </span>
            </div>

            <div>
              <label className="label block mb-3">Added Skills</label>
              <div className="flex flex-wrap gap-2">
                {user?.skills?.map((item, index) => (
                  <span
                    key={index}
                    className="badge badge-secondary inline-flex items-center gap-1"
                  >
                    {item}
                    <button
                      type="button"
                      className="hover:text-red-600"
                      onClick={() => handleRemoveSkills(item)}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-6">Application Settings</h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label for="vacancies" className="label block mb-2">
                  Number of Vacancies
                </label>
                <input
                  type="text"
                  id="vacancies"
                  name="vacancies"
                  className="input"
                  placeholder="e.g. 2"
                  value={user?.vacancies}
                  min="1"
                  onChange={handleChange}
                />
                <span style={{ color: "red" }}> {error.vacancies} </span>
              </div>

              <div>
                <label for="deadline" className="label block mb-2">
                  Application Deadline *
                </label>
                <input
                  type="date"
                  id="deadline"
                  name="deadline"
                  className="input"
                  value={formatDateForInput(user?.deadline)}
                  onChange={handleChange}
                />
                <span style={{ color: "red" }}> {error.deadline} </span>
              </div>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1"></div>
            <a href="company-dashboard.html" className="btn btn-outline">
              Cancel
            </a>
            <button type="submit" className="btn btn-primary">
              <i data-lucide="send" className="h-4 w-4 mr-2"></i>
              {loading ? "loading..." : isCreate ? "Publish Job" : "Update Job"}
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}

export default CreateJob;
