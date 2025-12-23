import React from "react";
import { Link } from "react-router-dom";
import { LinkedinIcon } from "lucide-react";
import { Github } from "lucide-react";
import { Globe } from "lucide-react";

function UserSocialLink({githubUrl,linkedinUrl,portfolioUrl}) {
  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold mb-4">Social Profiles</h3>
      <div className="space-y-2">
        <Link
          to={linkedinUrl}
          className="flex items-center gap-3 p-2 rounded-md hover:bg-[hsl(var(--color-accent))] transition-colors"
        >
          <LinkedinIcon             className="h-5 w-5 text-[hsl(var(--color-muted-foreground))]"
/>
          <span className="text-sm font-medium">LinkedIn</span>
        </Link>
        <Link
          to={githubUrl}
          className="flex items-center gap-3 p-2 rounded-md hover:bg-[hsl(var(--color-accent))] transition-colors"
        >
          <Github             className="h-5 w-5 text-[hsl(var(--color-muted-foreground))]"
/>
          <span className="text-sm font-medium">GitHub</span>
        </Link>
        <Link
          to={portfolioUrl}
          className="flex items-center gap-3 p-2 rounded-md hover:bg-[hsl(var(--color-accent))] transition-colors"
        >
          <Globe              className="h-5 w-5 text-[hsl(var(--color-muted-foreground))]"
/>
          <span className="text-sm font-medium">Portfolio</span>
        </Link>
      </div>
    </div>
  );
}

export default UserSocialLink;
