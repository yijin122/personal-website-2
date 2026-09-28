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

export type AssignmentBeat = {
  heading: string
  body: string
  figures?: AssignmentFigure[]
}

export type AssignmentRecord = {
  slug: string
  title: string
  role: string
  org: string
  place: string
  dates: string
  summary: string
  posterTitle?: string
  tags: string[]
  metric: { value: string; label: string }
  figures: AssignmentFigure[]
  sections: AssignmentSection[]
  beats?: AssignmentBeat[]
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
      "Optimizing the reranking stage to curb LLM hallucinations without sacrificing latency.",
    posterTitle:
      "Exploring the Precision–Efficiency Trade-Off in Retrieval-Augmented Generation",
    tags: ["RAG", "Qwen3", "FlagReranker", "SQuAD"],
    metric: {
      value: "≈ 500",
      label:
        "Top-N where F1 and exact match level off, while cost keeps rising.",
    },
    figures: [],
    sections: [],
    beats: [
      {
        heading: "The problem",
        body: "The poster is by Hedy Song, Cornell University, supervised by Prof. Xiaofang Zhou at the Hong Kong University of Science and Technology. Large language models are strong at understanding and generating language, and still limited by hallucinations, stale or incomplete knowledge, and a short context window. Retrieval-augmented generation was built to ground an answer in relevant, up-to-date documents: at inference the model retrieves supporting text and places it in the prompt. That improves factual accuracy and coverage. Each of the four stages also costs compute, so the trade-off between precision and speed is the practical question for anything that has to answer in time.\n\nIndexing splits documents into chunks and turns them into dense vectors. Querying embeds the user’s question with the same model. Retrieval compares those vectors, for example by cosine similarity, and keeps the closest segments. Generation hands those segments to the model as context.",
        figures: [
          {
            src: "/experiences/rag-stages.png",
            alt: "Poster diagram of the four RAG stages: indexing, querying, retrieval, and generation",
            width: 1467,
            height: 833,
            caption:
              "The four stages on the poster: indexing, querying, retrieval, and generation.",
          },
        ],
      },
      {
        heading: "The pipeline",
        body: "The work is a full-stack pipeline on more than 100,000 SQuAD queries against a vector database, with retrieval, reranking, and generation in one system. The poster’s aim is to measure how retrieval depth, reranking strategy, and model complexity move both accuracy and inference latency, and to find designs that stay factually accurate at a lower cost.\n\nPipeline design is that full stack. The retrieval stage embeds documents and queries with transformer models and runs a cosine-similarity search for the top-k segments. The reranking stage fine-tunes Qwen3 and FlagReranker and compares them on accuracy (F1 and exact match) and efficiency (time to first token and latency). The generation stage joins the top passages to the question, asks the model to answer, and checks the answer against SQuAD ground truth for consistency and relevance.",
        figures: [
          {
            src: "/experiences/rag-pipeline.png",
            alt: "Poster diagram of the RAG pipeline from retrieval through reranking to generation",
            width: 1485,
            height: 423,
            caption:
              "Pipeline design, retrieval, reranking, and generation, as drawn on the poster.",
          },
        ],
      },
      {
        heading: "What the runs show",
        body: "As Top-N grows, F1 and exact match improve substantially. A wider context makes the answer more precise. Past about 500, the gains level off while the cost keeps climbing. The extra documents are redundant or noisy, so latency rises without a matching gain in quality.\n\nThe poster’s conclusion is that reranking can raise retrieval quality a great deal, and that it has to be tuned if the system is going to scale. An adaptive Top-N, one that moves with how hard the query is, is left as a way to hold that balance.",
        figures: [
          {
            src: "/experiences/rag-accuracy-a.png",
            alt: "Poster chart of accuracy against Top-N, rising and then flattening",
            width: 991,
            height: 620,
            caption: "Accuracy against Top-N. One of the poster’s two result charts.",
          },
          {
            src: "/experiences/rag-accuracy-b.png",
            alt: "Second poster chart of accuracy against Top-N, rising and then flattening",
            width: 991,
            height: 620,
            caption:
              "The other accuracy chart. Together they are F1 and exact match.",
          },
          {
            src: "/experiences/rag-rerank.png",
            alt: "Poster graphic comparing reranking settings on accuracy and latency",
            width: 937,
            height: 264,
            caption:
              "The results graphic placed with the written trade-off between depth and latency.",
          },
        ],
      },
      {
        heading: "What is left open",
        body: "Two next steps are written on the poster. The first is a wider evaluation: more datasets and more rerankers, so the result is not tied to one domain.\n\nThe second is the quantitative-query gap. On the current results, quantitative questions score 22% below factual ones. The poster suggests three responses: rerankers built for numerical reasoning; a boost for passages that contain the matching units, quantities, or statistical terms; and knowledge graphs that link entities to numerical attributes, so the reasoning can be structured.",
        figures: [
          {
            src: "/experiences/rag-future.png",
            alt: "Poster illustration for the open questions after the RAG experiments",
            width: 923,
            height: 693,
            caption: "The poster’s figure beside the future-work notes.",
          },
        ],
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
