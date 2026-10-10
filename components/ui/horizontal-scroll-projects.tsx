"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useCallback, useLayoutEffect, useRef, useState } from "react";

export type HorizontalProject = {
  title: string;
  description: string;
  category: string;
  image: string;
  year?: string;
  technologies?: string[];
  href?: string;
};

type HorizontalScrollProjectsProps = {
  projects: HorizontalProject[];
  heading?: string;
  eyebrow?: string;
  description?: string;
};

export function HorizontalScrollProjects({
  projects,
  heading = "Selected Works",
  eyebrow = "SELECTED WORK",
  description = "Digital experiences designed and built with purpose.",
}: HorizontalScrollProjectsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const prefersReducedMotion = useReducedMotion();

  const [layout, setLayout] = useState({
    distance: 0,
    viewportHeight: 0,
    desktop: false,
    ready: false,
  });

  const measure = useCallback(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;

    if (!viewport || !track) return;

    const desktop = window.matchMedia("(min-width: 768px)").matches;

    const viewportHeight = window.innerHeight;

    // Measure the track before applying its horizontal transform.
    const distance = desktop
      ? Math.max(0, track.scrollWidth - viewport.clientWidth)
      : 0;

    setLayout((previous) => {
      if (
        previous.distance === distance &&
        previous.viewportHeight === viewportHeight &&
        previous.desktop === desktop &&
        previous.ready
      ) {
        return previous;
      }

      return {
        distance,
        viewportHeight,
        desktop,
        ready: true,
      };
    });
  }, []);

  useLayoutEffect(() => {
    measure();

    const viewport = viewportRef.current;
    const track = trackRef.current;

    if (!viewport || !track) return;

    const observer = new ResizeObserver(measure);

    observer.observe(viewport);
    observer.observe(track);

    window.addEventListener("resize", measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure, projects]);

  const pinned =
    layout.ready &&
    layout.desktop &&
    layout.distance > 0 &&
    !prefersReducedMotion;

  // The extra vertical distance allows the complete track to move.
  const sectionHeight = pinned
    ? layout.viewportHeight + layout.distance
    : undefined;

  // Progress starts when the section reaches the top
  // and finishes when its bottom reaches the viewport bottom.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -layout.distance]);

  if (projects.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      aria-labelledby="horizontal-projects-heading"
      className="relative border-b border-border"
      style={sectionHeight ? { height: sectionHeight } : undefined}
    >
      <div
        ref={viewportRef}
        className={
          pinned
            ? "sticky top-0 flex h-svh flex-col justify-center overflow-hidden"
            : "flex flex-col justify-center overflow-hidden py-16 md:py-24"
        }
      >
        <header className="mx-auto mb-8 w-full max-w-[1600px] px-5 md:mb-12 md:px-10 lg:px-16">
          <p className="mb-4 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            <span className="size-1.5 rounded-full bg-primary" />
            {eyebrow}
          </p>

          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h2
                id="horizontal-projects-heading"
                className="text-4xl font-semibold tracking-[-0.05em] text-foreground sm:text-5xl md:text-7xl"
              >
                {heading}
                <span className="text-primary">.</span>
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground md:text-base">
                {description}
              </p>
            </div>

            <span className="font-mono text-xs text-muted-foreground">
              {String(projects.length).padStart(2, "0")} PROJECTS
            </span>
          </div>
        </header>

        <motion.div
          ref={trackRef}
          style={pinned ? { x } : undefined}
          className="flex w-max gap-5 px-5 md:gap-7 md:px-10 lg:px-16"
        >
          {projects.map((project, index) => {
            const content = (
              <>
                <div className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-border bg-muted">
                  <Image
                    src={project.image}
                    alt={`${project.title} project preview`}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 767px) 82vw, 58vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                  <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 text-[10px] font-medium uppercase tracking-wider text-white backdrop-blur-md">
                    {project.category}
                  </span>

                  {project.href && (
                    <span
                      aria-hidden="true"
                      className="absolute bottom-4 right-4 flex size-10 items-center justify-center rounded-full border border-white/30 bg-black/30 text-white backdrop-blur-md transition-colors group-hover:bg-white group-hover:text-black"
                    >
                      <svg viewBox="0 0 24 24" fill="none" className="size-4">
                        <path
                          d="M7 17 17 7M8 7h9v9"
                          stroke="currentColor"
                          strokeWidth="1.7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  )}
                </div>

                <div className="mt-5 flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="text-xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary md:text-2xl">
                      {project.title}
                    </h3>

                    <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                      {project.description}
                    </p>
                  </div>

                  {project.year && (
                    <span className="shrink-0 pt-1 font-mono text-xs text-muted-foreground">
                      {project.year}
                    </span>
                  )}
                </div>

                {project.technologies?.length ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.technologies.map((technology) => (
                      <span
                        key={technology}
                        className="rounded-md border border-border px-2.5 py-1 text-[11px] text-muted-foreground"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>
                ) : null}
              </>
            );

            return (
              <article
                key={`${project.title}-${index}`}
                className="w-[82vw] max-w-[560px] shrink-0 md:w-[58vw] md:max-w-[760px]"
              >
                {project.href ? (
                  <Link
                    href={project.href}
                    aria-label={`View ${project.title} project`}
                    className="group block rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                  >
                    {content}
                  </Link>
                ) : (
                  <div className="group">{content}</div>
                )}
              </article>
            );
          })}
        </motion.div>

        <footer className="mx-auto mt-7 flex w-full max-w-[1600px] items-center justify-between px-5 md:mt-9 md:px-10 lg:px-16">
          <span className="text-xs text-muted-foreground">
            {pinned ? "SCROLL TO EXPLORE" : "SELECTED PROJECTS"}
          </span>

          <span className="font-mono text-xs text-muted-foreground">
            {String(projects.length).padStart(2, "0")} / WORKS
          </span>
        </footer>
      </div>
    </section>
  );
}
