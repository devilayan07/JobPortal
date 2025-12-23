import React from 'react'

function EditSocialLink({user,setUser}) {

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
          <h2 className="text-xl font-semibold mb-6">Social Profiles</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="linkedin" className="label block mb-2">
                <i data-lucide="linkedin" className="h-4 w-4 inline mr-1"></i>
                LinkedIn
              </label>
              <input
                type="url"
                id="linkedin"
                name="linkedinUrl"
                value={user?.linkedinUrl}
                className="input"
                placeholder="https://linkedin.com/in/username"
                onChange={(e)=>{handleChange(e)}}
              />
            </div>
            <div>
              <label htmlFor="github" className="label block mb-2">
                <i data-lucide="github" className="h-4 w-4 inline mr-1"></i>
                GitHub
              </label>
              <input
                type="url"
                id="github"
                name="githubUrl"
                className="input"
                placeholder="https://github.com/username"
                value={user?.githubUrl}
                onChange={(e)=>{handleChange(e)}}

              />
            </div>
            <div>
              <label htmlFor="portfolio" className="label block mb-2">
                <i data-lucide="globe" className="h-4 w-4 inline mr-1"></i>
                Portfolio Website
              </label>
              <input
                type="url"
                id="portfolio"
                name="portfolioUrl"
                className="input"
                placeholder="https://yourwebsite.com"
                value={user?.portfolioUrl}
                onChange={(e)=>{handleChange(e)}}

              />
            </div>
          </div>
        </div>  )
}

export default EditSocialLink
