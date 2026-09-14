export interface ProjectBrief {
  name: string;
  email: string;
  company: string;
  service: string;
  details: string;
}

/** HTML required/minLength allow whitespace; validate the meaningful input too. */
export function briefFieldError(field: string, value: string): string {
  if (field === "name" && !value.trim()) return "Please enter your name.";
  if (field === "details" && value.trim().length < 20)
    return "Please describe your project in at least 20 characters, excluding surrounding spaces.";
  return "";
}

export function projectEmailUrl(email: string, brief: ProjectBrief): string {
  return `mailto:${email}?subject=${encodeURIComponent("A new project conversation")}&body=${encodeURIComponent(formatProjectBrief(brief))}`;
}

/** Produces plain text suitable for both a local download and a draft in the visitor’s email client. */
export function formatProjectBrief(brief: ProjectBrief): string {
  return `PSAMETRA — PROJECT BRIEF\n\nName: ${brief.name.trim()}\nEmail: ${brief.email.trim()}\nCompany: ${brief.company.trim() || "Not specified"}\nArea: ${brief.service}\n\n${brief.details.trim()}`;
}
