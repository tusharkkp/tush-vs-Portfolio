// Deterministic Q&A knowledge base for the AI Assistant panel.
// No LLM calls — answers are matched from resume-derived facts only.
// If a query does not match, the assistant refuses gracefully.

import {
  achievements,
  certifications,
  education,
  experience,
  leadership,
  profile,
  projects,
  skills,
} from "./portfolio";

type Answer = { title: string; body: string };

type Rule = {
  id: string;
  keywords: string[];
  suggestion: string;
  answer: () => Answer;
};

const list = (items: readonly string[]) => items.map((x) => `• ${x}`).join("\n");

export const suggestions = [
  "What projects has Tushar built?",
  "Tell me about DataPilot",
  "What is Karshakan Setu?",
  "What internships has he done?",
  "What are his top skills?",
  "What has he won?",
  "How can I contact him?",
  "Where does he study?",
  "What leadership roles does he hold?",
  "Which certifications does he have?",
];

const rules: Rule[] = [
  {
    id: "projects",
    keywords: ["project", "projects", "built", "portfolio"],
    suggestion: "What projects has Tushar built?",
    answer: () => ({
      title: "Projects",
      body: projects.map((p) => `${p.name} — ${p.subtitle}\n${p.description}`).join("\n\n"),
    }),
  },
  {
    id: "datapilot",
    keywords: ["datapilot", "data pilot", "dataset", "csv"],
    suggestion: "Tell me about DataPilot",
    answer: () => {
      const p = projects[0];
      return {
        title: p.name,
        body: `${p.description}\n\nFeatures:\n${list(p.features)}\n\nStack:\n${list(p.stack)}\n\nLink: ${p.link}`,
      };
    },
  },
  {
    id: "karshakan",
    keywords: ["karshakan", "setu", "farm", "farming", "sakhi", "agriculture"],
    suggestion: "What is Karshakan Setu?",
    answer: () => {
      const p = projects[1];
      return {
        title: p.name,
        body: `${p.description}\n\nFeatures:\n${list(p.features)}\n\nStack:\n${list(p.stack)}\n\nLink: ${p.link}`,
      };
    },
  },
  {
    id: "experience",
    keywords: ["intern", "internship", "experience", "work", "preskilet", "cisco"],
    suggestion: "What internships has he done?",
    answer: () => ({
      title: "Internships",
      body: experience
        .map((e) => `${e.role} @ ${e.company} (${e.period})\n${list(e.highlights)}`)
        .join("\n\n"),
    }),
  },
  {
    id: "skills",
    keywords: ["skill", "skills", "tech", "stack", "technologies"],
    suggestion: "What are his top skills?",
    answer: () => ({
      title: "Skills",
      body: Object.entries(skills)
        .map(([cat, items]) => `${cat}: ${(items as readonly string[]).join(", ")}`)
        .join("\n"),
    }),
  },
  {
    id: "achievements",
    keywords: ["achievement", "won", "winner", "hackathon", "award", "award"],
    suggestion: "What has he won?",
    answer: () => ({
      title: "Achievements",
      body: list(achievements.map((a) => a.title)),
    }),
  },
  {
    id: "contact",
    keywords: ["contact", "email", "reach", "hire", "phone", "linkedin"],
    suggestion: "How can I contact him?",
    answer: () => ({
      title: "Contact",
      body: `Email: ${profile.email}\nAlt: ${profile.emailAlt}\nPhone: ${profile.phone}\nLinkedIn: ${profile.linkedin}\nGitHub: ${profile.githubUrl}`,
    }),
  },
  {
    id: "education",
    keywords: ["education", "study", "college", "school", "cgpa", "university"],
    suggestion: "Where does he study?",
    answer: () => ({
      title: "Education",
      body: education.map((e) => `${e.school} — ${e.degree} (${e.period}) · ${e.score}`).join("\n"),
    }),
  },
  {
    id: "leadership",
    keywords: ["lead", "leadership", "asscet", "promptwars", "role", "position"],
    suggestion: "What leadership roles does he hold?",
    answer: () => ({
      title: "Leadership",
      body: leadership
        .map((l) => `${l.role} (${l.org}, ${l.period})\n${list(l.points)}`)
        .join("\n\n"),
    }),
  },
  {
    id: "certs",
    keywords: ["cert", "certification", "certificate", "cisco academy"],
    suggestion: "Which certifications does he have?",
    answer: () => ({
      title: "Certifications",
      body: list(certifications.map((c) => `${c.name} — ${c.provider}`)),
    }),
  },
  {
    id: "about",
    keywords: ["who", "about", "tushar", "yourself", "intro", "introduce"],
    suggestion: "Who is Tushar?",
    answer: () => ({
      title: "About Tushar",
      body: `${profile.fullName} is a B.Tech Computer Engineering student at MIT Academy of Engineering, Pune (2024–2028), focused on building production-grade AI products. Based in ${profile.location}.`,
    }),
  },
];

export function answerQuery(query: string): Answer {
  const q = query.toLowerCase().trim();
  if (!q) {
    return { title: "Ask me anything about Tushar", body: "Try one of the suggested prompts." };
  }
  const match = rules.find((r) => r.keywords.some((k) => q.includes(k)));
  if (!match) {
    return {
      title: "I don't have that info",
      body: "I only answer from Tushar's verified resume and portfolio content — I won't guess. Try asking about projects, internships, skills, achievements, education, leadership, certifications, or contact.",
    };
  }
  return match.answer();
}
