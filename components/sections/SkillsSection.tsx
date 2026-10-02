import type { SKILLS_QUERY_RESULT } from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/live";
import { SKILLS_QUERY } from "@/sanity/lib/queries";
import {
  SkillsAccordion,
  type SkillCategory,
} from "@/components/ui/skills-accordion";

const CATEGORY_META: Record<string, { label: string; description: string }> = {
  frontend: {
    label: "Frontend",
    description:
      "Building responsive, accessible, and performant interfaces with modern frameworks like React and Next.js, grounded in clean semantics and a mobile-first mindset.",
  },
  database: {
    label: "Database",
    description:
      "Modeling and querying structured data to keep applications fast, consistent, and easy to maintain over time.",
  },
  design: {
    label: "Design",
    description:
      "Turning ideas into polished, intuitive interfaces through UI design, design systems, and consistent visual language.",
  },
  tools: {
    label: "Tools",
    description:
      "Leveraging the right tools to streamline workflows, version control, debugging, and everyday development tasks.",
  },
  "soft-skills": {
    label: "Soft Skills",
    description:
      "Communicating clearly, collaborating effectively, and solving problems — the human side of shipping great products.",
  },
};

async function SkillsSection() {
  const { data: skills } = await sanityFetch({
    query: SKILLS_QUERY,
  });

  if (!skills || skills.length === 0) {
    return null;
  }

  const grouped = new Map<string, SKILLS_QUERY_RESULT>();
  for (const skill of skills) {
    const category = skill.category ?? "other";
    const bucket = grouped.get(category) ?? [];
    bucket.push(skill);
    grouped.set(category, bucket);
  }

  const categories: SkillCategory[] = Array.from(grouped.entries()).map(
    ([category, items], index) => {
      const meta = CATEGORY_META[category] ?? CATEGORY_META["other"];

      return {
        id: String(index + 1).padStart(2, "0"),
        title: meta.label,
        description: meta.description,
        skills: items.map((skill) => ({
          name: skill.name ?? "",
          percentage: skill.percentage ?? undefined,
          color: skill.color ?? undefined,
        })),
      };
    },
  );

  return (
    <section
      id="skills"
      className="bg-background py-20 flex flex-col items-center"
    >
      <div className="max-w-7xl w-full mx-auto px-6 md:px-12 lg:px-20 @container">
        {/* Intro Grid Title */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start mb-16 md:mb-24">
          <div className="md:col-span-8 flex flex-col items-start text-left">
            <span className="text-[10px] font-mono tracking-widest text-muted-foreground uppercase mb-4 block">
              {"// TECHNICAL SKILLS & TOOLKIT"}
            </span>
            <h2 className="font-sans text-4xl md:text-5xl font-bold  leading-[1.1] tracking-tight uppercase select-none">
              <span className="text-primary">SKILLS &amp; TOOLS</span>{" "}
              <span className="text-foreground">
                TO BUILD, DESIGN, AND SHIP GREAT PRODUCTS
              </span>
            </h2>
          </div>

          <div className="md:col-span-4 flex flex-col justify-end text-left pt-2 md:pt-14 font-sans">
            <p className="text-sm font-light text-muted-foreground leading-relaxed max-w-sm">
              A curated set of technologies and practices I use every day — from
              frontend frameworks and CMS tooling to databases, version control,
              and the soft skills that keep collaboration smooth.
            </p>
          </div>
        </div>

        {/* Skills Accordion Rows */}
        <SkillsAccordion categories={categories} />
      </div>
    </section>
  );
}

export default SkillsSection;
