import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { sanityFetch } from "@/sanity/lib/live";
import { HERO_QUERY } from "@/sanity/lib/queries";
async function HeroSection() {
  const { data: profile } = await sanityFetch({ query: HERO_QUERY });
  console.log("Profile data:", profile);
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden"
    >
      <BackgroundRippleEffect rows={20} cols={50} cellSize={32} />
    </section>
  );
}
export default HeroSection;
