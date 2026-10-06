"use client";

/**
 * Isha Ghatule, Product Manager. Portfolio home page.
 *
 * The whole page lives in this one file (requested). Because the page is
 * fundamentally interactive (toggleable checklists, inline-edit hover,
 * entrance + scroll motion), the file is a Client Component. In a larger
 * project the static shell would stay a Server Component with these
 * interactions isolated as client leaves; here, one file wins.
 *
 * Aesthetic: a warm, hand-drawn "kinder internet" paper style fused onto a
 * real Jira issue layout. One light theme. One action accent (blue). Green is
 * status-only, terracotta is handwriting-only, pastels are sticky-notes-only.
 * Zero em-dashes anywhere.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "motion/react";
import {
  BookmarkSimple,
  ArrowUp,
  ArrowRight,
  ArrowUpRight,
  DownloadSimple,
  Check,
  CheckCircle,
  CheckSquare,
  CaretRight,
  MagnifyingGlass,
  X,
  PencilSimple,
  MapPin,
  GraduationCap,
  Briefcase,
  Compass,
  Kanban,
  Cpu,
  Code,
  ChartBar,
  Certificate,
  LinkedinLogo,
  GithubLogo,
  EnvelopeSimple,
} from "@phosphor-icons/react";

/* ------------------------------------------------------------------ data */

const EMAIL = "isha.ghatule@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/isha-ghatule-01a316148/";
const GITHUB = "https://github.com/ishaghatule";
const RESUME = "/Isha_Ghatule_Resume.pdf";

// Nav is the ticket checklist (requested). Each row navigates and ticks.
const NAV = [
  { id: "ticket", label: "Ticket", href: "#ticket" },
  { id: "about", label: "About", href: "#about" },
  { id: "skills", label: "Skills", href: "#skills" },
  { id: "board", label: "My Board", href: "#board" },
  { id: "resume", label: "Resume", href: RESUME },
  { id: "contact", label: "Let's talk", href: `mailto:${EMAIL}` },
] as const;

const LABELS = ["fintech", "AI/ML", "SaaS", "0 to 1", "compliance"];

const STATS = [
  { value: "0→1", label: "Prototype to production" },
  { value: "40%", label: "Ops visibility at fiscor.ai" },
  { value: "30%", label: "Faster delivery" },
];

const ABOUT_FIELDS = [
  {
    icon: Briefcase,
    label: "Experience",
    value: "Product Manager at fiscor.ai.",
  },
  {
    icon: GraduationCap,
    label: "Education",
    value: "Virginia Tech MBA, dual BS in CS and Cybersecurity.",
  },
  { icon: MapPin, label: "Location", value: "Foster City, California." },
  {
    icon: Compass,
    label: "Focus",
    value: "Fintech, AI-native products, 0 to 1.",
  },
];

/* ---------------------------------------------------------------- board */

type BoardItem = {
  key: string;
  type: "Story" | "Task";
  column: "inprogress" | "done" | "side";
  title: string;
  summary: string;
  labels: string[];
  description: string;
  bullets: string[];
  meta?: string;
};

const COLUMNS = [
  { id: "inprogress", label: "In progress" },
  { id: "done", label: "Done" },
  { id: "side", label: "Side projects" },
] as const;

const COL_META: Record<
  BoardItem["column"],
  { status: string; tone: "action" | "story" | "neutral" }
> = {
  inprogress: { status: "In progress", tone: "action" },
  done: { status: "Done", tone: "story" },
  side: { status: "Side project", tone: "neutral" },
};

