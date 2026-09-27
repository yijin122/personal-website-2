export type StudyPoint = {
  heading: string
  body: string
}

export type Study = {
  slug: string
  index: string
  title: string
  place: string
  date: string
  tags: string[]
  metric: { value: string; label: string }
  summary: string
  points: StudyPoint[]
}

export const identity = {
  handle: "yijinsong",
  degree: "B.S. Operations Research & Engineering",
  school: "Cornell University, College of Engineering",
  place: "Ithaca, NY",
  gpa: "3.79",
  undergradExpected: "Expected Dec 2026",
  mfe: "Master of Financial Engineering (Early Admit)",
  mfeExpected: "Expected Dec 2027",
}

export const coursework = [
  "Optimization",
  "Stochastic Modeling",
  "Engineering Probability & Statistics",
  "Linear Algebra",
  "Financial & Managerial Accounting",
  "Practical Tools in Operations Research & Machine Learning",
  "Intro to Game Theories",
]

export const skillGroups = [
  {
    label: "Inference",
    items: ["Regression", "Predictive Modeling", "Hypothesis Testing"],
  },
  {
    label: "Decisions",
    items: ["Optimization", "Simulation"],
  },
  {
    label: "Languages and data",
    items: ["Python", "SQL", "Java", "Excel VBA"],
  },
  {
    label: "Visualization",
    items: ["Tableau", "Power BI"],
  },
  {
    label: "Interface",
    items: ["HTML", "CSS", "JavaScript", "React.js", "Figma", "GitHub"],
  },
]

export const metrics = [
  {
    value: "+70%",
    label: "Hourly revenue in the Lyft pricing study",
    href: "/work/ride-hailing",
  },
  {
    value: "−15%",
    label: "High-conflict exam pairings at Cornell",
    href: "/experience#scheduling",
  },
  {
    value: "100k+",
    label: "RAG query evaluations at HKUST",
    href: "/experience#rag",
  },
  {
    value: "−12%",
    label: "Ambulances while holding a 90% response bar",
    href: "/work/fdny-ambulance",
  },
  {
    value: "+8%",
    label: "Citywide survival after volunteer reallocation",
    href: "/work/ohca-survival",
  },
]

