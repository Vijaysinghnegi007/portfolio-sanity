"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight } from "lucide-react";

export interface SkillItem {
  name: string;
  percentage?: number;
  color?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  skills: SkillItem[];
}

export function SkillsAccordion({
  categories,
}: {
  categories: SkillCategory[];
}) {
  const [activeId, setActiveId] = useState<string | null>(
    categories[0]?.id ?? null,
  );

  const toggleAccordion = (id: string) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <div className="flex flex-col border-t border-border mt-8">
      {categories.map((category) => {
        const isOpen = activeId === category.id;

        return (
          <div
            key={category.id}
            className="border-b border-border w-full focus-within:ring-1 focus-within:ring-primary focus-within:ring-inset"
          >
            {/* Trigger Button Row */}
            <button
              onClick={() => toggleAccordion(category.id)}
              className="w-full flex justify-between items-center py-6 sm:py-8 text-left px-2 group transition-all"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-6 sm:gap-12 md:gap-20">
                {/* Big Numbers */}
                <span className="font-sans text-[42px] sm:text-[64px] md:text-[80px] font-black leading-none text-muted-foreground/25 group-hover:text-primary/30 transition-all duration-300 select-none">
                  {category.id}
                </span>
                {/* Title */}
                <span className="font-sans text-lg sm:text-2xl md:text-3xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                  {category.title}
                </span>
              </div>

              {/* Indicator Arrow */}
              <div
                className={`p-2 sm:p-3 rounded-full border border-border group-hover:bg-foreground group-hover:border-foreground group-hover:text-background text-muted-foreground transition-all duration-300 ${isOpen ? "rotate-45" : ""}`}
              >
                <ArrowUpRight
                  className={`w-5 h-5 transition-transform duration-300 ${isOpen ? "" : "group-hover:translate-x-0.5 group-hover:-translate-y-0.5"}`}
                />
              </div>
            </button>

            {/* Expanded Details Section */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-8 sm:pb-12 pl-14 sm:pl-30 md:pl-45 pr-4 sm:pr-8 grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                    {/* Description */}
                    <div className="max-w-md">
                      <p className="text-sm sm:text-base font-light text-muted-foreground leading-relaxed">
                        {category.description}
                      </p>
                    </div>

                    {/* Skill List */}
                    <div className="flex flex-col gap-3">
                      <span className="text-[10px] font-mono tracking-widest text-muted-foreground uppercase">
                        {"// CORE TOOLKIT"}
                      </span>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                        {category.skills.map((skill, i) => (
                          <li
                            key={i}
                            className="flex items-center justify-between gap-2.5 text-xs text-foreground py-1.5 border-b border-border/60"
                          >
                            <span className="flex items-center gap-2.5 min-w-0">
                              <span
                                className="w-2 h-2 rounded-full shrink-0"
                                style={{
                                  backgroundColor:
                                    skill.color || "var(--primary)",
                                }}
                              />
                              <span className="font-light truncate">
                                {skill.name}
                              </span>
                            </span>
                            {skill.percentage != null && (
                              <span className="font-mono text-[10px] text-muted-foreground shrink-0">
                                {skill.percentage}%
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
