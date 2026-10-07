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

  other: {
    label: "Other",
    description:
      "Additional technologies and skills that support the development workflow.",
  },
};

async function SkillsSection() {
  const { data: skills } = await sanityFetch({
    query: SKILLS_QUERY,
  });

  if (!skills || skills.length === 0) {
    return null;
  }

  /*
   * Sanity Live can return StegaString values.
   * We only keep the fields required by SkillsAccordion,
   * so there is no need to pass the complete Sanity object around.
   */
  const grouped = new Map<
    string,
    Array<{
      name: string;
      percentage: number | undefined;
      color: string | undefined;
    }>
  >();

  for (const skill of skills) {
    const category = String(skill.category ?? "other");

    const bucket = grouped.get(category) ?? [];

    bucket.push({
      name: skill.name ? String(skill.name) : "",
      percentage: skill.percentage ?? undefined,
      color: skill.color ? String(skill.color) : undefined,
    });

    grouped.set(category, bucket);
  }

  const categories: SkillCategory[] = Array.from(grouped.entries()).map(
    ([category, items], index) => {
      const meta = CATEGORY_META[category] ?? CATEGORY_META.other;

      return {
        id: String(index + 1).padStart(2, "0"),
        title: meta.label,
        description: meta.description,
        skills: items,
      };
    },
  );

  return (
    <section
      id="skills"
      className="flex flex-col items-center bg-background py-20"
    >
      <div className="mx-auto w-full max-w-7xl px-6 md:px-12 lg:px-20 @container">
        {/* Intro Grid Title */}
        <div className="mb-16 grid grid-cols-1 items-start gap-8 md:mb-24 md:grid-cols-12 md:gap-12">
          <div className="flex flex-col items-start text-left md:col-span-8">
            <span className="mb-4 block font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
              {"// TECHNICAL SKILLS & TOOLKIT"}
            </span>

            <h2 className="font-sans text-4xl leading-[1.1] font-bold tracking-tight uppercase select-none md:text-5xl">
              <span className="text-primary">SKILLS &amp; TOOLS</span>{" "}
              <span className="text-foreground">
                TO BUILD, DESIGN, AND SHIP GREAT PRODUCTS
              </span>
            </h2>
          </div>

          <div className="flex flex-col justify-end pt-2 text-left font-sans md:col-span-4 md:pt-14">
            <p className="max-w-sm text-sm leading-relaxed font-light text-muted-foreground">
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
