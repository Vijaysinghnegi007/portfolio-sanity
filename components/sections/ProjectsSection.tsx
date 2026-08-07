import type { PROJECTS_QUERY_RESULT } from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/live";
import { PROJECTS_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import TimeLine_01, {
  type TimeLine_01Entry,
} from "@/components/ui/release-time-line";

const CATEGORY_LABELS: Record<string, string> = {
  "web-app": "Web Application",
  "mobile-app": "Mobile App",
  "ai-ml": "AI/ML Project",
  "api-backend": "API/Backend",
  devops: "DevOps / Infrastructure",
  "open-source": "Open Source",
  "cli-tool": "CLI Tool",
  "desktop-app": "Desktop App",
  "browser-extension": "Browser Extension",
  game: "Game",
  other: "Project",
};

function isPlaceholderAsset(assetRef?: string) {
  return !assetRef || assetRef.startsWith("image-placeholder-");
}

function mapToTimelineEntries(raw: PROJECTS_QUERY_RESULT): TimeLine_01Entry[] {
  return raw.map((project) => {
    const icon = project.category ?? "other";
    const items = (project.technologies ?? [])
      .map((tech) => (tech?.name ? tech.name : null))
      .filter((name): name is string => Boolean(name));

    let image: string | undefined;
    if (
      project.coverImage &&
      !isPlaceholderAsset(project.coverImage.asset?._ref)
    ) {
      image = urlFor(project.coverImage)
        .width(1600)
        .height(900)
        .fit("crop")
        .url();
    }

    const button = project.liveUrl
      ? { url: project.liveUrl, text: "View Live" }
      : project.githubUrl
        ? { url: project.githubUrl, text: "View on GitHub" }
        : undefined;

    return {
      icon,
      title: project.title ?? "Untitled Project",
      subtitle: project.category
        ? (CATEGORY_LABELS[project.category] ?? project.category)
        : "Project",
      description: project.tagline ?? "",
      items: items.length > 0 ? items : undefined,
      image,
      button,
    };
  });
}

async function ProjectsSection() {
  const { data: projects } = await sanityFetch({ query: PROJECTS_QUERY });

  if (!projects || projects.length === 0) {
    return null;
  }

  const entries = mapToTimelineEntries(projects);

  return (
    <section id="projects" className="py-20 px-6">
      <TimeLine_01
        title="Projects"
        description="A selection of things I've designed and built — from web applications and APIs to tooling and experiments."
        entries={entries}
        className="py-0"
      />
    </section>
  );
}

export default ProjectsSection;
