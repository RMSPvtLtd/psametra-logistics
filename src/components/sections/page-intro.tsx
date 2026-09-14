import { SectionLabel } from "@/components/ui";
export function PageIntro({
  label,
  title,
  accent,
  description,
}: {
  label: string;
  title: string;
  accent: string;
  description: string;
}) {
  return (
    <section className="page-intro container">
      <SectionLabel>{label}</SectionLabel>
      <h1>
        {title}
        <br />
        <span>{accent}</span>
      </h1>
      <p>{description}</p>
    </section>
  );
}
