import { defineQuery } from "next-sanity";

// Singleton profile query
export const HERO_QUERY = defineQuery(
  `*[_id == "singleton-profile"][0]{
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
}`,
);

export const ABOUT_QUERY = defineQuery(
  `*[_id == "singleton-profile"][0]{
  firstName,
  lastName,
  fullBio,
  yearsOfExperience,
  stats,
  email,
  phone,
  location
}`,
);

export const TESTIMONIALS_QUERY = defineQuery(
  `*[_type == "testimonial" && featured == true] | order(order asc){
  _id,
  name,
  position,
  company,
  testimonial,
  rating,
  date,
  avatar,
  companyLogo,
  linkedinUrl
}`,
);

export const SKILLS_QUERY = defineQuery(
  `*[_type == "skills"] | order(category asc, name asc){
  _id,
  name,
  category,
  proficiency,
  percentage,
  color
}`,
);

export const PROJECTS_QUERY = defineQuery(
  `*[_type == "projects"] | order(featured desc, order asc){
  _id,
  title,
  tagline,
  category,
  coverImage,
  technologies[]->{name, category},
  liveUrl,
  githubUrl,
  featured,
  order
}`,
);

export const EXPERIENCE_QUERY = defineQuery(
  `*[_type == "experience"] | order(startDate desc){
  company,
  position,
  employmentType,
  location,
  startDate,
  endDate,
  current,
  description,
  responsibilities,
  achievements,
  technologies[]->{name, category},
  companyLogo,
  companyWebsite
}`,
);
