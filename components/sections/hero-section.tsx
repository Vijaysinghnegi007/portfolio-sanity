import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";

const HERO_QUERY = defineQuery(`
  *[_type == "profile"][0]{
    firstName,
    lastName,
    headline,
    headlineStaticText,
    headlineAnimatedWords,
    headlineAnimationDuration,
    shortBio,
    email,
    phone,
    location,
    availability,
    socialLinks,
    yearsOfExperience,
    profileImage
  }
`);

async function HeroSection() {
  console.log("HeroSection rendered");
  const { data: profile } = await sanityFetch({ query: HERO_QUERY });
  console.log("Profile data:", profile);
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden"
    ></section>
  );
}

export default HeroSection;
