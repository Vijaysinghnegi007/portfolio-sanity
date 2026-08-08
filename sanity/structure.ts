import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Portfolio Content")
    .items([
      // Profile (Singleton)
      S.listItem()
        .title("Profile")
        .child(
          S.document().schemaType("profile").documentId("singleton-profile"),
        ),

      S.divider(),

      // Portfolio Section
      S.listItem()
        .title("Portfolio")
        .child(
          S.list()
            .title("Portfolio Content")
            .items([
              S.listItem()
                .title("Projects")
                .schemaType("projects")
                .child(S.documentTypeList("projects").title("Projects")),

              S.listItem()
                .title("Skills")
                .schemaType("skills")
                .child(S.documentTypeList("skills").title("Skills")),

              S.listItem()
                .title("Services")
                .schemaType("services")
                .child(S.documentTypeList("services").title("Services")),
            ]),
        ),

      S.divider(),

      // Professional Background
      S.listItem()
        .title("Professional Background")
        .child(
          S.list()
            .title("Professional Background")
            .items([
              S.listItem()
                .title("Work Experience")
                .schemaType("experience")
                .child(
                  S.documentTypeList("experience").title("Work Experience"),
                ),

              S.listItem()
                .title("Education")
                .schemaType("education")
                .child(S.documentTypeList("education").title("Education")),

              S.listItem()
                .title("Certifications")
                .schemaType("certification")
                .child(
                  S.documentTypeList("certification").title("Certifications"),
                ),

              S.listItem()
                .title("Achievements & Awards")
                .schemaType("achievements")
                .child(
                  S.documentTypeList("achievements").title(
                    "Achievements & Awards",
                  ),
                ),
            ]),
        ),

      S.divider(),

      // Content & Community
      S.listItem()
        .title("Content & Community")
        .child(
          S.list()
            .title("Content & Community")
            .items([
              S.listItem()
                .title("Blog Posts")
                .schemaType("blog")
                .child(S.documentTypeList("blog").title("Blog Posts")),

              S.listItem()
                .title("Testimonials")
                .schemaType("testimonial")
                .child(S.documentTypeList("testimonial").title("Testimonials")),
            ]),
        ),

      S.divider(),

      // Contact Form Submissions
      S.listItem()
        .title("Contact Form Submissions")
        .child(
          S.list()
            .title("Contact Form Submissions")
            .items([
              S.listItem()
                .title("New Submissions")
                .child(
                  S.documentTypeList("contact")
                    .title("New Submissions")
                    .apiVersion("v2026-08-03")
                    .filter('_type == "contact" && status == "new"'),
                ),

              S.listItem()
                .title("Archived")
                .child(
                  S.documentTypeList("contact")
                    .title("Archived Submissions")
                    .apiVersion("v2026-08-03")
                    .filter('_type == "contact" && status == "archived"'),
                ),
            ]),
        ),

      S.divider(),

      // Navigation
      S.listItem()
        .title("Navigation Links")
        .schemaType("navigation")
        .child(S.documentTypeList("navigation").title("Navigation Links")),

      S.divider(),

      // Site Settings (Singleton)
      S.listItem()
        .title("Site Settings")
        .child(
          S.document()
            .schemaType("siteSetting")
            .documentId("singleton-siteSettings"),
        ),
    ]);