export const studies: Study[] = [
  {
    slug: "ride-hailing",
    index: "01",
    title: "Ride-hailing system optimization",
    place: "Cornell University, Ithaca, NY",
    date: "Mar. to Apr. 2026",
    tags: ["queueing", "optimization", "spatial"],
    metric: {
      value: "+70%",
      label: "Hourly revenue, $214,000 to $364,000",
    },
    summary:
      "A state-dependent queueing model for NYC ride-hailing, and the surge price that raised hourly revenue by 70%.",
    points: [
      {
        heading: "Model",
        body: "Built a state-dependent queueing model (birth-death process) for NYC ride-hailing, modeling rider cancellation behavior via spatial Poisson process and price sensitivity via shifted gamma distribution.",
      },
      {
        heading: "Pricing",
        body: "Optimized two-tier and smooth dynamic pricing strategies; increased hourly revenue from $214,000 to $364,000 (+70%) by identifying optimal surge price and congestion threshold for Lyft.",
      },
      {
        heading: "Insight",
        body: "Derived the key insight that aggressive surge pricing reduces demand more than it increases per-ride margin.",
      },
    ],
  },
  {
    slug: "retail-signal",
    index: "02",
    title: "Retail signal modeling",
    place: "Walmart revenue optimization, Cornell University, Ithaca, NY",
    date: "Mar. to Apr. 2025",
    tags: ["regression"],
    metric: {
      value: "×",
      label: "Category × placement interaction",
    },
    summary:
      "Linear regression on product portfolio and in-store placement, with interaction terms that surface where revenue actually moves.",
    points: [
      {
        heading: "Model",
        body: "Built linear regression models to analyze how product portfolio and in-store placement impact revenue.",
      },
      {
        heading: "Features",
        body: "Conducted feature engineering with interaction terms (for example, Category × Placement) to uncover sales drivers.",
      },
      {
        heading: "Recommendation",
        body: "Recommended actionable strategies (for example, front-of-store placement of clothing could increase revenue impact).",
      },
    ],
  },
  {
    slug: "fdny-ambulance",
    index: "03",
    title: "FDNY ambulance system status",
    place: "Course case study",
    date: "Spring 2026",
    tags: ["queueing", "optimization"],
    metric: {
      value: "90%",
      label: "Calls reached within 9 minutes, evenings",
    },
    summary:
      "The minimum ambulance fleet that reaches 90% of weekday-evening calls within 9 minutes, and a posting table for what remains.",
    points: [
      {
        heading: "Service level",
        body: "Determined the minimum ambulance fleet required to achieve 90% of emergency calls reached within 9 minutes during weekday evenings (7PM–12AM) using queueing theory and service level constraints.",
      },
      {
        heading: "Posting",
        body: "Constructed a compliance table specifying optimal posting locations for varying numbers of available ambulances, enabling real-time redeployment decisions under uncertainty.",
      },
      {
        heading: "Tradeoff",
        body: "Derived trade-offs between fleet size and response time compliance; recommended tiered dispatch policies reducing required ambulances by ~12% while maintaining the 90% threshold.",
      },
    ],
  },
  {
    slug: "ohca-survival",
    index: "04",
    title: "OHCA survival optimization",
    place: "Volunteer allocation, course case study",
    date: "Spring 2026",
    tags: ["optimization", "spatial"],
    metric: {
      value: "+8%",
      label: "Citywide expected survival",
    },
    summary:
      "Survival as a function of time-to-defibrillation, and a reallocation of 7,000 volunteers across NYC boroughs.",
    points: [
      {
        heading: "Model",
        body: "Modeled cardiac arrest survival as a function of time-to-defibrillation using spatial Poisson processes and population-weighted probabilities.",
      },
      {
        heading: "Allocation",
        body: "Optimized allocation of 7,000 volunteers across NYC boroughs to maximize expected survival.",
      },
      {
        heading: "Result",
        body: "Proposed a reallocation strategy improving citywide survival by ~8%.",
      },
    ],
  },
  {
    slug: "intelligent-scissors",
    index: "05",
    title: "Intelligent scissors",
    place: "Image segmentation tool",
    date: "Spring 2024",
    tags: ["vision"],
    metric: {
      value: "Dijkstra",
      label: "Shortest path along the edge",
    },
    summary:
      "A Java tool that extracts a region by letting Dijkstra trace the boundary between the points you choose.",
    points: [
      {
        heading: "Algorithm",
        body: "Developed a Java-based graphical application to extract images by implementing Intelligent Scissors functionality using Dijkstra’s algorithm to compute optimal paths between points, enabling precise edge detection.",
      },
      {
        heading: "Interface",
        body: "Designed an intuitive graphical user interface to facilitate user interaction, including real-time visualization of segmentation progress and feedback.",
      },
    ],
  },
]

export const studyTags = [
  "queueing",
  "optimization",
  "spatial",
  "regression",
  "vision",
] as const

export type Role = {
  id: string
  title: string
  org: string
  meta: string
  dates: string
  current: boolean
  bullets: string[]
}

