"use client";
import { motion, useReducedMotion, useScroll, useTransform } from "motion";
import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";

interface FeatureRevealTriggerRange {
  start?: string;
  end?: string;
}

interface FeatureRevealTriggers {
  no?: FeatureRevealTriggerRange;
  title?: FeatureRevealTriggerRange;
  content?: FeatureRevealTriggerRange;
  img?: FeatureRevealTriggerRange;
}

interface FeatureRevealProperty {
  image?: string;
  imgClass?: string;
  no?: string | number;
  number?: string | number;
  titleClass?: string;
  title?: string;
  contentClass?: string;
  paragraphs?: string[];
  triggers?: FeatureRevealTriggers;
}

const IMAGES = [
  "https://images.unsplash.com/photo-1496307653780-42ee777d4833?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?q=80&w=1635&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1451976426598-a7593bd6d0b2?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1473864803180-ca1b3d93c9a0?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const defaultPropertiesData: FeatureRevealProperty[] = [
  {
    number: "01",
    no: "1",
    imgClass: "img-1",
    titleClass: "property-title-1",
    contentClass: "property-content-1",
    title: "Northpoint Tower",
    image: IMAGES[0],
    paragraphs: [
      "A landmark address where architecture and skyline views meet, built for a lifestyle defined by scale and presence.",
      "Ultra-premium residences sit above street-level retail and dining, a location that trades on prestige and long-term value.",
    ],
    triggers: {
      img: { start: "-10% top", end: "10% top" },
      no: { start: "-1% top", end: "5% top" },
      title: { start: "-1% top", end: "5% top" },
      content: { start: "-1% top", end: "5% top" },
    },
  },
  {
    number: "02",
    no: "2",
    imgClass: "img-2",
    titleClass: "property-title-2",
    contentClass: "property-content-2",
    title: "Harbour Line",
    image: IMAGES[1],
    paragraphs: [
      "A waterfront destination of private beachfront homes and a resort-grade environment, framed by open coastal views.",
      "Equally suited to end-use or investment, it pairs luxury and privacy with broad international appeal.",
    ],
    triggers: {
      img: { start: "-5% top", end: "35% top" },
      no: { start: "18% top", end: "23% top" },
      title: { start: "18% top", end: "23% top" },
      content: { start: "18% top", end: "23% top" },
    },
  },
  {
    number: "03",
    no: "3",
    imgClass: "img-3",
    titleClass: "property-title-3",
    contentClass: "property-content-3",
    title: "Meridian Quarter",
    image: IMAGES[2],
    paragraphs: [
      "A dynamic urban waterfront that blends high-rise living with retail, dining and leisure in one connected district.",
      "Strong rental demand and consistent desirability make it a compelling option for investors and residents alike.",
    ],
    triggers: {
      img: { start: "25% top", end: "65% top" },
      no: { start: "45% top", end: "50% top" },
      title: { start: "45% top", end: "50% top" },
      content: { start: "45% top", end: "50% top" },
    },
  },
  {
    number: "04",
    no: "4",
    imgClass: "img-4",
    titleClass: "property-title-4",
    contentClass: "property-content-4",
    title: "Skyframe District",
    image: IMAGES[3],
    paragraphs: [
      "A future-ready residential destination with a strong focus on design, accessibility and long-term growth.",
      "A master-planned ecosystem positioned as a next-generation address for buyers seeking lifestyle and appreciation.",
    ],
    triggers: {
      img: { start: "45% top", end: "85% top" },
      no: { start: "65% top", end: "70% top" },
      title: { start: "65% top", end: "70% top" },
      content: { start: "65% top", end: "70% top" },
    },
  },
];

const parsePercentTop = (value: string | undefined): number | null => {
  if (!value) return null;
  const match = value.trim().match(/^(-?\d+(?:\.\d+)?)%\s+top$/i);
  if (match) {
    const pct = parseFloat(match[1]);
    if (!Number.isNaN(pct)) {
      return Math.max(-50, Math.min(150, pct));
    }
  }
  return null;
};

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

const splitChars = (text: string): string[] => {
  if (!text) return [];
  return Array.from(text);
};

const splitLines = (text: string): string[] => {
  if (!text) return [];
  const normalized = text.replace(/\r\n/g, "\n");
  return normalized
    .split("\n")
    .filter((line) => line.length > 0 || normalized.includes("\n"));
};

const LineMask = ({ lines }: { lines: string[] }) => (
  <span className="block leading-[1.2]">
    {lines.map((line, i) => (
      <span key={i} className="block overflow-hidden leading-[inherit]">
        <span className="block leading-[inherit] will-change-transform">
          {line}
        </span>
      </span>
    ))}
  </span>
);