const BOARD: BoardItem[] = [
  {
    key: "ISHA-2",
    type: "Story",
    column: "inprogress",
    title: "MARS + ORCA, AI-native collections platform",
    summary: "0 to 1 voice and SMS negotiation agents for debt collections.",
    labels: ["fintech", "AI/ML", "0 to 1", "compliance"],
    meta: "fiscor.ai · Product Owner, 0 to 1",
    description:
      "The flagship build at fiscor.ai: a multi-tenant AI debt-collections platform for US credit markets.",
    bullets: [
      "Defined and shipped AI voice and SMS negotiation agents with concession-ladder logic, compliance gating, quiet-hours and consent enforcement, and human finalization, lifting collections contact rates.",
      "Architected multi-tenant isolation with row-level security, per-tenant managed secrets, and currency-aware config, so a second tenant onboarded with zero data crossover.",
      "Built the deployment pipeline from dev to production: staged rollouts, runbooks, feature-flag gating, paired database migrations, and seeded playground environments for demos and QA.",
    ],
  },
  {
    key: "ISHA-3",
    type: "Task",
    column: "inprogress",
    title: "Release and QA systems, from zero",
    summary: "Stood up release management and QA for a 15-person team.",
    labels: ["process", "QA", "release"],
    meta: "fiscor.ai · Jun 2025 to present",
    description: "Beyond the product, I built how the team ships.",
    bullets: [
      "Stood up release management from scratch: a two-week cadence, committed-vs-if-time scoping, and per-item done-when acceptance gates.",
      "Built QA from zero: a P0 to P4 triage board, a standing bug-hardening lane, and regression plus compliance test gates, shipping releases with zero open critical or high defects.",
      "Own end-to-end product across discovery, PRDs, roadmap, and sprint execution for a 15-person cross-functional team.",
    ],
  },
  {
    key: "ISHA-4",
    type: "Story",
    column: "done",
    title: "CRED, fintech growth and retention",
    summary: "Engagement, retention, and funnel work for fintech products.",
    labels: ["fintech", "growth", "analytics"],
    meta: "CRED · Jul 2022 to Jul 2023",
    description: "Product Manager on fintech growth at CRED, India.",
    bullets: [
      "Drove engagement and retention initiatives, contributing to a 22% lift in engagement.",
      "Cut funnel drop-off through A/B testing for an 18% conversion gain.",
      "Built SQL and Power BI dashboards that cut reporting turnaround by 35% and streamlined workflow automation.",
    ],
  },
  {
    key: "ISHA-5",
    type: "Task",
    column: "done",
    title: "Education, Virginia Tech and NMIMS",
    summary: "A business-analytics master's on a CS and IT foundation.",
    labels: ["Virginia Tech", "NMIMS", "analytics"],
    meta: "2023 to 2025",
    description: "A business-analytics master's built on computer science and IT.",
    bullets: [
      "M.S., Global Business Analytics, Virginia Tech, 2025.",
      "B.S., Information Technology, Virginia Tech, 2024.",
      "B.Tech, Computer Science (Data Science), NMIMS University, 2023.",
    ],
  },
  {
    key: "ISHA-6",
    type: "Story",
    column: "side",
    title: "Loan Default Prediction Engine",
    summary: "XGBoost risk model behind a real-time Streamlit UI.",
    labels: ["AI/ML", "Python", "risk"],
    meta: "Solo build, deployed",
    description: "A deployed credit-risk classifier with explainability.",
    bullets: [
      "Shipped an XGBoost risk-classification model behind a real-time Streamlit UI with SHAP explainability and KPI dashboards, reaching 99% accuracy and 1.00 recall.",
      "Wired GitHub and Colab pipelines for reproducible, scalable deployment into a financial use case.",
    ],
  },
  {
    key: "ISHA-7",
    type: "Story",
    column: "side",
    title: "Fitbit Behavioral Segmentation",
    summary: "K-Means personas from 1.3M rows of activity data.",
    labels: ["data", "Python", "segmentation"],
    meta: "Solo build, 1.3M rows",
    description: "Turning raw wearable data into go-to-market personas.",
    bullets: [
      "Processed 1.3M rows of minute-level activity, sleep, and heart-rate data in Python.",
      "Ran K-Means to derive 4 customer personas and built interactive Streamlit and Sigma dashboards for persona-based go-to-market.",
    ],
  },
  {
    key: "ISHA-8",
    type: "Task",
    column: "side",
    title: "Founder and community leadership",
    summary: "An e-commerce store and two data-science communities.",
    labels: ["founder", "community"],
    meta: "2019 to 2025",
    description: "Building teams and communities, not just products.",
    bullets: [
      "Salient Store: co-founded a Shopify clothing store at 18, owning the technical build and operations, roughly 60,000 rupees in revenue across 7 active months.",
      "AlgoRhythm: co-founded a graduate data-science community at Virginia Tech, DC area, 2024 to 2025.",
      "Analytika, NMIMS: Vice-President of Relations, leading 3 departments and about 45 students, running 4 to 5 events for 300+ attendees.",
      "Graduate Student Assembly, Virginia Tech: Financial Chair, owning budget and logistics for all GSA events.",
    ],
  },
  {
    key: "ISHA-9",
    type: "Story",
    column: "side",
    title: "Earlier builds, 2021 to 2023",
    summary: "Computer vision, forecasting, BI, and a billing system.",
    labels: ["data", "CV", "BI"],
    meta: "2021 to 2023",
    description: "A range of earlier technical builds across tools and domains.",
    bullets: [
      "Currency Detection: an Indian-currency denomination detector in MATLAB using a color-centroid mask approach.",
      "Cyber-attack risk prediction in JMP, and a COVID-19 tracking dashboard with regression-based forecasting.",
      "Movie-data cleaning with Power BI visualization, and a modular supermarket billing system in C.",
    ],
  },
];

