import { sanityFetch } from "@/sanity/lib/live";
import { TESTIMONIALS_QUERY } from "@/sanity/lib/queries";
async function TestimonialsSection() {
  const { data: testimonials } = await sanityFetch({
    query: TESTIMONIALS_QUERY,
  });
  console.log("testimonials", testimonials);
  return <div>TestimonialsSection</div>;
}

export default TestimonialsSection;
