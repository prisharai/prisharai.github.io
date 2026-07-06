export type NavItem = {
  label: string;
  href: string;
};

export type SocialLink = {
  label: string;
  href: string;
};

export type Presentation = {
  /** Conference / venue acronym, e.g. "RECOMB". */
  venue: string;
  /** Where it was hosted, e.g. "MIT". */
  host: string;
  /** Month + year, e.g. "Mar 2024". */
  date: string;
  /** "Poster" | "Flash Talk" | "Oral" etc. */
  format: string;
  /** Optional extra context (organizing role, etc.). */
  note?: string;
};

export type Award = {
  label: string;
  detail?: string;
};

export type ResearchEntry = {
  /** Short field label, e.g. "Computational biology". */
  field: string;
  title: string;
  summary: string;
  /** Optional short pull-out facts shown as a small stat rail. */
  facts?: Array<{ value: string; label: string }>;
  status?: string;
  presentations?: Presentation[];
  awards?: Award[];
  links?: Array<{ label: string; href: string }>;
};

export type Project = {
  title: string;
  kind: string;
  summary: string;
  tags?: string[];
  details?: string[];
  links?: Array<{ label: string; href: string }>;
  /** Path (under public/) to a representative image. */
  image?: string;
  /** Give this project a full-width feature treatment. */
  featured?: boolean;
};

export type ExperienceItem = {
  role: string;
  organization: string;
  location: string;
  period: string;
  advisor?: string;
  link?: string;
  bullets: string[];
};

export const identity = {
  name: "Prisha Rai",
  wordmark: "pr15ha",
  line:
    "I’m pursuing a B.S. and M.Eng. in Computer Science from Cornell University. I’m interested in work that explores computer vision, applies computation to disease research, and builds strong technical infrastructure.",
};

export const navItems: NavItem[] = [
  { label: "Research", href: "/research" },
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "/experience" },
  { label: "Contact", href: "/contact" },
];

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/prisharai" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/prisharai1" },
  { label: "Email", href: "mailto:pr482@cornell.edu" },
];

export const researchEntries: ResearchEntry[] = [
  {
    field: "Computational biology",
    title:
      "A Novel VAE Pipeline for Tau Inhibitor Screening",
    summary:
      "A variational-autoencoder pipeline that models tau protein–ligand interactions to rank candidate Alzheimer’s tau inhibitors — validated against Drosophila melanogaster Alzheimer’s models.",
    facts: [
      { value: "7", label: "conferences" },
      { value: "2", label: "awards" },
      { value: "VAE", label: "core method" },
    ],
    presentations: [
      { venue: "RECOMB", host: "MIT", date: "Mar 2024", format: "Poster" },
      { venue: "GLBIO", host: "CMU", date: "May 2024", format: "Poster" },
      {
        venue: "ISMB",
        host: "Université de Montréal",
        date: "Jul 2024",
        format: "Flash Talk",
        note: "Helped organize via the ISCB Student Council",
      },
      { venue: "GHLC", host: "Harvard", date: "Sep 2024", format: "Flash Talk" },
      { venue: "URTC", host: "MIT", date: "Oct 2024", format: "Flash Talk" },
      { venue: "AAAS", host: "MIT", date: "Feb 2025", format: "Poster" },
    ],
    awards: [
      {
        label: "Lifetime AAAS Fellow",
        detail: "AAAS Annual Meeting @ MIT · Feb 2025",
      },
      {
        label: "Best Oral Presentation",
        detail: "ABRCMS Spring ePoster Symposium · $250",
      },
    ],
    links: [
      {
        label: "Abstract",
        href: "https://event.fourwaves.com/2024eposterss/abstracts/6fb326f0-4302-4dea-801e-594c41208987",
      },
      {
        label: "Poster",
        href: "https://drive.google.com/file/d/1Q3dUIgQFurp0pCoEY2UorWBKOAOoHltE/view?usp=sharing",
      },
    ],
  },
  {
    field: "Agentic AI safety",
    title:
      "Specification Gaming in Database Guardrails",
    summary:
      "A study of how frontier LLM agents respond to database guardrails — showing how denial feedback can push agents to satisfy safety rules literally while defeating their intent.",
    status: "arXiv pre-print pending",
  },
];