function matchQuery(it: BoardItem, q: string) {
  const s = q.trim().toLowerCase();
  if (!s) return true;
  return (
    it.title +
    " " +
    it.summary +
    " " +
    it.description +
    " " +
    it.labels.join(" ")
  )
    .toLowerCase()
    .includes(s);
}

/* --------------------------------------------------- skills + experience */

const SKILL_GROUPS = [
  {
    icon: Kanban,
    label: "Product",
    items: [
      "Lifecycle ownership",
      "Discovery",
      "PRDs",
      "Roadmapping",
      "Prioritization",
      "A/B testing",
      "KPI analytics",
      "User research",
    ],
  },
  {
    icon: Cpu,
    label: "AI and ML",
    items: [
      "AI voice and SMS agents",
      "LLM workflows",
      "Hugging Face",
      "Vector DBs",
      "XGBoost",
      "SHAP",
    ],
  },
  {
    icon: Code,
    label: "Technical",
    items: [
      "Python",
      "SQL",
      "ETL",
      "Streamlit",
      "Airflow",
      "AWS",
      "GCP",
      "Supabase",
      "Databricks",
      "GitHub",
      "Feature flags",
      "MATLAB",
      "C",
    ],
  },
  {
    icon: ChartBar,
    label: "Analytics and BI",
    items: ["Power BI", "Tableau", "Sigma", "Google Analytics", "Excel and VBA"],
  },
] as const;

const CERTS = [
  "AWS Cloud Practitioner",
  "Google Analytics",
  "McKinsey Forward Program",
  "Base SAS and Visual Analytics",
];

const EXPERIENCE: {
  role: string;
  org: string;
  dates: string;
  tone: "action" | "story";
  status: string;
  blurb: string;
  metric: string;
}[] = [
  {
    role: "Product Manager",
    org: "fiscor.ai",
    dates: "Jun 2025 to Present",
    tone: "action",
    status: "In progress",
    blurb:
      "Own end-to-end product for a multi-tenant AI debt-collections SaaS. Took it 0 to 1 and built release and QA from scratch for a 15-person team.",
    metric: "0 to 1",
  },
  {
    role: "Product Manager",
    org: "CRED",
    dates: "Jul 2022 to Jul 2023",
    tone: "story",
    status: "Done",
    blurb:
      "Drove engagement and retention for fintech products, and cut funnel drop-off through A/B testing and data-driven experimentation.",
    metric: "+22% engagement",
  },
  {
    role: "Co-Founder",
    org: "Salient Store",
    dates: "2019",
    tone: "story",
    status: "Done",
    blurb:
      "Co-founded a Shopify store at 18, owning the technical build, day-to-day operations, and growth through Instagram and SEO.",
    metric: "7 active months",
  },
];

/* -------------------------------------------------------------- motion */

function useRise() {
  const reduce = useReducedMotion();
  return useMemo<Variants>(
    () => ({
      hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 18 },
      show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
      },
    }),
    [reduce]
  );
}

/* ------------------------------------------------------------ primitives */

function Lozenge({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "action" | "story";
}) {
  const tones = {
    neutral: "bg-paper-2 text-subtle",
    action: "bg-action text-white",
    story: "bg-story/15 text-storyink",
  } as const;
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

function FieldRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  // "Every field is clickable": a soft Jira inline-edit hover affordance.
  return (
    <div className="group -mx-2 rounded-md px-2 py-2 transition-colors hover:bg-field">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-subtle">
          {label}
        </span>
        <PencilSimple
          weight="bold"
          className="size-3.5 text-subtle opacity-0 transition-opacity group-hover:opacity-100"
          aria-hidden
        />
      </div>
      <div className="mt-1 text-sm text-ink">{children}</div>
    </div>
  );
}

function TickBox({ done }: { done: boolean }) {
  return (
    <span
      className={`grid size-[18px] shrink-0 place-items-center rounded-[4px] border transition-colors ${
        done ? "border-story bg-story" : "border-cardline bg-white"
      }`}
    >
      {done && <Check weight="bold" className="size-3 text-white" aria-hidden />}
    </span>
  );
}

/* ------------------------------------------------------------------ nav */

