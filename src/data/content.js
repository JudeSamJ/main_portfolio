// Content sourced from Jude's resume — edit freely as things change.

export const profile = {
  name: "Jude Sam J",
  title: "AI/ML Engineer & Full-Stack Developer",
  tagline:
    "Building AI-powered applications and end-to-end machine learning pipelines.",
  bio: "Computer Science undergraduate with a strong interest in AI engineering, machine learning, and intelligent system design. Skilled in building AI-powered applications, integrating large language models, and developing end-to-end ML pipelines, with hands-on experience deploying real-world solutions — from NLP and deep learning to prompt engineering, retrieval-augmented generation, and model fine-tuning on cloud platforms. Has presented research at national-level technical symposiums and is passionate about contributing to AI-driven projects.",
  location: "Chennai, India",
  origin: "B.E. Computer Science & Engineering",
  affiliation: "Undergraduate • Open to Internships & Full-Time Roles",
  avatarInitials: "JS",
  photo: "/images/me_2.jpeg",
};

export const stats = [
  { label: "AI / ML", value: 85 },
  { label: "Frontend", value: 78 },
  { label: "Backend", value: 75 },
  { label: "Cloud & DevOps", value: 65 },
  { label: "Teamwork", value: 90 },
];

export const skills = [
  // Languages
  { name: "Python", category: "Language", level: "Expert" },
  { name: "Java", category: "Language", level: "Advanced" },
  { name: "JavaScript", category: "Language", level: "Advanced" },
  { name: "C++", category: "Language", level: "Intermediate" },
  { name: "C#", category: "Language", level: "Intermediate" },
  { name: "SQL", category: "Language", level: "Advanced" },
  { name: "HTML", category: "Language", level: "Advanced" },
  { name: "CSS", category: "Language", level: "Advanced" },
  // Frameworks
  { name: "React.js", category: "Frontend", level: "Advanced" },
  { name: "Next.js", category: "Frontend", level: "Intermediate" },
  { name: "Node.js", category: "Backend", level: "Advanced" },
  // AI / ML
  { name: "LLMs", category: "AI/ML", level: "Advanced" },
  { name: "LangChain", category: "AI/ML", level: "Advanced" },
  { name: "RAG", category: "AI/ML", level: "Advanced" },
  { name: "Agentic AI", category: "AI/ML", level: "Advanced" },
  { name: "CNN / LSTM", category: "AI/ML", level: "Intermediate" },
  { name: "Transfer Learning", category: "AI/ML", level: "Intermediate" },
  { name: "Predictive Analytics", category: "AI/ML", level: "Intermediate" },
  // Database & Cloud
  { name: "MongoDB", category: "Database", level: "Advanced" },
  { name: "MySQL", category: "Database", level: "Advanced" },
  { name: "Microsoft SQL Server", category: "Database", level: "Intermediate" },
  { name: "Microsoft Azure", category: "Cloud", level: "Intermediate" },
  { name: "AWS", category: "Cloud", level: "Familiar" },
  // Tools
  { name: "Git / GitHub", category: "Tooling", level: "Advanced" },
  { name: "Jupyter Notebook", category: "Tooling", level: "Advanced" },
  { name: "Firebase", category: "Tooling", level: "Intermediate" },
  { name: "Power Platform", category: "Tooling", level: "Familiar" },
];

// `brand` styling per project echoes that project's own site identity —
// its logo mark (cropped from its real login page where one exists),
// accent color (matched from its own UI), and a font pulled from the
// portfolio's own type system that best matches its wordmark style.
export const projects = [
  {
    title: "Apex",
    tagline: "B2B Corporate Card & Spend Management",
    description:
      "A full-stack corporate card and spend management platform in the spirit of Ramp or Brex — issues virtual and physical employee cards with spend limits and merchant rules, and tracks every transaction through a built-in ledger. Handles the full spend lifecycle: bill pay, expense reimbursements, multi-step approvals, and automatic GL coding, plus KYB/AML compliance, spend-anomaly detection, 1099-NEC tax reporting, SSO, RBAC, and multi-entity support.",
    tags: ["FastAPI", "SQLAlchemy", "PostgreSQL", "React", "TypeScript"],
    liveUrl: "https://apex-ten-phi.vercel.app/",
    brand: {
      logo: "/images/logos/apex.png",
      accent: "azure",
      font: "font-display uppercase tracking-wide",
      badge: "dark",
    },
  },
  {
    title: "VectraFlow",
    tagline: "AI-Native RAG Knowledge Assistant",
    description:
      "Upload PDFs, DOCX, HTML, or text into isolated knowledge bases and get natural-language answers grounded in that content, with inline citations back to the source. Documents are parsed, chunked, and embedded asynchronously via Celery workers; a retrieval playground lets you compare dense/sparse/hybrid/HyDE search strategies, and an evaluation tool measures answer accuracy against custom test sets, alongside PII governance and usage analytics.",
    tags: ["FastAPI", "Milvus", "Celery", "Groq", "React"],
    liveUrl: "https://vectraflow-frontend.vercel.app/login",
    brand: {
      monogram: "VF",
      accent: "emerald",
      font: "font-body font-semibold",
      badge: "dark",
    },
  },
  {
    title: "SoloPilot",
    tagline: "Business Dashboard for Freelancers",
    description:
      "A one-stop dashboard that replaces the usual patchwork of spreadsheets and notebooks for independent freelancers — tracks income and expenses by client and project, manages client profiles and profitability, and generates GST-compliant invoices with public client-facing links, recurring billing, and Razorpay payment collection. Includes a P&L and tax-estimate analytics dashboard, team collaboration, audit logging, and offline-capable PWA support.",
    tags: ["React", "TypeScript", "FastAPI", "PostgreSQL", "Razorpay"],
    liveUrl: "https://freelancer-dashboard-frontend.vercel.app/",
    brand: {
      logo: "/images/logos/solopilot.png",
      accent: "amber",
      font: "font-accent font-semibold",
      badge: "light",
    },
  },
];

export const timeline = [
  {
    year: "Jun 2024 — Jul 2024",
    title: "Backend Development Intern, Calibraint Technologies Pvt. Ltd.",
    description:
      "Built a fast, scalable backend for an e-commerce app using FastAPI with Google OAuth 2.0 for secure login, and added CORS middleware for safe cross-origin communication — focused on secure, efficient backend systems for modern web apps.",
  },
  {
    year: "Nov 2022 — May 2026",
    title: "B.E. Computer Science & Engineering, Saveetha Engineering College",
    description:
      "CGPA 8.1/10 (through 7th semester). AWS Certified Cloud Practitioner; NPTEL — Introduction to Machine Learning; Zoho Creator Program for Students.",
  },
  {
    year: "Jul 2019 — Jun 2021",
    title: "Higher Secondary, Chennai Public School",
    description: "CBSE — 90%.",
  },
];

export const socials = {
  email: "judesamuelsjj@gmail.com",
  phone: "+91 6382989022",
  github: "https://github.com/JudeSamJ",
  linkedin: "https://linkedin.com/in/jude-sam-b254a6260/",
};