const CharMask = ({ chars }: { chars: string[] }) => (
  <span className="block leading-[1.2]">
    {chars.map((char, i) => (
      <span key={i} className="inline-block overflow-hidden leading-[inherit]">
        <span className="inline-block leading-[inherit] will-change-transform">
          {char === " " ? "\u00A0" : char}
        </span>
      </span>
    ))}
  </span>
);

interface RevealCharsProps {
  text: string | number;
  className?: string;
  inView: boolean;
  reduce: boolean;
  delay?: number;
  duration?: number;
  y?: number;
  rotate?: number;
  stagger?: number;
}

const RevealChars = ({
  text,
  className,
  inView,
  reduce,
  delay = 0,
  duration = 0.7,
  y = 150,
  rotate = 10,
  stagger = 0.08,
}: RevealCharsProps) => {
  const chars = useMemo(() => splitChars(String(text)), [text]);
  const initial = reduce
    ? { y: 0, rotate: 0, opacity: 1 }
    : { y, rotate, opacity: 0 };
  const animate = reduce
    ? { y: 0, rotate: 0, opacity: 1 }
    : { y: 0, rotate: 0, opacity: 1 };

  return (
    <motion.span
      className={className}
      initial={initial}
      animate={inView ? animate : initial}
      transition={{
        duration: reduce ? 0.001 : duration,
        delay: reduce ? 0 : delay,
        ease: [0.16, 1, 0.3, 1] as const,
        staggerChildren: reduce ? 0 : stagger,
      }}
    >
      <CharMask chars={chars} />
    </motion.span>
  );
};

interface RevealLinesProps {
  text: string;
  className?: string;
  inView: boolean;
  reduce: boolean;
  delay?: number;
  duration?: number;
  yPercent?: number;
  stagger?: number;
}

const RevealLines = ({
  text,
  className,
  inView,
  reduce,
  delay = 0,
  duration = 0.7,
  yPercent = 100,
  stagger = 0.08,
}: RevealLinesProps) => {
  const lines = useMemo(() => splitLines(text), [text]);
  const initial = reduce
    ? { yPercent: 0, opacity: 1 }
    : { yPercent, opacity: 0 };
  const animate = reduce
    ? { yPercent: 0, opacity: 1 }
    : { yPercent: 0, opacity: 1 };

  return (
    <motion.span
      className={className}
      initial={initial}
      animate={inView ? animate : initial}
      transition={{
        duration: reduce ? 0.001 : duration,
        delay: reduce ? 0 : delay,
        ease: [0.16, 1, 0.3, 1] as const,
        staggerChildren: reduce ? 0 : stagger,
      }}
    >
      <LineMask lines={lines} />
    </motion.span>
  );
};

interface HeadCharsProps {
  text: string;
  className?: string;
  progress: number;
  reduce: boolean;
}