function TopNav() {
  const [ticked, setTicked] = useState<Record<string, boolean>>({});
  const count = Object.values(ticked).filter(Boolean).length;

  function handleNav(
    e: React.MouseEvent<HTMLAnchorElement>,
    item: (typeof NAV)[number]
  ) {
    const willCheck = !ticked[item.id];
    setTicked((s) => ({ ...s, [item.id]: willCheck }));

    if (item.href.startsWith("#")) {
      // Section link: ticking scrolls to it, un-ticking returns to the landing.
      e.preventDefault();
      const target = willCheck ? item.href.slice(1) : "ticket";
      document
        .getElementById(target)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (!willCheck) {
      // Resume / mail: fire the action only when ticking, not when un-ticking.
      e.preventDefault();
    }
  }

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-paper/85 backdrop-blur">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4 sm:px-6"
      >
        <a
          href="#ticket"
          className="font-script text-2xl font-bold text-ink"
          aria-label="Isha Ghatule home"
        >
          Isha Ghatule
        </a>

        <ul className="ml-auto flex items-center gap-1 overflow-x-auto sm:gap-2">
          {NAV.map((item) => {
            const isDone = !!ticked[item.id];
            const external = item.href.startsWith("mailto:");
            return (
              <li key={item.id} className="shrink-0">
                <a
                  href={item.href}
                  download={item.id === "resume" ? "" : undefined}
                  onClick={(e) => handleNav(e, item)}
                  className="flex items-center gap-2 rounded-btn px-2.5 py-1.5 text-sm font-medium text-ink transition-colors hover:bg-paper-2"
                >
                  <TickBox done={isDone} />
                  <span className={isDone ? "line-through decoration-subtle/60" : ""}>
                    {item.label}
                  </span>
                  {external && (
                    <ArrowUpRight weight="bold" className="size-3.5 text-subtle" aria-hidden />
                  )}
                </a>
              </li>
            );
          })}
          <li className="ml-1 hidden shrink-0 font-script text-base text-subtle sm:block">
            {count}/{NAV.length}
          </li>
        </ul>
      </nav>
    </header>
  );
}

/* ------------------------------------------------------------ sticky note */

function StickyNote({
  children,
  tone,
  className = "",
}: {
  children: React.ReactNode;
  tone: "peach" | "butter" | "sage";
  className?: string;
}) {
  const bg = { peach: "bg-peach", butter: "bg-butter", sage: "bg-sage" }[tone];
  const rise = useRise();
  return (
    <motion.div
      variants={rise}
      className={`pointer-events-none absolute z-30 hidden w-40 md:block ${className}`}
      aria-hidden
    >
      <div
        className={`relative ${bg} px-4 py-3 shadow-[0_14px_26px_-12px_rgba(27,39,51,0.5)]`}
      >
        {/* strip of tape */}
        <span className="absolute -top-2.5 left-1/2 h-5 w-14 -translate-x-1/2 -rotate-2 rounded-[2px] bg-white/35 shadow-[0_1px_2px_rgba(0,0,0,0.08)]" />
        <span className="block font-script text-lg leading-tight text-ink">
          {children}
        </span>
      </div>
    </motion.div>
  );
}

/* --------------------------------------------------------- board pieces */

function TypeBadge({ type }: { type: BoardItem["type"] }) {
  if (type === "Task") {
    return (
      <span className="grid size-5 shrink-0 place-items-center rounded-[4px] bg-action/15">
        <CheckSquare weight="fill" className="size-3.5 text-action" aria-hidden />
      </span>
    );
  }
  return (
    <span className="grid size-5 shrink-0 place-items-center rounded-[4px] bg-story/15">
      <BookmarkSimple weight="fill" className="size-3.5 text-story" aria-hidden />
    </span>
  );
}

function BoardCard({
  item,
  onOpen,
}: {
  item: BoardItem;
  onOpen: (it: BoardItem) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      aria-haspopup="dialog"
      className="group block w-full rounded-xl border border-cardline bg-card p-4 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-action/40 hover:shadow-md active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-action/40"
    >
      <h3 className="font-semibold leading-snug text-ink">{item.title}</h3>
      {item.summary && (
        <p className="mt-1 text-[13px] leading-snug text-subtle">{item.summary}</p>
      )}
      {item.labels.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {item.labels.slice(0, 3).map((l) => (
            <span
              key={l}
              className="rounded-full bg-action/10 px-2 py-0.5 text-[11px] font-medium text-action-ink"
            >
              {l}
            </span>
          ))}
        </div>
      )}
      <div className="mt-3 flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-[12px] text-subtle">
          <TypeBadge type={item.type} />
          {item.key} <span className="text-subtle/50">&middot;</span> {item.type}
        </span>
        <span className="flex items-center gap-1.5">
          {item.column === "done" && (
            <CheckCircle weight="fill" className="size-4 text-storyink" aria-hidden />
          )}
          <Image
            src="/portrait.jpg"
            alt=""
            width={44}
            height={44}
            className="size-5 rounded-full object-cover object-[50%_14%]"
          />
        </span>
      </div>
    </button>
  );
}