export const technicalRoles: Role[] = [
  {
    id: "carmauto",
    title: "Frontend Developer",
    org: "Carmauto Inc",
    meta: "Part-time, remote",
    dates: "Jun 2026 – Present · 4 mos",
    current: true,
    bullets: [
      "Rebuilt the frontend of the company website, focusing on modern UI design, responsive layouts, and improved user experience.",
      "Implemented and refined web interfaces using HTML, CSS, and JavaScript.",
      "Improved visual consistency, navigation, and overall aesthetics across key website pages.",
      "Collaborated with team members to iterate on designs and incorporate feedback.",
    ],
  },
  {
    id: "computime",
    title: "Engineering Analytics Intern",
    org: "Computime Limited",
    meta: "Hong Kong",
    dates: "June to Aug. 2026",
    current: false,
    bullets: [
      "Built and maintained a company-wide engineering dashboard tracking schedules, risks, quality metrics, and resource status, which was used in executive reviews to support governance and performance management.",
      "Consolidated and drove closure of technical actions and risks from design reviews and gate meetings, ensuring accountability and structured follow-through.",
    ],
  },
  {
    id: "rag",
    title: "AI Research Intern",
    org: "HKUST Data Science Foundations Lab",
    meta: "Hong Kong",
    dates: "June to Aug. 2025",
    current: false,
    bullets: [
      "Engineered a full-stack RAG pipeline, designing workflows for data preprocessing, embedding generation, and real-time retrieval, enabling over 100,000 query evaluations to benchmark LLM retrieval accuracy.",
      "Implemented, fine-tuned, and compared multiple RAG reranking models (Qwen3, FlagReranker), improving top-k retrieval precision and boosting QA task performance across multiple curated evaluation sets.",
    ],
  },
  {
    id: "scheduling",
    title: "Data Analyst",
    org: "Cornell ORIE Scheduling Team",
    meta: "Ithaca, NY",
    dates: "Aug. 2024 to May 2026",
    current: false,
    bullets: [
      "Drove process optimization by transforming raw registrar data (pairwise co-enrollment, by-exam, exam sizes, by-student) into structured datasets across 560+ exams and 20,000+ students per semester.",
      "Led data-driven decision making through 50+ optimization and simulation runs on cloud platforms, producing exam schedules that improved fairness and reduced high-conflict pairings by 15%.",
      "Built a UI for the university registrar to use, including filtering, setting bounds for certain metrics, pinning, and export functionality.",
    ],
  },
  {
    id: "esw",
    title: "Design Team Member, Resource Renewal and Outreach",
    org: "Engineers for a Sustainable World — Cornell Chapter",
    meta: "Cornell",
    dates: "Feb 2024 – May 2025 · 1 yr 4 mos",
    current: false,
    bullets: [
      "Developed and implemented a cost-optimization model, reducing material costs while maintaining a high energy efficiency threshold.",
      "Led experiments incorporating Glauber salt in housing designs to improve solar panel efficiency and lifespan.",
    ],
  },
]

export const teachingRoles: Role[] = [
  {
    id: "cs1110",
    title: "Consultant, CS 1110 Introduction to Computing",
    org: "Cornell University",
    meta: "Lab and consulting hours",
    dates: "Aug 2024 – Present",
    current: true,
    bullets: [
      "Lead bi-weekly lab sections, reinforcing key lecture material for approximately 30 students.",
      "Provide troubleshooting support for over 500 students, resolving Python-related issues during consulting hours.",
      "Grade assignments and exams to deliver timely and accurate feedback within 24 hours of submission.",
    ],
  },
  {
    id: "aew",
    title: "Academic Excellence Workshop Facilitator",
    org: "Cornell University",
    meta: "Workshops and coaching",
    dates: "Aug 2024 – Present",
    current: true,
    bullets: [
      "Designed and led interactive workshops on high-performance academic skills for diverse student groups.",
      "Provided personalized academic coaching to students, creating tailored improvement plans that addressed individual learning challenges.",
    ],
  },
]

export const leadershipRoles: Role[] = [
  {
    id: "drama",
    title: "President, Chinese Drama Society at Cornell",
    org: "Cornell University",
    meta: "Comedy production",
    dates: "May 2025 – Present",
    current: true,
    bullets: [
      "Provide executive leadership for the organization, overseeing all administrative, financial, and creative operations.",
      "Direct comedy production, responsible for actor coaching and production timeline management for a team of 30.",
      "Conceived and executed a successful promotional campaign across multiple channels, resulting in a 20% growth in membership and increased audience engagement.",
    ],
  },
]

export function getStudy(slug: string): Study | undefined {
  return studies.find((study) => study.slug === slug)
}

export const nav = [
  { href: "/work", label: "Work" },
  { href: "/experience", label: "Experience" },
  { href: "/about", label: "About" },
] as const
