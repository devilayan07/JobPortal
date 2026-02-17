import React from "react";
import { Linkedin } from "lucide-react";
import { Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import { Facebook } from "lucide-react";
import { Instagram } from "lucide-react";
import { Github } from "lucide-react";
function CompanySocialMedia({socialLinks}) {
  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
      <div className="space-y-2">
        <Link
          to={socialLinks?.linkedin}
          className="flex items-center gap-3 p-2 rounded-md hover:bg-[hsl(var(--color-accent))] transition-colors"
        >
            <Linkedin/>
          <span className="text-sm font-medium">LinkedIn</span>
        </Link>
        <Link
          to={socialLinks?.twitter}
          className="flex items-center gap-3 p-2 rounded-md hover:bg-[hsl(var(--color-accent))] transition-colors"
        >
            <Twitter className="h-5 w-5 text-[hsl(var(--color-muted-foreground))]"/>
          <span className="text-sm font-medium">Twitter</span>
        </Link>
        <a
          href="#"
          className="flex items-center gap-3 p-2 rounded-md hover:bg-[hsl(var(--color-accent))] transition-colors"
        >
            <Facebook             className="h-5 w-5 text-[hsl(var(--color-muted-foreground))]"
 />
          <span className="text-sm font-medium">Facebook</span>
        </a>
        <a
          href="#"
          className="flex items-center gap-3 p-2 rounded-md hover:bg-[hsl(var(--color-accent))] transition-colors"
        >
            <Instagram             className="h-5 w-5 text-[hsl(var(--color-muted-foreground))]"/>
          <span className="text-sm font-medium">Instagram</span>
        </a>
        <a
          href="#"
          className="flex items-center gap-3 p-2 rounded-md hover:bg-[hsl(var(--color-accent))] transition-colors"
        >
            <Github             className="h-5 w-5 text-[hsl(var(--color-muted-foreground))]" />
          <span className="text-sm font-medium">GitHub</span>
        </a>
      </div>
    </div>
  );
}

export default CompanySocialMedia;
