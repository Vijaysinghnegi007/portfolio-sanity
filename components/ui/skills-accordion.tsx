"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight } from "lucide-react";

export interface Skill {
  name: string;
  percentage?: number;
  color?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  skills: Skill[];
}

interface SkillsAccordionProps {
  categories: SkillCategory[];
}

export function SkillsAccordion({ categories }: SkillsAccordionProps) {
  return (
    <Accordion className="w-full">
      {categories.map((category) => (
        <AccordionItem
          key={category.id}
          value={category.id}
          className="
            border-b
            border-border
            data-[state=open]:border
            data-[state=open]:border-border
          "
        >
          {/* =========================
              ACCORDION HEADER
          ========================== */}
          <AccordionTrigger
            showIcon={false}
            className="
              group
              px-2
              py-7
              hover:no-underline
              sm:py-9
              md:px-3
              md:py-10
            "
          >
            <div className="flex w-full items-center justify-between gap-6">
              {/* Number + Title */}
              <div className="flex min-w-0 items-center gap-8 sm:gap-12 md:gap-20">
                {/* Number */}
                <span
                  className="
                    shrink-0
                    font-sans
                    text-[52px]
                    font-black
                    leading-none
                    tracking-tight
                    text-muted-foreground/25
                    transition-colors
                    duration-300
                    group-hover:text-muted-foreground/40
                    sm:text-[68px]
                    md:text-[80px]
                  "
                >
                  {category.id}
                </span>
                {/* Title */}
                <span
                  className="
                    truncate
                    font-sans
                    text-xl
                    font-bold
                    tracking-tight
                    text-foreground
                    transition-colors
                    duration-300
                    group-hover:text-primary
                    sm:text-2xl
                    md:text-3xl
                  "
                >
                  {category.title}
                </span>
              </div>

              {/* Arrow */}
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-300 group-hover:border-foreground group-hover:bg-foreground group-hover:text-background group-data-[state=open]:rotate-90 sm:h-14 sm:w-14">
                <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6" />
              </span>
            </div>
          </AccordionTrigger>

          {/* =========================
              ACCORDION CONTENT
          ========================== */}
          <AccordionContent>
            <div className=" grid grid-cols-1 gap-10 px-4 pb-10 pt-2 sm:px-12 sm:pb-12 md:grid-cols-2 md:gap-16 md:pl-48 md:pr-12">
              {/* =========================
                  DESCRIPTION
              ========================== */}
              <div className="max-w-lg">
                <p className="text-sm leading-7 text-muted-foreground sm:text-base">
                  {category.description}
                </p>
              </div>

              {/* =========================
                  SKILLS
              ========================== */}
              <div>
                <p className=" mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  // CORE TOOLKIT
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2">
                  {(category.skills ?? []).map((skill) => (
                    <div
                      key={skill.name}
                      className="flex items-center justify-between gap-4 border-b border-border/60 py-3 pr-4"
                    >
                      {/* Skill name */}
                      <div className="flex min-w-0 items-center gap-3">
                        <span
                          className="h-2 w-2 shrink-0 rounded-full"
                          style={{
                            backgroundColor: skill.color || "var(--primary)",
                          }}
                        />

                        <span className="truncate text-xs text-foreground sm:text-sm">
                          {skill.name}
                        </span>
                      </div>

                      {/* Percentage */}
                      {skill.percentage !== undefined && (
                        <span
                          className="
                            shrink-0
                            font-mono
                            text-[10px]
                            text-muted-foreground
                          "
                        >
                          {skill.percentage}%
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
