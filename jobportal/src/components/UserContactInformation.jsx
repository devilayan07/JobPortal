import React from "react";
import { Mail } from "lucide-react";
import { Phone } from "lucide-react";
import { MapPin } from "lucide-react";
import { Linkedin } from "lucide-react";

function UserContactInformation({phone,email,location,linkdinUrl}) {
  return (
    <div className="card p-6">
      <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-lg bg-[hsl(var(--color-secondary))] flex items-center justify-center shrink-0">
            <Mail className="h-5 w-5 text-[hsl(var(--color-primary))]" />
          </div>
          <div>
            <p className="text-sm text-[hsl(var(--color-muted-foreground))]">
              Email
            </p>
            <p className="font-medium">{email}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-lg bg-[hsl(var(--color-secondary))] flex items-center justify-center shrink-0">
            <Phone className="h-5 w-5 text-[hsl(var(--color-primary))]" />
          </div>
          <div>
            <p className="text-sm text-[hsl(var(--color-muted-foreground))]">
              Phone
            </p>
            <p className="font-medium">{phone}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-lg bg-[hsl(var(--color-secondary))] flex items-center justify-center shrink-0">
            <MapPin className="h-5 w-5 text-[hsl(var(--color-primary))]" />
            <i data-lucide="map-pin"></i>
          </div>
          <div>
            <p className="text-sm text-[hsl(var(--color-muted-foreground))]">
              Location
            </p>
            <p className="font-medium">{location}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-lg bg-[hsl(var(--color-secondary))] flex items-center justify-center shrink-0">
            <Linkedin className="h-5 w-5 text-[hsl(var(--color-primary))]" />
          </div>
          <div>
            <p className="text-sm text-[hsl(var(--color-muted-foreground))]">
              LinkedIn
            </p>
            <a
              href="#"
              className="font-medium text-[hsl(var(--color-primary))] hover:underline"
            >
                {linkdinUrl}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserContactInformation;
