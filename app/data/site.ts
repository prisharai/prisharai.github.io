export type NavItem = {
  label: string;
  href: string;
};

export type Project = {
  title: string;
  kind: string;
  summary: string;
  href: string;
  swatch: string;
  imageLabel?: string;
};

export type ExperienceItem = {
  role: string;
  organization: string;
  location: string;
  period: string;
  advisor?: string;
  bullets: string[];
};

export const navItems: NavItem[] = [
  { label: "experience", href: "/experience" },
  { label: "projects", href: "/projects" },
  { label: "contact", href: "/contact" },
  { label: "misc", href: "/misc" },
];

export const projects: Project[] = [
  {
    title: "Generative AI Drug Screening",
    kind: "ai / healthcare",
    summary: "Description TBD.",
    href: "/projects",
    swatch:
      "linear-gradient(145deg, rgba(199,154,77,.26), rgba(205,194,224,.92) 42%, rgba(92,77,128,.52))",
    imageLabel: "image TBD",
  },
  {
    title: "Computer Vision for Irrigation Optimization",
    kind: "computer vision / sustainability",
    summary: "Description TBD.",
    href: "/projects",
    swatch:
      "linear-gradient(145deg, rgba(91,96,114,.5), rgba(247,245,250,.82) 45%, rgba(163,146,201,.72))",
    imageLabel: "image TBD",
  },
  {
    title: "Systems / ML Project TBD",
    kind: "systems / ml",
    summary:
      "Open slot for the systems or machine learning work I am doing at NYU this summer.",
    href: "/projects",
    swatch:
      "linear-gradient(145deg, rgba(247,245,250,.9), rgba(221,210,236,.86) 42%, rgba(136,141,160,.6))",
    imageLabel: "image TBD",
  },
  {
    title: "Imposter Game in OCaml",
    kind: "functional programming",
    summary: "Description TBD.",
    href: "/projects",
    swatch:
      "linear-gradient(145deg, rgba(92,77,128,.42), rgba(247,245,250,.88) 48%, rgba(199,154,77,.34))",
    imageLabel: "image TBD",
  },
  {
    title: "Critter World CS 2112 Capstone",
    kind: "simulation / software design",
    summary: "Description TBD.",
    href: "/projects",
    swatch:
      "linear-gradient(145deg, rgba(136,141,160,.62), rgba(205,194,224,.78) 50%, rgba(247,245,250,.9))",
    imageLabel: "image TBD",
  },
  {
    title: "Stories to Smiles Initiative for Sunrise Senior Living Center",
    kind: "community / sunrise senior living",
    summary: "Description TBD.",
    href: "/projects",
    swatch:
      "linear-gradient(145deg, rgba(199,154,77,.38), rgba(247,245,250,.88) 45%, rgba(163,146,201,.64))",
    imageLabel: "image TBD",
  },
];

export const experience: ExperienceItem[] = [
  {
    role: "Research Assistant",
    organization: "Cornell University - Epigenomics Core",
    advisor: "Facility Advisor: Dr. William KM Lai",
    location: "Ithaca, NY",
    period: "Oct 2025 - Jan 2026",
    bullets: [
      "Built a command-line backend pipeline that runs image segmentation across cloud virtual machines for genomics research.",
      "Wrote data processing scripts that calculate quality metrics so the team could tell how well each model was doing.",
      "Created visual summaries that made model results easier to compare and discuss with the research team.",
    ],
  },
  {
    role: "Software Engineering Intern",
    organization: "AT&T",
    location: "Middletown, NJ",
    period: "Jun 2025 - Jul 2025",
    bullets: [
      "Worked on large company software in an Agile team and adjusted quickly when project goals changed.",
      "Built reusable UI components with Angular and TypeScript, and learned how to use the Ask AT&T Workflows AI agent.",
      "Fixed UI bugs in notification flows and animation code while keeping up with a fast team workflow.",
    ],
  },
  {
    role: "Software Engineering Intern",
    organization: "Pfizer",
    location: "New York, NY",
    period: "Aug 2024 - Jan 2025",
    bullets: [
      "Built a Python NLP backend that pulled drug and adverse-event relationships from clinical text using spaCy, regex, and Pandas.",
      "Worked on named entity recognition and pattern matching, then explained the system architecture to 30+ Pfizer engineers.",
      "Made the inference code modular and easier to maintain so it could process large batches of clinical data on a tight schedule.",
    ],
  },
];

export const contactLinks = [
  { label: "email: pr482@cornell.edu", href: "mailto:pr482@cornell.edu" },
  { label: "github: github.com/prisharai", href: "https://github.com/prisharai" },
  {
    label: "linkedin: www.linkedin.com/in/prisharai1",
    href: "https://www.linkedin.com/in/prisharai1",
  },
];
