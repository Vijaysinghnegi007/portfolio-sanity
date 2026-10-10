import {
  HorizontalScrollProjects,
  type HorizontalProject,
} from "@/components/ui/horizontal-scroll-projects";

const projects: HorizontalProject[] = [
  {
    title: "Portfolio Website",
    description:
      "A modern portfolio focused on strong typography, motion, and responsive design.",
    category: "Web Design",
    year: "2026",
    image: "/project-placeholder.png",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    href: "/projects/portfolio",
  },
  {
    title: "Agency Website",
    description:
      "A digital experience for presenting agency services, projects, and brand identity.",
    category: "Development",
    year: "2026",
    image: "/project-placeholder.png",
    technologies: ["React", "Motion", "CSS"],
    href: "/projects/agency",
  },
  {
    title: "Dashboard UI",
    description:
      "A clean dashboard interface built around usability, accessible components, and clear data presentation.",
    category: "UI/UX",
    year: "2026",
    image: "/project-placeholder.png",
    technologies: ["Next.js", "TypeScript", "shadcn/ui"],
    href: "/projects/dashboard",
  },
];

export default function ProjectsPage() {
  return (
    <main>
      <HorizontalScrollProjects projects={projects} />
    </main>
  );
}