export const projects: Project[] = [
  {
    title: "Interdict",
    kind: "AI safety · Postgres · MCP",
    featured: true,
    summary:
      "Runtime safety layer between AI agents and Postgres. Interdict parses agent-written SQL, blocks destructive writes, simulates risky statements before execution, measures blast radius, supports out-of-band approvals, and records before-images for undo.",
    tags: ["MCP server", "Postgres parser", "Blast-radius sim", "Reversible writes"],
    details: [
      "MCP server for AI agents and Postgres",
      "Real Postgres parser",
      "Blast-radius simulation",
      "Reversible writes / undo",
      "PyPI developer preview: pip install interdict-db",
      "321 automated tests",
      "GitHub Actions CI and latency gate",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/prisharai/interdict" },
      { label: "PyPI", href: "https://pypi.org/project/interdict-db/" },
    ],
  },
  {
    title: "Generative AI Drug Screening",
    kind: "AI · healthcare",
    featured: true,
    image: "project-ai-drug-screening.png",
    summary:
      "A VAE-based screening workflow to help identify possible tau inhibitors, connecting model output with biological validation and clear research communication.",
    tags: ["VAE", "Drug discovery", "Comp bio"],
    links: [
      {
        label: "Abstract",
        href: "https://event.fourwaves.com/2024eposterss/abstracts/6fb326f0-4302-4dea-801e-594c41208987",
      },
      {
        label: "Poster",
        href: "https://drive.google.com/file/d/1Q3dUIgQFurp0pCoEY2UorWBKOAOoHltE/view?usp=sharing",
      },
    ],
  },
  {
    title: "Computer Vision for Irrigation Optimization",
    kind: "computer vision · sustainability",
    image: "project-irrigation-vision.png",
    summary:
      "Visual modeling for smarter irrigation decisions, turning image-based signals into a technical path for more efficient water use.",
    tags: ["Computer vision", "Sustainability"],
  },
  {
    title: "Imposter Game in OCaml",
    kind: "functional programming",
    image: "project-imposter-ocaml.png",
    summary:
      "A terminal party game built as a four-person capstone for Functional Programming, using OCaml to model game state, voting, scoring, and player flow.",
    tags: ["OCaml", "Capstone"],
    links: [{ label: "GitHub", href: "https://github.com/hannahtjacob/imposter" }],
  },
  {
    title: "Critter World",
    kind: "simulation · software design",
    image: "project-critter-world.png",
    summary:
      "A hex-grid simulation capstone for CS 2112 with moving critters, changing world state, and rule-driven behavior, built with a focus on clean design and debugging.",
    tags: ["Simulation", "Java"],
  },
  {
    title: "Stories to Smiles",
    kind: "community · storytelling",
    summary:
      "A community initiative centered on storytelling, connection, and bringing warmth into senior living spaces at Sunrise Senior Living Center.",
    tags: ["Community"],
  },
];

export const experience: ExperienceItem[] = [
  {
    role: "Open Source Contributor",
    organization: "NYU mLab, IoT Inspector",
    location: "Remote",
    period: "June 2026 – Present",
    link: "https://github.com/prisharai/inspector-core-library",
    bullets: [
      "Contributing to NYU mLab’s IoT Inspector through the inspector-core-library by increasing libinspector core test coverage and adding nmap scanning as a core scanner thread.",
    ],
  },
  {
    role: "Research Assistant",
    organization: "Cornell University — Epigenomics Core",
    advisor: "Facility Advisor: Dr. William KM Lai",
    location: "Ithaca, NY",
    period: "Oct 2025 – Jan 2026",
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
    period: "Jun 2025 – Jul 2025",
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
    period: "Aug 2024 – Jan 2025",
    bullets: [
      "Built a Python NLP backend that pulled drug and adverse-event relationships from clinical text using spaCy, regex, and Pandas.",
      "Worked on named entity recognition and pattern matching, then explained the system architecture to 30+ Pfizer engineers.",
      "Made the inference code modular and easier to maintain so it could process large batches of clinical data on a tight schedule.",
    ],
  },
];
