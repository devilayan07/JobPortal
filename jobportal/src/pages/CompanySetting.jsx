import React, { useEffect, useRef, useState } from "react";
import {
  Building2,
  Camera,
  CreditCard,
  Facebook,
  Github,
  Instagram,
  Phone,
  Settings,
  Share2,
  Shield,
  Upload,
  ChevronRight,
  Linkedin,
  Twitter,
  Save,
} from "lucide-react";
import useAxios from "../hooks/useAxios";
import { toast } from "react-toastify";

function CompanySetting() {
  const [company, setCompany] = useState({
    name: "",
    industry: "",
    description: "",
    location: "",
    websiteUrl: "",
    employeeCount: "",
    foundedYear: 0,
    socialLinks: {
      linkedin: "",
      facebook: "",
      twitter: "",
      instagram: "",
      github: "",
    },
  });
  const [error, setError] = useState("");
  const { axiosInstance } = useAxios();
  const companySlug = localStorage.getItem("slug");
  console.log(companySlug, "companySlug");
  const [loading, setLoading] = useState(false);
  const companyImageRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageError, setImageError] = useState("");
  const [preview, setPreview] = useState(null);

  const fetchCompanyData = async () => {
    try {
      const response = await axiosInstance.get(
        `${import.meta.env.VITE_SERVER_BASE_URL}/companies/${companySlug}`
      );
      if (response?.status === 200) {
        console.group(response?.data?.data);
        setCompany(response?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCompanyData();
  }, [companySlug]);

  const companyImage = `${import.meta.env.VITE_PDF_URL}${company?.logoUrl}`;

  const validation = () => {
    let error = {};
    if (!company?.name) {
      error.name = "Name is required";
    }
    if (!company?.industry) {
      error.industry = "Industry is required";
    }
    if (!company?.location) {
      error.location = "Location is required";
    }
    if (!company?.websiteUrl) {
      error.websiteUrl = "Website Url is required";
    }
    if (!company.employeeCount) {
      error.employeeCount = "Employee Count is required";
    }
    if (!company.foundedYear) {
      error.foundYear = "Found Year is required";
    }
    if (!company.phone) {
      error.phone = "Phone is required";
    }
    if (!company.state) {
      error.state = "State is required";
    }
    if (!company.city) {
      error.city = "City is required";
    }
    if (!company.country) {
      error.country = "Country is required";
    }
    if (!company.hrEmail) {
      error.hrEmail = "Hr Email is required";
    }
    if (!company.description) {
      error.description = "Description is required";
    }
    return error;
  };

  const postCompanyData = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(e.target.value);

    setCompany((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError((prev) => ({
      ...prev,
      [name]: value ? "" : `${name} is required`,
    }));
  };

  const handleCompanyEdit = async () => {
    const errors = validation();
    setError(errors);
    if (Object.keys(error).length === 0) {
      setLoading(true);
      try {
        const response = await axiosInstance.put(
          `${import.meta.env.VITE_SERVER_BASE_URL}/companies/profile`,
          company
        );
        if (response?.status === 200) {
          toast.success("Company Profile Updated");
          fetchCompanyData();
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSocialLinkChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setCompany((prev) => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [name]: value },
    }));
  };

  const handleImageUpload = (e) => {
    e.preventDefault();
    companyImageRef.current.click();
  };

  const handleSelectedImage = (e) => {
    const selectFile = e.target.files[0];

    if (!selectFile) {
      setImageError("Please select an image file.");
      setSelectedFile(null);
      setPreview(null);
      return;
    }
    const maxSize = 2 * 1024 * 1024;
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!allowedTypes.includes(selectFile.type)) {
      setImageError("File type must be png or jpg");
      setSelectedFile(null);
      setPreview(null);
      return;
    } else if (selectFile.size > maxSize) {
      setImageError("File size must be less than 2 MB");
      setSelectedFile(null);
      setPreview(null);
      return;
    }

    setImageError("");
    setSelectedFile(selectFile);
    setPreview(URL.createObjectURL(selectFile));
  };

  const uploadPhoto=async()=>{
    if(!selectedFile) return 

    try {
      const formData=new FormData()
      formData.append("logo",selectedFile)
      const response=await axiosInstance.post(`${import.meta.env.VITE_SERVER_BASE_URL}/companies/logo`,formData)
      if(response?.status===200){
        fetchCompanyData()
      }
      
    } catch (error) {
      console.log(error)
      
    }

  }

  useEffect(()=>{
    if(selectedFile){
         uploadPhoto()

    }
  },[selectedFile])
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-[hsl(var(--color-muted-foreground))] mb-2">
          <a
            href="company-dashboard.html"
            className="hover:text-[hsl(var(--color-primary))]"
          >
            Dashboard
          </a>
          <ChevronRight className="h-4 w-4" />
          <span className="text-[hsl(var(--color-foreground))]">
            Company Settings
          </span>
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">Company Settings</h1>
          <p className="text-[hsl(var(--color-muted-foreground))]">
            Manage your company profile and preferences
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <div className="card p-4">
            <nav className="space-y-1">
              <a
                href="#company-info"
                className="flex items-center gap-3 px-3 py-2 text-sm font-medium bg-[hsl(var(--color-accent))] rounded-md"
              >
                <Building2 className="h-4 w-4" />
                Company Info
              </a>
              <a
                href="#contact"
                className="flex items-center gap-3 px-3 py-2 text-sm text-[hsl(var(--color-muted-foreground))] hover:bg-[hsl(var(--color-accent))] hover:text-[hsl(var(--color-foreground))] rounded-md transition-colors"
              >
                <Phone className="h-4 w-4" />
                Contact Details
              </a>
              <a
                href="#social"
                className="flex items-center gap-3 px-3 py-2 text-sm text-[hsl(var(--color-muted-foreground))] hover:bg-[hsl(var(--color-accent))] hover:text-[hsl(var(--color-foreground))] rounded-md transition-colors"
              >
                <Share2 className="h-4 w-4" />
                Social Media
              </a>
              <a
                href="#preferences"
                className="flex items-center gap-3 px-3 py-2 text-sm text-[hsl(var(--color-muted-foreground))] hover:bg-[hsl(var(--color-accent))] hover:text-[hsl(var(--color-foreground))] rounded-md transition-colors"
              >
                <Settings className="h-4 w-4" />
                Preferences
              </a>
              <a
                href="#billing"
                className="flex items-center gap-3 px-3 py-2 text-sm text-[hsl(var(--color-muted-foreground))] hover:bg-[hsl(var(--color-accent))] hover:text-[hsl(var(--color-foreground))] rounded-md transition-colors"
              >
                <CreditCard className="h-4 w-4" />
                Billing
              </a>
              <a
                href="#account"
                className="flex items-center gap-3 px-3 py-2 text-sm text-[hsl(var(--color-muted-foreground))] hover:bg-[hsl(var(--color-accent))] hover:text-[hsl(var(--color-foreground))] rounded-md transition-colors"
              >
                <Shield className="h-4 w-4" />
                Account Security
              </a>
            </nav>
          </div>

          <div className="card p-6 mt-6">
            <div className="flex flex-col items-center text-center">
              <div className="h-20 w-20 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-4">
                {companyImage ? (
                  <img
                    src={companyImage}
                    alt="Upload preview"
                    className="image-preview"
                  />
                ) : (
                  <Building2 className="h-10 w-10 text-white" />
                )}
              </div>
              <h3 className="font-semibold mb-1">{company?.name}</h3>
              <p className="text-xs text-[hsl(var(--color-muted-foreground))] mb-4">
                Premium Member
              </p>
              <div className="w-full space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-[hsl(var(--color-muted-foreground))]">
                    Active Jobs
                  </span>
                  <span className="font-medium">24</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[hsl(var(--color-muted-foreground))]">
                    Total Applicants
                  </span>
                  <span className="font-medium">156</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[hsl(var(--color-muted-foreground))]">
                    Member Since
                  </span>
                  <span className="font-medium">Jan 2024</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <div className="lg:col-span-3 space-y-6">
          {/* <!-- Company Logo and Name --> */}
          <div id="company-info" className="card p-6">
            <h2 className="text-xl font-semibold mb-6">Company Information</h2>

            {/* <!-- Logo Upload --> */}
            <div className="mb-6">
              <label className="label mb-2">Company Logo</label>
              <div className="flex items-start gap-6">
                <div className="relative">
                  <div className="h-24 w-24 rounded-lg bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    {
                      preview ? (
                      <img
                        src={preview}
                        alt="Upload preview"
                        className="image-preview"
                      />

                      ): companyImage ? (
                      <img
                        src={companyImage}
                        alt="Upload preview"
                        className="image-preview"
                      />
                    ) : (
                      <Building2 className="h-12 w-12 text-white" />
                    )

                    }
                  </div>
                  <button
                    className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-[hsl(var(--color-primary))] text-[hsl(var(--color-primary-foreground))] flex items-center justify-center shadow-lg hover:bg-[hsl(var(--color-primary))]/90"
                    onClick={handleImageUpload}
                  >
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex-1">
                  <input
                    type="file"
                    id="logoUpload"
                    className="hidden"
                    accept="image/*"
                    ref={companyImageRef}
                    onChange={handleSelectedImage}
                  />
                  <label
                    for="logoUpload"
                    className="btn btn-outline cursor-pointer"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Logo
                  </label>
                  {imageError &&                   <p className="text-xs text-[hsl(var(--color-muted-foreground))] mt-2">
                    {imageError}
                  </p>
}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="label mb-2" for="companyName">
                  Company Name
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="companyName"
                  className="input"
                  name="name"
                  value={company?.name}
                  onChange={postCompanyData}
                  placeholder="Enter company name"
                  required
                />
                <span style={{ color: "red" }}> {error.name} </span>
              </div>
              <div>
                <label className="label mb-2" for="industry">
                  Industry
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="industry"
                  className="input"
                  name="industry"
                  value={company?.industry}
                  onChange={postCompanyData}
                  placeholder="e.g., Technology, Healthcare"
                />
                <span style={{ color: "red" }}> {error.industry} </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="label mb-2" for="companySize">
                  Company Size
                </label>
                <select
                  id="companySize"
                  className="input"
                  name="employeeCount"
                  value={company.employeeCount || ""}
                  onChange={postCompanyData}
                >
                  {company?.employeeCount ? (
                    <option value={company?.employeeCount}>
                      {company?.employeeCount}
                    </option>
                  ) : (
                    <option value="">Select company size</option>
                  )}

                  <option value="1000">501-1000 employees</option>
                  <option value="5000">1001-5000 employees</option>
                  <option value="10000">5001-10000 employees</option>
                </select>
                <span style={{ color: "red" }}> {error.employeeCount} </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="label mb-2" for="website">
                  Website
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  id="website"
                  className="input"
                  name="websiteUrl"
                  value={company?.websiteUrl}
                  onChange={postCompanyData}
                  placeholder="https://yourcompany.com"
                />
                <span style={{ color: "red" }}> {error.websiteUrl} </span>
              </div>
              <div>
                <label className="label mb-2" for="founded">
                  Founded Year
                </label>
                <input
                  type="text"
                  id="founded"
                  className="input"
                  name="foundYear"
                  value={company?.foundedYear}
                  onChange={postCompanyData}
                  placeholder="e.g., 2020"
                />
                <span style={{ color: "red" }}> {error.foundedYear} </span>
              </div>
            </div>

            <div className="mb-4">
              <label className="label mb-2" for="about">
                About Company
                <span className="text-red-500">*</span>
              </label>
              <textarea
                id="about"
                className="textarea"
                rows="6"
                name="description"
                onChange={postCompanyData}
                value={company?.description}
                placeholder="Tell us about your company..."
              />
              <span style={{ color: "red" }}> {error.description} </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="label mb-2" for="city">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  className="input"
                  name="city"
                  value={company?.city}
                  onChange={postCompanyData}
                  placeholder="City"
                />
                <span style={{ color: "red" }}> {error.city} </span>
              </div>
              <div>
                <label className="label mb-2" for="state">
                  State/Province
                </label>
                <input
                  type="text"
                  id="state"
                  className="input"
                  name="state"
                  value={company?.state}
                  onChange={postCompanyData}
                  placeholder="State"
                />
                <span style={{ color: "red" }}> {error.state} </span>
              </div>
              <div>
                <label className="label mb-2" for="country">
                  Country
                </label>
                <input
                  type="text"
                  id="country"
                  className="input"
                  name="country"
                  value={company?.country}
                  placeholder="Country"
                  onChange={postCompanyData}
                />
                <span style={{ color: "red" }}> {error.country} </span>
              </div>
            </div>
          </div>

          <div id="contact" className="card p-6">
            <h2 className="text-xl font-semibold mb-6">Contact Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="label mb-2" for="phone">
                  Phone Number
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="input"
                  value={company?.phone}
                  name="phone"
                  onChange={postCompanyData}
                  placeholder="+1 (555) 000-0000"
                  required
                />
                <span style={{ color: "red" }}> {error.phone} </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="label mb-2" for="hrEmail">
                  HR Department Email
                </label>
                <input
                  type="email"
                  id="hrEmail"
                  className="input"
                  name="hrEmail"
                  value={company?.hrEmail}
                  onChange={postCompanyData}
                  placeholder="hr@example.com"
                />
                <span style={{ color: "red" }}> {error.hrEmail} </span>
              </div>
              <div>
                <label className="label mb-2" for="supportEmail">
                  Information Email
                </label>
                <input
                  type="email"
                  id="supportEmail"
                  className="input"
                  value={company?.infoEmail}
                  name="infoEmail"
                  onChange={postCompanyData}
                  placeholder="support@example.com"
                />
                <span style={{ color: "red" }}> {error.infoEmail} </span>
              </div>
            </div>
          </div>

          <div id="social" className="card p-6">
            <h2 className="text-xl font-semibold mb-6">Social Media Links</h2>

            <div className="space-y-4">
              <div>
                <label className="label mb-2" for="linkedin">
                  LinkedIn Profile
                </label>
                <div className="relative">
                  <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[hsl(var(--color-muted-foreground))]" />
                  <input
                    type="url"
                    id="linkedin"
                    className="input pl-10"
                    name="linkedin"
                    value={company?.socialLinks?.linkedin}
                    placeholder="https://linkedin.com/company/yourcompany"
                    onChange={handleSocialLinkChange}
                  />
                </div>
              </div>

              <div>
                <label className="label mb-2" for="twitter">
                  Twitter/X Profile
                </label>
                <div className="relative">
                  <Twitter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[hsl(var(--color-muted-foreground))]" />
                  <i data-lucide="twitter"></i>
                  <input
                    type="url"
                    id="twitter"
                    className="input pl-10"
                    name="twitter"
                    value={company?.socialLinks?.twitter}
                    placeholder="https://twitter.com/yourcompany"
                    onChange={handleSocialLinkChange}
                  />
                </div>
              </div>

              <div>
                <label className="label mb-2" for="facebook">
                  Facebook Page
                </label>
                <div className="relative">
                  <Facebook className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[hsl(var(--color-muted-foreground))]" />
                  <input
                    type="url"
                    id="facebook"
                    className="input pl-10"
                    name="facebook"
                    value={company?.socialLinks?.facebook}
                    placeholder="https://facebook.com/yourcompany"
                    onChange={handleSocialLinkChange}
                  />
                </div>
              </div>

              <div>
                <label className="label mb-2" for="instagram">
                  Instagram Profile
                </label>
                <div className="relative">
                  <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[hsl(var(--color-muted-foreground))]" />
                  <input
                    type="url"
                    id="instagram"
                    className="input pl-10"
                    name="instagram"
                    value={company?.socialLinks?.instagram || ""}
                    placeholder="https://instagram.com/yourcompany"
                    onChange={handleSocialLinkChange}
                  />
                </div>
              </div>

              <div>
                <label className="label mb-2" for="github">
                  GitHub Organization
                </label>
                <div className="relative">
                  <Github className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[hsl(var(--color-muted-foreground))]" />
                  <input
                    type="url"
                    id="github"
                    className="input pl-10"
                    name="github"
                    value={company?.socialLinks?.github || ""}
                    placeholder="https://github.com/yourcompany"
                    onChange={handleSocialLinkChange}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 pt-4">
            <div className="flex gap-2">
              <button className="btn btn-primary" onClick={handleCompanyEdit}>
                <Save className="h-4 w-4 mr-2" />
                {loading ? "Loading..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default CompanySetting;