function CardModal({
  item,
  onClose,
}: {
  item: BoardItem;
  onClose: () => void;
}) {
  const reduce = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const meta = COL_META[item.column];

  useEffect(() => {
    const prevFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab" && dialogRef.current) {
        const nodes = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
        if (nodes.length === 0) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      prevFocused?.focus();
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-ink/40 p-4 sm:p-8"
      initial={reduce ? { opacity: 1 } : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduce ? { opacity: 1 } : { opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={`${item.key}, ${item.title}`}
        onClick={(e) => e.stopPropagation()}
        initial={reduce ? false : { opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduce ? undefined : { opacity: 0, y: 10, scale: 0.98 }}
        transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
        className="relative my-auto w-full max-w-2xl rounded-card border border-cardline bg-card p-6 shadow-[0_30px_80px_-20px_rgba(27,39,51,0.5)] sm:p-8"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 grid size-8 place-items-center rounded-full text-subtle transition-colors hover:bg-field hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-action/40"
        >
          <X weight="bold" className="size-4" aria-hidden />
        </button>

        <div className="flex items-center gap-1.5 text-[13px] text-subtle">
          <span>ISHA</span>
          <span aria-hidden>/</span>
          <span>Portfolio</span>
          <span aria-hidden>/</span>
          <span className="font-semibold text-action">{item.key}</span>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-3">
          <TypeBadge type={item.type} />
          <span className="text-[13px] font-semibold text-subtle">
            {item.key} <span className="px-1 text-subtle/60">&middot;</span>{" "}
            {item.type}
          </span>
          <Lozenge tone={meta.tone}>{meta.status}</Lozenge>
        </div>

        <h2 className="mt-4 pr-8 font-serif text-2xl font-semibold leading-tight text-ink sm:text-3xl">
          {item.title}
        </h2>
        {item.meta && <p className="mt-1 text-sm text-subtle">{item.meta}</p>}

        <p className="mt-5 text-[11px] font-semibold uppercase tracking-wider text-subtle">
          Description
        </p>
        <p className="mt-1 text-[15px] leading-relaxed text-ink/90">
          {item.description}
        </p>

        <ul className="mt-4 space-y-2.5">
          {item.bullets.map((b, i) => (
            <li
              key={i}
              className="flex gap-2 text-[14px] leading-relaxed text-ink/90"
            >
              <CaretRight
                weight="bold"
                className="mt-1 size-3.5 shrink-0 text-action"
                aria-hidden
              />
              <span>{b}</span>
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {item.labels.map((l) => (
            <span
              key={l}
              className="rounded-full bg-action/10 px-2.5 py-0.5 text-[12px] font-medium text-action-ink"
            >
              {l}
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-2 border-t border-cardline pt-4 text-sm">
          <Image
            src="/portrait.jpg"
            alt="Isha Ghatule"
            width={48}
            height={48}
            className="size-6 rounded-full object-cover object-[50%_14%]"
          />
          <span className="font-medium text-ink">Isha Ghatule</span>
          <span className="text-subtle">Assignee</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ----------------------------------------------------------------- page */

export default function Home() {
  const rise = useRise();
  const [joinDone, setJoinDone] = useState(false);
  const doneCount = 2 + (joinDone ? 1 : 0);
  const [query, setQuery] = useState("");
  const [activeCard, setActiveCard] = useState<BoardItem | null>(null);

  return (
    <div className="min-h-[100dvh] bg-paper">
      <TopNav />

      <main className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        {/* ===================================================== HERO / TICKET */}
        <motion.section
          id="ticket"
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: 0.08 }}
          className="relative pt-16 sm:pt-20"
        >
          <motion.div
            variants={rise}
            className="relative z-10 grid gap-6 rounded-card border border-cardline bg-card p-5 shadow-[0_24px_60px_-28px_rgba(27,39,51,0.35)] sm:p-8 lg:grid-cols-[1fr_320px]"
          >
            {/* sticky notes stuck to the ticket's top edge */}
            <StickyNote tone="peach" className="-top-9 left-6 -rotate-6">
              Outcomes over output
            </StickyNote>
            <StickyNote tone="butter" className="-top-10 right-10 rotate-3">
              Every field is clickable
            </StickyNote>
            {/* ------------------------------------------------ main column */}
            <div>
              {/* breadcrumb */}
              <div className="flex items-center gap-1.5 text-[13px] text-subtle">
                <span>ISHA</span>
                <span aria-hidden>/</span>
                <span>Portfolio</span>
                <span aria-hidden>/</span>
                <span className="font-semibold text-action">ISHA-1</span>
              </div>

              {/* type + status */}
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <span className="grid size-6 place-items-center rounded-[5px] bg-story/15">
                  <BookmarkSimple weight="fill" className="size-4 text-story" aria-hidden />
                </span>
                <span className="text-[13px] font-semibold text-subtle">
                  ISHA-1 <span className="px-1 text-subtle/60">&middot;</span> Story
                </span>
                <Lozenge tone="action">Open to work</Lozenge>
              </div>

              {/* eyebrow + headline */}
              <p className="mt-6 font-script text-2xl text-terra">Hey, I&apos;m Isha</p>
              <h1 className="mt-1 font-serif text-[2.4rem] font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl">
                I build fintech products that{" "}
                <span className="marker-underline">feel human.</span>
              </h1>

              {/* description field */}
              <div className="mt-6">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-subtle">
                  Description
                </p>
                <p className="mt-2 max-w-[54ch] text-[15px] leading-relaxed text-ink/90">
                  Product Manager building AI-native, compliance-aware products
                  in regulated finance at fiscor.ai.
                </p>
              </div>

              {/* CTAs */}
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href={RESUME}
                  download=""
                  className="inline-flex items-center gap-2 rounded-btn bg-action px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-action-ink active:translate-y-px"
                >
                  <DownloadSimple weight="bold" className="size-4" aria-hidden />
                  Resume
                </a>
                <a
                  href={`mailto:${EMAIL}`}
                  className="inline-flex items-center gap-2 rounded-btn border border-cardline bg-white px-5 py-2.5 text-sm font-semibold text-ink transition-all hover:border-action hover:text-action active:translate-y-px"
                >
                  Let&apos;s talk
                  <ArrowRight weight="bold" className="size-4" aria-hidden />
                </a>
              </div>

              {/* stat row */}
              <dl className="mt-9 grid grid-cols-3 gap-4 border-t border-cardline pt-6">
                {STATS.map((s) => (
                  <div key={s.label}>
                    <dt className="sr-only">{s.label}</dt>
                    <dd>
                      <span className="block font-serif text-3xl font-semibold text-ink">
                        {s.value}
                      </span>
                      <span className="mt-1 block text-[13px] leading-snug text-subtle">
                        {s.label}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* ------------------------------------------------ details panel */}
            <aside className="h-fit rounded-xl border border-action/40 bg-field p-4">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-subtle">
                Details
              </p>

              <div className="mt-2 divide-y divide-cardline">
                <FieldRow label="Assignee">
                  <a
                    href={LINKEDIN}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 font-medium hover:text-action"
                  >
                    <Image
                      src="/portrait.jpg"
                      alt="Isha Ghatule"
                      width={56}
                      height={56}
                      priority
                      className="size-7 rounded-full object-cover object-[50%_14%]"
                    />
                    Isha Ghatule
                  </a>
                </FieldRow>

                <FieldRow label="Reporter">
                  <span className="flex items-center gap-2">
                    <span className="grid size-6 place-items-center rounded-full bg-paper-2 text-[10px] font-bold text-subtle">
                      You
                    </span>
                    Your team
                  </span>
                </FieldRow>

                <FieldRow label="Priority">
                  <span className="flex items-center gap-1.5 font-medium">
                    <ArrowUp weight="bold" className="size-4 text-terra" aria-hidden />
                    Highest
                  </span>
                </FieldRow>

                <FieldRow label="Sprint">Available now</FieldRow>

                <FieldRow label="Labels">
                  <div className="flex flex-wrap gap-1.5">
                    {LABELS.map((l) => (
                      <span
                        key={l}
                        className="rounded-full bg-action/10 px-2 py-0.5 text-[12px] font-medium text-action-ink"
                      >
                        {l}
                      </span>
                    ))}
                  </div>
                </FieldRow>
              </div>

              {/* checklist */}
              <div className="mt-4 rounded-lg border border-cardline bg-white p-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-subtle">
                    Checklist
                  </span>
                  <span className="text-[12px] font-semibold text-subtle">
                    {doneCount} of 3
                  </span>
                </div>
                <ul className="mt-2 space-y-1.5 text-sm">
                  <li className="flex items-center gap-2 text-subtle">
                    <TickBox done />
                    <span className="line-through">0 to 1 at fiscor.ai</span>
                  </li>
                  <li className="flex items-center gap-2 text-subtle">
                    <TickBox done />
                    <span className="line-through">Shipped AI voice agents</span>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => setJoinDone((v) => !v)}
                      aria-pressed={joinDone}
                      className="flex w-full items-center gap-2 rounded-md py-0.5 text-left text-ink transition-colors hover:text-action"
                    >
                      <TickBox done={joinDone} />
                      <span className={joinDone ? "line-through text-subtle" : ""}>
                        Join your team
                      </span>
                    </button>
                  </li>
                </ul>

                <a
                  href={`mailto:${EMAIL}`}
                  className="mt-3 flex items-center justify-center gap-2 rounded-btn bg-action px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-action-ink active:translate-y-px"
                >
                  Let&apos;s talk
                  <ArrowRight weight="bold" className="size-4" aria-hidden />
                </a>
              </div>
            </aside>
          </motion.div>
        </motion.section>

        {/* ============================================================ ABOUT */}
        <motion.section
          id="about"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          transition={{ staggerChildren: 0.08 }}
          className="pt-24"
        >
          <motion.p variants={rise} className="font-script text-2xl text-terra">
            About me
          </motion.p>
          <motion.h2
            variants={rise}
            className="mt-1 max-w-[18ch] font-serif text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl"
          >
            I work where engineering, design, and business meet.
          </motion.h2>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <motion.div variants={rise} className="max-w-[60ch] space-y-4 text-[15px] leading-relaxed text-ink/90">
              <p>
                I turn messy, high-stakes problems into products people actually
                trust. I have shipped features to real users, moved real
                metrics, and scaled real platforms across fintech and B2B
                analytics.
              </p>
              <p>
                My foundation is technical. I write my own SQL, read an ERD, and
                sit comfortably between data engineering and design. That lets me
                translate between what is possible, what is usable, and what
                moves the business.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <Image
                  src="/portrait.jpg"
                  alt="Isha Ghatule"
                  width={128}
                  height={128}
                  className="size-16 rounded-xl object-cover object-[50%_14%]"
                />
                <div className="font-script text-xl text-ink">
                  Isha Ghatule
                  <span className="block text-base text-subtle">
                    Product Manager, fiscor.ai
                  </span>
                </div>
              </div>
            </motion.div>

            {/* field grid (distinct layout family from the hero) */}
            <motion.dl variants={rise} className="grid gap-3 sm:grid-cols-2">
              {ABOUT_FIELDS.map((f) => (
                <div
                  key={f.label}
                  className="rounded-xl border border-line bg-card p-4"
                >
                  <dt className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-subtle">
                    <f.icon weight="bold" className="size-4 text-action" aria-hidden />
                    {f.label}
                  </dt>
                  <dd className="mt-2 text-sm leading-snug text-ink">{f.value}</dd>
                </div>
              ))}
            </motion.dl>
          </div>
        </motion.section>

        {/* ============================================== SKILLS + EXPERIENCE */}
        <motion.section
          id="skills"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          transition={{ staggerChildren: 0.06 }}
          className="pt-24"
        >
          <motion.div variants={rise}>
            <p className="font-script text-2xl text-terra">Skills and experience</p>
            <h2 className="mt-1 max-w-[20ch] font-serif text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl">
              What I bring, and where I have used it.
            </h2>
            <p className="mt-3 max-w-[60ch] text-[15px] leading-relaxed text-subtle">
              The product, AI, and data skills I work with, and the roles where
              they shipped.
            </p>
          </motion.div>

          <div className="mt-10 space-y-14">
            {/* experience timeline */}
            <motion.div variants={rise}>
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-subtle">
                <Briefcase weight="bold" className="size-4 text-action" aria-hidden />
                Experience
              </div>
              <ol className="relative mt-5 space-y-7">
                {EXPERIENCE.map((e, i) => (
                  <li key={e.org} className="relative pl-7">
                    <span
                      className={`absolute left-0 top-1.5 size-3 rounded-full ring-4 ring-paper ${
                        e.tone === "action" ? "bg-action" : "bg-story"
                      }`}
                    />
                    {i < EXPERIENCE.length - 1 && (
                      <span className="absolute bottom-[-1.75rem] left-[5px] top-5 w-px bg-cardline" />
                    )}
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <h3 className="font-semibold text-ink">
                        {e.role}, {e.org}
                      </h3>
                      <Lozenge tone={e.tone}>{e.status}</Lozenge>
                    </div>
                    <p className="mt-0.5 text-[13px] text-subtle">{e.dates}</p>
                    <p className="mt-2 max-w-[56ch] text-[14px] leading-relaxed text-ink/90">
                      {e.blurb}
                    </p>
                    <span className="mt-2.5 inline-block rounded-full bg-action/10 px-2.5 py-0.5 text-[12px] font-medium text-action-ink">
                      {e.metric}
                    </span>
                  </li>
                ))}
              </ol>
            </motion.div>

            {/* skills groups */}
            <motion.div variants={rise}>
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-subtle">
                <Compass weight="bold" className="size-4 text-action" aria-hidden />
                Skills
              </div>
              <div className="mt-5 grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
                {SKILL_GROUPS.map((g) => (
                  <div key={g.label}>
                    <div className="flex items-center gap-2 text-[12px] font-semibold text-ink">
                      <g.icon weight="bold" className="size-4 text-action" aria-hidden />
                      {g.label}
                    </div>
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {g.items.map((it) => (
                        <span
                          key={it}
                          className="rounded-full border border-cardline bg-card px-2.5 py-1 text-[12px] text-ink"
                        >
                          {it}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-7 border-t border-line pt-6">
                <div className="flex items-center gap-2 text-[12px] font-semibold text-ink">
                  <Certificate weight="bold" className="size-4 text-action" aria-hidden />
                  Certifications
                </div>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {CERTS.map((c) => (
                    <span
                      key={c}
                      className="rounded-full border border-cardline bg-card px-2.5 py-1 text-[12px] text-ink"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* ============================================================ BOARD */}
        <motion.section
          id="board"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          transition={{ staggerChildren: 0.06 }}
          className="pt-24"
        >
          <motion.div
            variants={rise}
            className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"
          >
            <div>
              <p className="font-script text-2xl text-terra">My board</p>
              <h2 className="mt-1 font-serif text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl">
                My work, on a board.
              </h2>
              <p className="mt-3 max-w-[60ch] text-[15px] leading-relaxed text-subtle">
                In progress at fiscor.ai, shipped at CRED and school, plus the
                side projects. Click any card to open it.
              </p>
            </div>
            <div className="relative shrink-0">
              <MagnifyingGlass
                weight="bold"
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-subtle"
                aria-hidden
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search the board"
                aria-label="Search the board"
                className="w-full rounded-btn border border-cardline bg-card py-2.5 pl-9 pr-3 text-sm text-ink placeholder:text-subtle focus:border-action focus:outline-none focus:ring-2 focus:ring-action/25 sm:w-64"
              />
            </div>
          </motion.div>

          <motion.div variants={rise} className="mt-8 grid gap-4 lg:grid-cols-3">
            {COLUMNS.map((col) => {
              const items = BOARD.filter(
                (it) => it.column === col.id && matchQuery(it, query)
              );
              return (
                <div key={col.id} className="rounded-2xl bg-paper-2/60 p-3">
                  <div className="flex items-center gap-2 px-1 py-2">
                    <Lozenge tone={COL_META[col.id].tone}>{col.label}</Lozenge>
                    <span className="text-[13px] font-semibold text-subtle">
                      {items.length}
                    </span>
                  </div>
                  <div className="space-y-3">
                    {items.map((it) => (
                      <BoardCard key={it.key} item={it} onOpen={setActiveCard} />
                    ))}
                    {items.length === 0 && (
                      <p className="rounded-xl border border-dashed border-cardline px-3 py-8 text-center text-[13px] text-subtle">
                        No cards match.
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </motion.section>
      </main>

      {/* =========================================================== FOOTER */}
      <footer className="border-t border-line/70">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
          <span className="font-script text-xl text-ink">Isha Ghatule</span>
          <div className="flex items-center gap-2">
            <a
              href={LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="grid size-9 place-items-center rounded-full border border-line text-subtle transition-colors hover:border-action hover:text-action"
            >
              <LinkedinLogo weight="bold" className="size-4.5" />
            </a>
            <a
              href={GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="grid size-9 place-items-center rounded-full border border-line text-subtle transition-colors hover:border-action hover:text-action"
            >
              <GithubLogo weight="bold" className="size-4.5" />
            </a>
            <a
              href={`mailto:${EMAIL}`}
              aria-label="Email"
              className="grid size-9 place-items-center rounded-full border border-line text-subtle transition-colors hover:border-action hover:text-action"
            >
              <EnvelopeSimple weight="bold" className="size-4.5" />
            </a>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {activeCard && (
          <CardModal item={activeCard} onClose={() => setActiveCard(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
