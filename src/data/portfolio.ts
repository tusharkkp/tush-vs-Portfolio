// Single source of truth. Facts come from Tushar's resume only.
// Never edit to add fabricated metrics, testimonials, or dates.

export const profile = {
  name: "Tushar Kaldate",
  fullName: "Kaldate Tushar Kalyanrao",
  role: "AI & Software Engineer",
  tagline: "Building production-grade AI products.",
  location: "Pune, Maharashtra, India",
  email: "tusharkaldate110@gmail.com",
  emailAlt: "202401040191@mitaoe.ac.in",
  phone: "+91-7798760700",
  github: "tusharkkp",
  githubUrl: "https://github.com/tusharkkp/",
  linkedin: "https://www.linkedin.com/in/tushar-kaldate-2b5276262/",
  codechef: "https://www.codechef.com/users/fine_droplet",
  legacyPortfolio: "https://tusharkkp.github.io/portfolio/",
  languages: ["English", "Hindi", "Marathi"],
} as const;

export const education = [
  {
    school: "MIT Academy of Engineering, Pune",
    degree: "B.Tech. — Computer Engineering",
    period: "2024 – 2028",
    score: "CGPA: 8.56 / 10",
  },
  {
    school: "JD Junior College, Parbhani",
    degree: "12th (HSC)",
    period: "2024",
    score: "75.30%",
  },
  {
    school: "Bal Vidhya Mandir Highschool, Parbhani",
    degree: "10th (MSBSHSE)",
    period: "2021",
    score: "98.80%",
  },
] as const;

export const experience = [
  {
    company: "Preskilet Pvt. Ltd.",
    role: "AI & Software Intern",
    period: "11 Jun 2025 – 11 Aug 2025",
    industry: "E-Learning / Edtech",
    skills: [
      "Figma",
      "AI model training",
      "Data annotation",
      "UI Development",
      "JSON",
      "Email Marketing",
    ],
    highlights: [
      "Developed and trained a Facial Video Detection AI model through dataset annotation, refinement, and performance optimization.",
      "Worked with JSON data structures and APIs for AI model integration.",
      "Designed and prototyped web pages in Figma to validate upcoming product features.",
      "Assisted user onboarding and outreach to gather product feedback.",
      "Handled Query Resolution Management (QRM) to resolve real user issues.",
    ],
  },
  {
    company: "Cisco Networking Academy",
    role: "Cisco AICTE Virtual Internship — Cybersecurity",
    period: "01 Jun 2025 – 01 Aug 2025",
    industry: "IT / Software",
    skills: ["Network Security", "Network Configuration", "Risk Assessment", "Cisco Packet Tracer"],
    highlights: [
      "Fundamentals of network security and the cyber threat landscape.",
      "Secure network design principles and risk mitigation.",
      "Firewalls, encryption, authentication, and access control.",
      "Ethical hacking basics and vulnerability assessment.",
      "Cyber hygiene practices and incident response awareness.",
    ],
  },
] as const;