const HeadChars = ({ text, className, progress, reduce }: HeadCharsProps) => {
  const chars = useMemo(() => splitChars(text), [text]);
  const t = clamp(progress, 0, 1);

  return (
    <span className={className}>
      {chars.map((char, i) => {
        const seed = (i * 131542391 + 1000000009) % 2000000;
        const r1 = ((seed % 1000) / 1000 - 0.5) * 2;
        const r2 = (((seed * 123) % 1000) / 1000 - 0.5) * 2;
        const yStart = (r1 < 0 ? -1 : 1) * (200 * Math.abs(r1));
        const xStart = 200 * r2;
        const y = reduce ? 0 : yStart * (1 - t);
        const x = reduce ? 0 : xStart * (1 - t);
        const opacity = reduce ? 1 : t;

        return (
          <motion.span
            key={i}
            className="inline-block will-change-transform"
            style={{ y, x, opacity }}
            transition={{ type: "tween", duration: 0.001 }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        );
      })}
    </span>
  );
};

interface ImageParallaxProps {
  src?: string;
  alt: string;
  className?: string;
  style?: CSSProperties & Record<`--${string}`, string | number>;
  scrollProgress: number;
  startPct: number | null;
  endPct: number | null;
  parallaxRange: number;
  reduce: boolean;
  priority?: boolean;
}

const ImageParallax = ({
  src,
  alt,
  className,
  style,
  scrollProgress,
  startPct,
  endPct,
  parallaxRange,
  reduce,
  priority = false,
}: ImageParallaxProps) => {
  const s = startPct ?? 0;
  const e = endPct ?? 20;
  const range = Math.abs(e - s) < 1e-6 ? 1 : e - s;
  const p = clamp((scrollProgress - s / 100) / (range / 100), 0, 1);
  const tx = reduce ? 0 : -parallaxRange + p * parallaxRange;

  return (
    <motion.img
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={className}
      style={{ ...style, x: `${tx}%`, opacity: reduce ? 1 : 1 }}
      transition={{ type: "tween", duration: 0.001 }}
    />
  );
};

interface CardRevealProps {
  property: FeatureRevealProperty;
  index: number;
  sectionProgress: number;
  reduce: boolean;
  isDesktop: boolean;
  imageParallaxRange: number;
}

const CardReveal = ({
  property,
  index,
  sectionProgress,
  reduce,
  isDesktop,
  imageParallaxRange,
}: CardRevealProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  const triggers = property.triggers || {};
  const startNo = parsePercentTop(triggers.no?.start) ?? 70;
  const endNo = parsePercentTop(triggers.no?.end) ?? 40;
  const startTitle = parsePercentTop(triggers.title?.start) ?? 70;
  const endTitle = parsePercentTop(triggers.title?.end) ?? 40;
  const startContent = parsePercentTop(triggers.content?.start) ?? 70;
  const endContent = parsePercentTop(triggers.content?.end) ?? 40;
  const startImg = parsePercentTop(triggers.img?.start) ?? 70;
  const endImg = parsePercentTop(triggers.img?.end) ?? 40;

  const inNo = useMemo(() => {
    if (!isDesktop) return true;
    const p = sectionProgress * 100;
    return p >= clamp(startNo, -20, 120) - 8;
  }, [isDesktop, sectionProgress, startNo]);

  const inTitle = useMemo(() => {
    if (!isDesktop) return true;
    const p = sectionProgress * 100;
    return p >= clamp(startTitle, -20, 120) - 6;
  }, [isDesktop, sectionProgress, startTitle]);

  const inContent = useMemo(() => {
    if (!isDesktop) return true;
    const p = sectionProgress * 100;
    return p >= clamp(startContent, -20, 120) - 4;
  }, [isDesktop, sectionProgress, startContent]);

  useEffect(() => {
    if (!isDesktop || reduce) {
      setInView(true);
      return;
    }
    const el = cardRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [isDesktop, reduce]);

  return (
    <div
      ref={cardRef}
      className="w-[80vw] h-screen flex gap-[5vw] industry-card max-[1025px]:h-fit max-[1025px]:flex-col-reverse max-[1025px]:w-full"
    >
      <div className="w-[40vw] h-screen overflow-hidden max-md:h-[110vw] max-[1025px]:w-full max-md:rounded-[4vw] max-[1025px]:h-[80vw] max-[1025px]:rounded-[2vw]">
        <ImageParallax
          src={property.image}
          alt={`property-img-${index + 1}`}
          className={`w-full h-full translate-x-(--image-shift-start) industry-img industry-${property.imgClass} max-[1025px]:translate-x-0 max-[1025px]:object-cover`}
          style={
            {
              "--image-shift-start": `-${imageParallaxRange}%`,
            } as CSSProperties & Record<`--${string}`, string | number>
          }
          scrollProgress={sectionProgress * 100}
          startPct={startImg}
          endPct={endImg}
          parallaxRange={imageParallaxRange}
          reduce={reduce}
          priority={index === 0}
        />
      </div>

      <div className="flex flex-col gap-[5vh] w-[60%] pt-[7%] max-md:pt-0 max-[1025px]:w-full max-[1025px]:gap-[4vw] max-md:gap-[7vw]">
        <RevealChars
          text={property.number ?? ""}
          className={`text-[6em] font-medium text-muted-foreground leading-none industry-no industry-no-${property.no} max-[1025px]:text-[10vw]`}
          inView={inView && inNo}
          reduce={reduce}
          y={150}
          rotate={10}
          stagger={0.1}
          duration={0.7}
        />

        <div className="w-full h-fit flex flex-col gap-[4vh] max-md:gap-[7vw]">
          <RevealLines
            text={property.title ?? ""}
            className={`text-[4em] industry-title max-md:text-[9vw] max-[1025px]:text-[7.5vw] leading-[1.3] ${property.titleClass}`}
            inView={inView && inTitle}
            reduce={reduce}
            yPercent={100}
            stagger={0.08}
            duration={0.7}
          />

          <div className="space-y-[1.5vw] max-[1025px]:text-[2.5vw] max-md:text-[4.2vw]">
            {(property.paragraphs as string[]).map((para, pIndex) => (
              <RevealLines
                key={pIndex}
                text={para}
                className={`industry-content ${property.contentClass}`}
                inView={inView && inContent}
                reduce={reduce}
                delay={0.3}
                yPercent={100}
                stagger={0.08}
                duration={0.7}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

interface HorizontalScrollCompProps {
  propertiesData?: FeatureRevealProperty[];
  bgColor?: string;
  imageParallaxRange?: number;
  cardGap?: number;
}

function HorizontalScrollComp({
  propertiesData = defaultPropertiesData,
  bgColor,
  imageParallaxRange = 30,
  cardGap = 15,
}: HorizontalScrollCompProps) {
  const uid = useId().replace(/:/g, "");
  const sectionId = `industries-${uid}`;
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLHeadingElement>(null);

  const reduceMotion = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);
  const [sectionHeight, setSectionHeight] = useState<number | undefined>(
    undefined,
  );
  const [trackWidth, setTrackWidth] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);

  const measure = useCallback(() => {
    const section = sectionRef.current;
    const track = containerRef.current;
    if (!section || !track) return;

    const desktop = window.matchMedia("(min-width: 1026px)").matches;
    const vw = window.innerWidth;
    const tw = track.scrollWidth;

    setIsDesktop(desktop);
    setViewportWidth(vw);
    setTrackWidth(tw);

    if (desktop && !reduceMotion && tw > vw) {
      const dist = Math.max(0, tw - vw);
      setSectionHeight(window.innerHeight + dist);
    } else {
      setSectionHeight(undefined);
    }
  }, [reduceMotion]);

  useLayoutEffect(() => {
    measure();
    const track = containerRef.current;
    const ro = new ResizeObserver(measure);
    if (track) ro.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure, propertiesData]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const distX = useMemo(() => {
    if (!isDesktop || reduceMotion) return 0;
    return Math.max(0, trackWidth - viewportWidth) * 0.79;
  }, [isDesktop, reduceMotion, trackWidth, viewportWidth]);

  const x = useTransform(scrollYProgress, [0, 1], [0, -distX]);

  const headProgress = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  const sectionStyle: CSSProperties = {};
  if (sectionHeight !== undefined) {
    sectionStyle.height = sectionHeight;
  }

  const isPinned = Boolean(isDesktop && !reduceMotion && sectionHeight);

  const pinnedClass = isPinned
    ? "sticky top-0 flex h-screen justify-center items-center overflow-hidden"
    : "flex justify-center items-center overflow-hidden max-[1025px]:static max-[1025px]:w-full max-[1025px]:h-fit max-[1025px]:flex max-[1025px]:flex-col max-[1025px]:items-start";

  return (
    <section
      ref={sectionRef}
      className={`w-screen relative z-10 max-[1025px]:mt-0 max-[1025px]:h-fit max-[1025px]:py-[15%] max-[1025px]:px-[7vw] text-foreground ${bgColor ? "" : "bg-background"}`}
      style={{
        ...sectionStyle,
        ...(bgColor ? { backgroundColor: bgColor } : {}),
      }}
      id={sectionId}
    >
      <div className={pinnedClass}>
        <motion.div
          ref={containerRef}
          style={isPinned ? { x } : undefined}
          className="flex flex-nowrap w-fit industry-container gap-(--card-gap) max-[1025px]:flex-col max-[1025px]:gap-[10vw] max-md:gap-[15vw]"
          layout
        >
          <div
            className="w-[80vw] h-screen flex items-center justify-start max-[1025px]:hidden"
            style={{ paddingRight: "5vw" }}
          >
            <h2
              ref={headRef}
              className="industry-head text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight leading-[1.05] text-foreground"
            >
              <HeadChars
                text="Featured Properties"
                className="inline-block"
                progress={headProgress.get()}
                reduce={reduceMotion}
              />
            </h2>
          </div>

          {propertiesData.map((property, index) => (
            <CardReveal
              key={index}
              property={property}
              index={index}
              sectionProgress={scrollYProgress.get()}
              reduce={reduceMotion}
              isDesktop={isDesktop}
              imageParallaxRange={imageParallaxRange}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export interface HorizontalFeatureRevealProps {
  properties?: FeatureRevealProperty[];
  bgColor?: string;
  imageParallaxRange?: number;
  cardGap?: number;
}

export default function HorizontalFeatureReveal({
  properties = defaultPropertiesData,
  bgColor,
  imageParallaxRange = 30,
  cardGap = 15,
}: HorizontalFeatureRevealProps) {
  return (
    <HorizontalScrollComp
      propertiesData={properties}
      bgColor={bgColor}
      imageParallaxRange={imageParallaxRange}
      cardGap={cardGap}
    />
  );
}
