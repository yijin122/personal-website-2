export type AssignmentFigure = {
  src: string
  alt: string
  width: number
  height: number
  caption: string
}

export type AssignmentSection = {
  heading: string
  body: string
}

export type ScheduleSample = {
  name: string
  conflicts: string
  eveningMorning: string
  otherBackToBack: string
}

export type AssignmentRecord = {
  slug: string
  title: string
  role: string
  org: string
  place: string
  dates: string
  summary: string
  tags: string[]
  metric: { value: string; label: string }
  figures: AssignmentFigure[]
  sections: AssignmentSection[]
  samples?: ScheduleSample[]
  samplesNote?: string
}

export const assignments: AssignmentRecord[] = [
  {
    slug: "computime",
    title: "Engineering Analytics at Computime",
    role: "Engineering Analytics Intern",
    org: "Computime Limited",
    place: "Hong Kong",
    dates: "June to Aug. 2026",
    summary:
      "A collaboration dashboard: one grid for project health and milestone progress, and a check that flags files missing from the SharePoint structure.",
    tags: ["dashboard", "SharePoint", "Figma"],
    metric: {
      value: "Two pillars",
      label:
        "The Project Portfolio Matrix and the Directory Audit, delivered from a nine-pillar portal.",
    },
    figures: [
      {
        src: "/experiences/computime-dashboard.png",
        alt: "Computime collaboration dashboard, a project grid of health and milestone progress",
        width: 1949,
        height: 968,
        caption: "Project grid. Health and milestone progress on one pane.",
      },
      {
        src: "/experiences/computime-sharepoint.png",
        alt: "SharePoint tree in the Computime dashboard, used to flag missing files",
        width: 1791,
        height: 947,
        caption:
          "SharePoint tree. Files are checked against the structure, and missing documents are flagged.",
      },
    ],
    sections: [
      {
        heading: "Role",
        body: "Engineering analytics intern at Computime Limited in Hong Kong, June to August 2026, supervised by Jason Chan.",
      },
      {
        heading: "What was built",
        body: "The Engineering Collaboration Portal was framed as a nine-pillar vision. This summer delivered the Project Portfolio Matrix and the Directory Audit. The collaboration dashboard is a single-pane grid that compares project health and milestone progress, and it validates files against the SharePoint structure. The first interface was designed in Figma. On the record already: the dashboard tracks schedules, risks, quality metrics, and resource status, and it was used in executive reviews. Technical actions and risks from design reviews and gate meetings were consolidated so follow-through had an owner.",
      },
      {
        heading: "Stated result",
        body: "The summer delivery is the Project Portfolio Matrix and the Directory Audit. In interviews with department heads, and in tests of the prototypes with the people who would use them, the response recorded on the showcase was: “We really need this tool.”",
      },
    ],
  },
  {
    slug: "rag",
    title: "RAG research at HKUST",
    role: "AI Research Intern",
    org: "HKUST Data Science Foundations Lab",
    place: "Hong Kong",
    dates: "June to Aug. 2025",
    summary:
      "A full-stack retrieval pipeline on SQuAD. Qwen3 and FlagReranker are scored on F1, exact match, and latency as Top-N grows.",
    tags: ["RAG", "Qwen3", "FlagReranker", "SQuAD"],
    metric: {
      value: "≈ 500",
      label:
        "Top-N where F1 and exact match level off, while cost keeps rising.",
    },
    figures: [
      {
        src: "/experiences/rag-topn.png",
        alt: "HKUST poster chart of accuracy against Top-N, rising and then flattening",
        width: 660,
        height: 413,
        caption:
          "Accuracy against Top-N, from the poster. F1 and exact match rise together, then flatten.",
      },
    ],
    sections: [
      {
        heading: "Role",
        body: "AI research intern at the HKUST Data Science Foundations Lab, June to August 2025. The poster names Prof. Xiaofang Zhou as supervisor. Its title is “Exploring the Precision–Efficiency Trade-Off in Retrieval-Augmented Generation.”",
      },
      {
        heading: "What was built",
        body: "A full-stack RAG pipeline processing 100,000+ SQuAD queries against a vector database. Documents and queries are embedded, cosine similarity pulls the top-k passages, Qwen3 and FlagReranker rerank them, and the LLM answers from that context. The comparison is accuracy (F1 and exact match) against efficiency (time to first token and latency).",
      },
      {
        heading: "Stated result",
        body: "As Top-N grows, F1 and exact match improve. Past about 500, the poster says the gains plateau while cost keeps climbing: extra documents add noise and latency without much better answers. Reranking can raise retrieval quality, and it has to be tuned if the system is going to scale. The same poster records a separate gap: quantitative queries ran 22% below factual ones.",
      },
    ],
  },
  {
    slug: "scheduling",
    title: "Scheduling team at Cornell University",
    role: "Data Analyst, Cornell ORIE Scheduling Team",
    org: "Cornell University",
    place: "Ithaca, NY",
    dates: "Aug. 2024 to May 2026",
    summary:
      "Final-exam blocks for the registrar, and a layercake heuristic that builds each layer from a maximum-density subset of the conflict graph.",
    tags: ["scheduling", "layercake", "registrar"],
    metric: {
      value: "−15%",
      label: "High-conflict exam pairings, after 50+ optimization runs.",
    },
    figures: [
      {
        src: "/experiences/cornell-scheduler.png",
        alt: "Cornell exam schedule optimizer with conflict metrics and pinned time slots",
        width: 1888,
        height: 934,
        caption:
          "The registrar tool: filter a term, pin a slot, and read conflicts, back-to-backs, and triples.",
      },
    ],
    sections: [
      {
        heading: "Role",
        body: "Data analyst on the Cornell ORIE scheduling team in Ithaca, August 2024 to May 2026. The spring 2026 poster, with Daisy Lin and Andrew Jiang and advised by David Shmoys, is “From Size to Structure: Enhancing Layercake Heuristics with Maximum-Density Subsets.”",
      },
      {
        heading: "What was built",
        body: "Registrar data — pairwise co-enrollment, by exam, exam size, and by student — was turned into schedules across 560+ exams and 20,000+ students a semester. The interface for the registrar filters the term, sets bounds on metrics, pins exams, and exports. The poster’s pipeline assigns exams to fixed blocks with an integer program that minimizes weighted co-enrollment conflicts and penalizes risky back-to-backs. Each layercake layer is a maximum-density subset of the conflict graph, with a minimum share of exams and a student cap so the layer can still be scheduled. Already-scheduled exams stay in the next integer program, so they can move when the new layer arrives.",
      },
      {
        heading: "Stated result",
        body: "The scheduling record reports that 50+ optimization and simulation runs cut high-conflict pairings by 15%. The poster’s samples are a separate comparison, printed below: one conflict on a 21-block maximum-density schedule, four on the old layercake sample that also uses 21 blocks. A 22-block maximum-density sample reports five conflicts and fewer other back-to-backs. These are the three samples on the poster, not a claim that every term moved from four conflicts to one.",
      },
    ],
    samples: [
      {
        name: "21 blocks, maximum density",
        conflicts: "1",
        eveningMorning: "577",
        otherBackToBack: "2,369",
      },
      {
        name: "22 blocks, maximum density",
        conflicts: "5",
        eveningMorning: "762",
        otherBackToBack: "1,610",
      },
      {
        name: "21 blocks, old layercake",
        conflicts: "4",
        eveningMorning: "801",
        otherBackToBack: "2,193",
      },
    ],
    samplesNote:
      "Sample schedules from the poster. Evening–morning and other back-to-backs are the counts printed beside each figure.",
  },
]

export function getAssignment(slug: string) {
  return assignments.find((assignment) => assignment.slug === slug)
}