export const projects = [
  {
    slug: "datapilot",
    name: "DataPilot",
    subtitle: "AI-powered dataset analysis & insight generation",
    mentor: "Dr. Pramod D. Ganjewar",
    team: 4,
    stack: ["FastAPI", "Pandas", "SQLite", "React (Vite)", "Plotly Express", "LLM APIs"],
    link: "https://github.com/tusharkkp/MPR2",
    description:
      "An LLM-powered analysis platform that lets users upload CSV/Excel datasets and receive AI-generated insights, visualizations, and contextual explanations.",
    features: [
      "Upload and analyze CSV / Excel datasets",
      "AI-driven insight generation using multiple LLM models",
      "Chat-based dataset Q&A with contextual memory",
      "Automated visualization generation (Plotly)",
      '"Show Thinking" mode to reveal reasoning and generated SQL',
      "Auto-generated analytical summary reports",
      "Multi-dataset comparison (planned)",
    ],
    architecture: [
      "Backend: Python FastAPI",
      "Data processing: Pandas",
      "Database engine: SQLite (in-memory SQL validation)",
      "Visualization: Plotly Express",
      "AI integration: multi-model LLM support",
      "Frontend: React (Vite)",
    ],
  },
  {
    slug: "karshakan-setu",
    name: "Karshakan Setu",
    subtitle: "AI farming guidance for Indian farmers",
    mentor: "Ms. Neha Hajare",
    team: 4,
    stack: ["React (Vite)", "Firebase Auth", "Firestore", "OpenWeather API", "Vertex AI (planned)"],
    link: "https://karshakan-setu-608d3.web.app/",
    description:
      'An AI-powered web platform providing intelligent, personalized farming guidance. Integrates user profile, weather, and activity logs to generate context-aware advisories through an assistant named "Sakhi".',
    features: [
      'Conversational AI assistant ("Sakhi") for real-time queries',
      "Activity logging for irrigation, spraying, fertilization, and crop cycles",
      "Weather-based advisory via OpenWeather API",
      "Profile-driven recommendations by farm type, location, and crop",
      "Secure auth and storage with Firebase Auth + Firestore",
      "Planned AI reasoning with confidence scoring",
    ],
    architecture: [
      "Frontend: React (Vite)",
      "Backend / DB: Firebase (Auth + Firestore)",
      "APIs: OpenWeather",
      "AI: Vertex AI (planned modular integration)",
    ],
  },
] as const;

export const skills = {
  Languages: ["Python", "JavaScript", "TypeScript"],
  "AI / ML": ["LLM integration", "Data annotation", "Model training", "Pandas", "NumPy", "SciPy"],
  Frontend: ["React", "Vite", "Tailwind CSS", "Figma (design)"],
  Backend: ["FastAPI", "Firebase Auth", "Firestore", "SQLite", "REST APIs", "JSON"],
  "Data & Viz": ["Plotly Express", "Matplotlib"],
  Security: ["Network Security", "Cisco Packet Tracer", "Risk Assessment"],
} as const;

export const leadership = [
  {
    role: "Technical Lead — ASSCET",
    period: "Current",
    org: "MIT Academy of Engineering",
    points: [
      "Leading technical planning and execution of department events including CODEX 2026.",
      "Designing and managing technical infrastructure for events.",
      "Overseeing digital assets, registrations, and technical workflows.",
      "Guiding junior members in technical problem-solving.",
    ],
  },
  {
    role: "Technical Co-Lead — PromptWars 2025",
    period: "2025",
    org: "ASSCET & IEEE Student Branch",
    points: [
      "Designed competition workflow across UI/UX, Responsive Websites, and Full-Stack Apps categories.",
      "Managed registration systems and digital infrastructure.",
      "Coordinated AI tool guidelines and problem deployment.",
      "Supervised the technical team during the live 2-hour challenge.",
    ],
  },
] as const;

export const achievements = [
  { title: "Datathon Winner", note: "" },
  { title: "Nirmaan 2.0 — 1st Runner Up", note: "" },
  { title: "Google Cloud Build & Grow — Finalist", note: "" },
  { title: "Ideathon Finalist", note: "" },
] as const;

export const certifications = [
  {
    name: "Python Essentials 1",
    provider: "Cisco Networking Academy",
    skills: ["Python", "Pandas", "NumPy", "SciPy", "Matplotlib"],
  },
  { name: "Python Essentials 2", provider: "Cisco Networking Academy", skills: ["Python"] },
  {
    name: "Introduction to Cybersecurity",
    provider: "Cisco Networking Academy",
    skills: ["Cybersecurity"],
  },
  {
    name: "Junior Cybersecurity Analyst Career Path",
    provider: "Cisco Networking Academy",
    skills: ["Cybersecurity Essentials"],
  },
  {
    name: "Introduction to Modern AI",
    provider: "Cisco Networking Academy",
    skills: ["Modern AI", "Data Science"],
  },
] as const;
