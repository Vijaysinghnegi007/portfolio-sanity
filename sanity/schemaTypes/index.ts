import { type SchemaTypeDefinition } from "sanity";
import achievements from "./achievements";
import blog from "./blog";
import certification from "./certification";
import contact from "./contact";
import education from "./education";
import experience from "./experience";
import navigation from "./navigation";
import profile from "./profile";
import projects from "./projects";
import services from "./services";
import siteSetting from "./siteSetting";
import skills from "./skills";
import testimonial from "./testimonial";
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    profile,
    projects,
    skills,
    experience,
    education,
    testimonial,
    certification,
    achievements,
    blog,
    services,
    contact,
    siteSetting,
    navigation,
  ],
};
