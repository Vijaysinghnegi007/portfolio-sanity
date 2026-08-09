import React from "react";
import { sanityFetch } from "@/sanity/lib/live";
import { TESTIMONIALS_QUERY } from "@/sanity/lib/queries";
async function ProjectsSection() {
  const { data: projects } = await sanityFetch({
    query: TESTIMONIALS_QUERY,
  });
  console.log("projects", projects);
  return <section className="py-20 px-6">ProjectsSection</section>;
}

export default ProjectsSection;
