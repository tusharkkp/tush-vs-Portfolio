import { useMemo, useState } from "react";
import {
  Award,
  BookOpen,
  Bot,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  Trophy,
  Users,
} from "lucide-react";
import type { FileKey } from "@/components/workspace/Workspace";
import resumeAsset from "@/assets/resume.pdf.asset.json";
import {
  achievements,
  certifications,
  education,
  experience,
  leadership,
  profile,
  projects,
  skills,
} from "@/data/portfolio";
import { answerQuery, suggestions } from "@/data/knowledge";

/* -------------------------------- helpers -------------------------------- */

function EditorFrame({
  path,
  children,
  language = "md",
}: {
  path: string;
  children: React.ReactNode;
  language?: string;
}) {
  return (
    <article className="mx-auto max-w-5xl px-4 py-8 sm:px-8 sm:py-10">
      <div className="mb-6 flex items-center gap-2 font-mono text-xs text-muted-foreground">
        <span className="rounded bg-muted px-2 py-0.5 uppercase tracking-wider">{language}</span>
        <span>{path}</span>
      </div>
      {children}
    </article>
  );
}

function CodeBlock({ children }: { children: React.ReactNode }) {
  return (
    <pre className="overflow-auto rounded-lg border border-border bg-card p-4 font-mono text-[13px] leading-relaxed scrollbar-thin">
      {children}
    </pre>
  );
}

function LineNumbers({ lines }: { lines: React.ReactNode[] }) {
  return (
    <div className="overflow-auto rounded-lg border border-border bg-card font-mono text-[13px] scrollbar-thin">
      {lines.map((line, i) => (
        <div key={i} className="code-line px-4 py-0.5 hover:bg-muted/40">
          <span className="text-right text-line-number select-none">{i + 1}</span>
          <span>{line}</span>
        </div>
      ))}
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-4 font-mono text-sm uppercase tracking-widest text-primary">## {children}</h2>
  );
}

/* --------------------------------- About --------------------------------- */

export function AboutPanel({ onOpen }: { onOpen: (k: FileKey) => void }) {
  return (
    <EditorFrame path="about.md" language="markdown">
      {/* <div className="mb-8">
        <p className="font-mono text-sm text-syntax-comment">// welcome to my workspace</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          Hi, I'm <span className="text-primary">{profile.name}</span>
          <span className="caret ml-1" aria-hidden>
            _
          </span>
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          {profile.role} · Computer Engineering student at MIT Academy of Engineering, Pune. I build
          production-grade AI products end-to-end — data pipelines, LLM integrations, and thoughtful
          interfaces.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={() => onOpen("projects")}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            View projects
          </button>
          <a
            href={resumeAsset.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition hover:bg-muted"
          >
            <Download className="h-4 w-4" /> Resume
          </a>
          <button
            onClick={() => onOpen("assistant")}
            className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition hover:bg-muted"
          >
            <Bot className="h-4 w-4" /> Ask the AI
          </button>
        </div>
      </div> */}

      <div className="mb-8">
        <div className="grid items-center gap-8 lg:grid-cols-[220px_1fr]">
          {/* Profile photo */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative">
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 opacity-30 blur" />

              <img
                src="/tushar.jpg"
                alt="Tushar Kaldate"
                className="relative h-48 w-48 rounded-xl border border-border object-cover"
              />
            </div>
          </div>

          {/* About content */}
          <div>
            <p className="font-mono text-sm text-syntax-comment">// welcome to my workspace</p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
              Hi, I'm <span className="text-primary">{profile.name}</span>
              <span className="caret ml-1" aria-hidden>
                _
              </span>
            </h1>

            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              {profile.role} · Computer Engineering student at MIT Academy of Engineering, Pune.
            </p>

            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              I build production-grade AI products end-to-end — data pipelines, LLM integrations,
              and thoughtful interfaces.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => onOpen("projects")}
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
              >
                View projects
              </button>

              <a
                href={resumeAsset.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition hover:bg-muted"
              >
                <Download className="h-4 w-4" />
                Resume
              </a>

              <button
                onClick={() => onOpen("assistant")}
                className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition hover:bg-muted"
              >
                <Bot className="h-4 w-4" />
                Ask the AI
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <SectionHeading>readme</SectionHeading>
          <div className="rounded-lg border border-border bg-card p-5 text-sm leading-relaxed">
            About Me
            <p>
              TY Student at MIT Academy of Engineering, Pune (2024–2028). Focused on building
              production-grade AI products end-to-end — data pipelines, LLM integrations, and
              thoughtful interfaces. Based in {profile.location}.
            </p>
            <ul className="mt-4 space-y-2 text-muted-foreground">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" /> {profile.location}
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" /> {profile.email}
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" /> {profile.phone}
              </li>
            </ul>
          </div>
        </div>

        <div>
          <SectionHeading>education</SectionHeading>
          <ul className="space-y-3">
            {education.map((e) => (
              <li key={e.school} className="rounded-lg border border-border bg-card p-4">
                <div className="text-sm font-semibold">{e.school}</div>
                <div className="text-sm text-muted-foreground">{e.degree}</div>
                <div className="mt-1 font-mono text-xs text-primary">
                  {e.period} · {e.score}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </EditorFrame>
  );
}

/* -------------------------------- Projects ------------------------------- */

export function ProjectsPanel() {
  return (
    <EditorFrame path="projects.tsx" language="tsx">
      <SectionHeading>projects</SectionHeading>
      <p className="mb-6 max-w-2xl text-sm text-muted-foreground">
        Case studies built from real coursework and internships. Each shows the problem, approach,
        stack, and current state.
      </p>
      <div className="grid gap-6 lg:grid-cols-2">
        {projects.map((p) => (
          <article
            key={p.slug}
            className="flex flex-col rounded-xl border border-border bg-card p-6 transition hover:border-primary/60"
          >
            <header className="mb-3">
              <div className="font-mono text-[11px] uppercase tracking-wider text-primary">
                const project =
              </div>
              <h3 className="mt-1 text-xl font-semibold">{p.name}</h3>
              <p className="text-sm text-muted-foreground">{p.subtitle}</p>
            </header>
            <p className="text-sm leading-relaxed">{p.description}</p>

            <div className="mt-4">
              <div className="font-mono text-[11px] uppercase tracking-wider text-syntax-comment">
                // features
              </div>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                {p.features.slice(0, 5).map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4">
              <div className="font-mono text-[11px] uppercase tracking-wider text-syntax-comment">
                // architecture
              </div>
              <ul className="mt-2 grid gap-1 text-xs text-muted-foreground sm:grid-cols-2">
                {p.architecture.map((a) => (
                  <li key={a}>· {a}</li>
                ))}
              </ul>
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {p.stack.map((s) => (
                <span
                  key={s}
                  className="rounded border border-border bg-muted px-2 py-0.5 font-mono text-[11px]"
                >
                  {s}
                </span>
              ))}
            </div>

            <footer className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
              <span>
                Team of {p.team} · Mentor: {p.mentor}
              </span>
              <a
                href={p.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-primary hover:underline"
              >
                Visit <ExternalLink className="h-3 w-3" />
              </a>
            </footer>
          </article>
        ))}
      </div>
    </EditorFrame>
  );
}

/* ------------------------------- Experience ------------------------------ */

export function ExperiencePanel() {
  return (
    <EditorFrame path="experience.md" language="markdown">
      <SectionHeading>experience</SectionHeading>
      <ol className="relative space-y-6 border-l border-border pl-6">
        {experience.map((e) => (
          <li key={e.company} className="relative">
            <span className="absolute -left-[29px] top-1.5 h-3 w-3 rounded-full border-2 border-primary bg-background" />
            <div className="rounded-lg border border-border bg-card p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg font-semibold">
                  {e.role} <span className="text-muted-foreground">@ {e.company}</span>
                </h3>
                <div className="font-mono text-xs text-primary">{e.period}</div>
              </div>
              <div className="mt-0.5 text-xs text-muted-foreground">{e.industry}</div>
              <ul className="mt-3 space-y-1.5 text-sm">
                {e.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {e.skills.map((s) => (
                  <span
                    key={s}
                    className="rounded bg-muted px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </EditorFrame>
  );
}

/* --------------------------------- Skills -------------------------------- */

export function SkillsPanel() {
  const json = useMemo(() => {
    const lines: React.ReactNode[] = [];
    lines.push(
      <span key="0">
        <span className="text-syntax-keyword">const</span>{" "}
        <span className="text-syntax-fn">skills</span> = {"{"}
      </span>,
    );
    const entries = Object.entries(skills);
    entries.forEach(([cat, items], idx) => {
      lines.push(
        <span key={`c${idx}`}>
          {"  "}
          <span className="text-syntax-string">"{cat}"</span>: [
        </span>,
      );
      (items as readonly string[]).forEach((s, j) => {
        lines.push(
          <span key={`c${idx}-i${j}`}>
            {"    "}
            <span className="text-syntax-string">"{s}"</span>
            {j < (items as readonly string[]).length - 1 ? "," : ""}
          </span>,
        );
      });
      lines.push(
        <span key={`c${idx}-end`}>
          {"  "}]{idx < entries.length - 1 ? "," : ""}
        </span>,
      );
    });
    lines.push(<span key="end">{"}"};</span>);
    return lines;
  }, []);

  return (
    <EditorFrame path="skills.json" language="json">
      <SectionHeading>skills</SectionHeading>
      <p className="mb-4 text-sm text-muted-foreground">
        Grouped by area — no vanity progress bars, just what I actually work with.
      </p>
      <LineNumbers lines={json} />
    </EditorFrame>
  );
}

/* ------------------------------- Leadership ------------------------------ */

export function LeadershipPanel() {
  return (
    <EditorFrame path="leadership.md" language="markdown">
      <SectionHeading>leadership</SectionHeading>
      <ol className="relative space-y-6 border-l border-border pl-6">
        {leadership.map((l) => (
          <li key={l.role} className="relative">
            <span className="absolute -left-[29px] top-1.5 h-3 w-3 rounded-full border-2 border-accent bg-background" />
            <div className="rounded-lg border border-border bg-card p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg font-semibold">{l.role}</h3>
                <span className="font-mono text-xs text-accent">{l.period}</span>
              </div>
              <div className="mt-0.5 text-xs text-muted-foreground">
                <Users className="mr-1 inline h-3 w-3" /> {l.org}
              </div>
              <ul className="mt-3 space-y-1.5 text-sm">
                {l.points.map((p) => (
                  <li key={p} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </EditorFrame>
  );
}

/* ------------------------------- Hackathons ------------------------------ */

export function HackathonsPanel() {
  return (
    <EditorFrame path="hackathons.md" language="markdown">
      <SectionHeading>hackathons</SectionHeading>
      <div className="grid gap-4 sm:grid-cols-2">
        {achievements.map((a) => (
          <div
            key={a.title}
            className="flex items-start gap-3 rounded-lg border border-border bg-card p-5"
          >
            <Trophy className="h-5 w-5 shrink-0 text-primary" />
            <div>
              <div className="font-semibold">{a.title}</div>
              <div className="mt-1 text-xs text-muted-foreground">
                Competitive event · verified from resume
              </div>
            </div>
          </div>
        ))}
      </div>
    </EditorFrame>
  );
}

/* ------------------------------ Achievements ----------------------------- */

export function AchievementsPanel() {
  return (
    <EditorFrame path="achievements.md" language="markdown">
      <SectionHeading>achievements</SectionHeading>
      <ul className="grid gap-3 sm:grid-cols-2">
        {achievements.map((a) => (
          <li
            key={a.title}
            className="flex items-center gap-3 rounded-lg border border-border bg-card p-4"
          >
            <Award className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium">{a.title}</span>
          </li>
        ))}
      </ul>
    </EditorFrame>
  );
}

/* ----------------------------- Certifications ---------------------------- */

export function CertificationsPanel() {
  return (
    <EditorFrame path="certifications.md" language="markdown">
      <SectionHeading>certifications</SectionHeading>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((c) => (
          <article
            key={c.name}
            className="flex flex-col rounded-lg border border-border bg-card p-5"
          >
            <BookOpen className="h-5 w-5 text-primary" />
            <h3 className="mt-3 text-sm font-semibold">{c.name}</h3>
            <div className="mt-1 text-xs text-muted-foreground">{c.provider}</div>
            <div className="mt-3 flex flex-wrap gap-1">
              {c.skills.map((s) => (
                <span
                  key={s}
                  className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground"
                >
                  {s}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </EditorFrame>
  );
}

/* --------------------------------- GitHub -------------------------------- */

export function GitHubPanel() {
  const stats = [
    { label: "Username", value: `@${profile.github}` },
    { label: "Featured", value: "MPR2 (DataPilot)" },
    { label: "Languages", value: "Python, TypeScript, JavaScript" },
  ];
  return (
    <EditorFrame path="github.ts" language="ts">
      <SectionHeading>github</SectionHeading>
      <div className="mb-6 flex items-center justify-between rounded-lg border border-border bg-card p-5">
        <div className="flex items-center gap-3">
          <Github className="h-8 w-8 text-primary" />
          <div>
            <div className="text-lg font-semibold">@{profile.github}</div>
            <div className="text-xs text-muted-foreground">Open source & coursework projects</div>
          </div>
        </div>
        <a
          href={profile.githubUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground"
        >
          Visit <ExternalLink className="h-3 w-3" />
        </a>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-lg border border-border bg-card p-4">
            <div className="font-mono text-[11px] uppercase tracking-wider text-syntax-comment">
              // {s.label}
            </div>
            <div className="mt-1 text-sm font-medium">{s.value}</div>
          </div>
        ))}
      </div>

      <SectionHeading>pinned</SectionHeading>
      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((p) => (
          <a
            key={p.slug}
            href={p.link}
            target="_blank"
            rel="noreferrer"
            className="block rounded-lg border border-border bg-card p-5 transition hover:border-primary/60"
          >
            <div className="flex items-center gap-2">
              <Github className="h-4 w-4 text-primary" />
              <span className="font-mono text-sm font-semibold">{p.name}</span>
            </div>
            <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{p.subtitle}</p>
            <div className="mt-3 flex flex-wrap gap-1">
              {p.stack.slice(0, 4).map((s) => (
                <span
                  key={s}
                  className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground"
                >
                  {s}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </EditorFrame>
  );
}

/* --------------------------------- Resume -------------------------------- */

export function ResumePanel() {
  return (
    <EditorFrame path="resume.pdf" language="pdf">
      <SectionHeading>resume</SectionHeading>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          Full resume with education, internships, projects, achievements, and certifications.
        </p>
        <a
          href={resumeAsset.url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
        >
          <Download className="h-4 w-4" /> Download PDF
        </a>
      </div>
      <div className="overflow-hidden rounded-lg border border-border bg-card">
        <object
          data={resumeAsset.url}
          type="application/pdf"
          className="h-[75vh] w-full"
          aria-label="Tushar Kaldate resume PDF preview"
        >
          <div className="p-6 text-sm text-muted-foreground">
            Your browser can't preview PDFs inline.{" "}
            <a
              href={resumeAsset.url}
              className="text-primary underline"
              target="_blank"
              rel="noreferrer"
            >
              Open the resume in a new tab
            </a>
            .
          </div>
        </object>
      </div>
    </EditorFrame>
  );
}

/* ---------------------------------- Blog --------------------------------- */

export function BlogPanel() {
  return (
    <EditorFrame path="blog.md" language="markdown">
      <SectionHeading>blog</SectionHeading>
      <ComingSoon
        title="Blog is coming soon"
        body="Faaaaaaaaaaaaaaaaaaaaaah ! I haven't written a blog yet. Check back shortly........."
      />
    </EditorFrame>
  );
}

export function TestimonialsPanel() {
  return (
    <EditorFrame path="testimonials.md" language="markdown">
      <SectionHeading>testimonials</SectionHeading>
      <ComingSoon
        title="Testimonials are coming soon"
        body="I'm collecting feedback from mentors, teammates, and instructors. Check back shortly........."
      />
    </EditorFrame>
  );
}

function ComingSoon({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-lg border border-dashed border-border bg-card p-8 text-center">
      <Clock className="mx-auto h-8 w-8 text-primary" />
      <h3 className="mt-3 text-lg font-semibold">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">{body}</p>
    </div>
  );
}

/* -------------------------------- Assistant ------------------------------ */

type ChatMessage = { role: "user" | "assistant"; title?: string; content: string };

export function AssistantPanel() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      title: "Portfolio Assistant",
      content:
        "Hi — I answer only from Tushar's verified resume and portfolio. I won't guess. Try a suggestion below or ask about projects, skills, or experience.",
    },
  ]);
  const [input, setInput] = useState("");

  const send = (raw: string) => {
    const q = raw.trim();
    if (!q) return;
    const ans = answerQuery(q);
    setMessages((m) => [
      ...m,
      { role: "user", content: q },
      { role: "assistant", title: ans.title, content: ans.body },
    ]);
    setInput("");
  };

  return (
    <EditorFrame path="assistant.ai" language="ai">
      <SectionHeading>ai assistant</SectionHeading>
      <p className="mb-4 max-w-2xl text-sm text-muted-foreground">
        A deterministic assistant grounded in Tushar's resume. It matches your question to verified
        facts — never a language model hallucination.
      </p>

      <div className="rounded-xl border border-border bg-card">
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <Bot className="h-4 w-4 text-primary" />
          <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            portfolio-assistant.local
          </span>
          <span className="ml-auto flex items-center gap-1 text-[11px] text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" /> online
          </span>
        </div>

        <div className="max-h-[45vh] overflow-auto p-4 scrollbar-thin">
          <ul className="space-y-4">
            {messages.map((m, i) => (
              <li key={i} className="flex gap-3">
                <div
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md font-mono text-[10px] ${
                    m.role === "assistant"
                      ? "bg-primary/15 text-primary"
                      : "bg-accent/15 text-accent"
                  }`}
                >
                  {m.role === "assistant" ? "AI" : "You"}
                </div>
                <div className="min-w-0 flex-1">
                  {m.title && (
                    <div className="font-mono text-[11px] uppercase tracking-wider text-syntax-comment">
                      // {m.title}
                    </div>
                  )}
                  <div className="mt-1 whitespace-pre-wrap text-sm leading-relaxed">
                    {m.content}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-border p-3">
          <div className="mb-3 flex flex-wrap gap-1.5">
            {suggestions.slice(0, 6).map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="rounded-full border border-border bg-muted px-2.5 py-1 text-[11px] text-muted-foreground transition hover:border-primary hover:text-foreground"
              >
                {s}
              </button>
            ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2"
          >
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about projects, skills, experience…"
              aria-label="Ask the AI assistant"
              className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-1 rounded-md bg-primary px-3 py-2 text-xs font-medium text-primary-foreground transition hover:opacity-90"
            >
              <Send className="h-3.5 w-3.5" /> Send
            </button>
          </form>
        </div>
      </div>
    </EditorFrame>
  );
}

/* -------------------------------- Contact -------------------------------- */

export function ContactPanel() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <EditorFrame path="contact.tsx" language="tsx">
      <SectionHeading>contact</SectionHeading>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="text-lg font-semibold">Let's talk</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Internship offers, collaborations, or a quick question — I read everything.
          </p>
          <ul className="mt-5 space-y-3 text-sm">
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-primary" />
              <a className="hover:underline" href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-primary" />
              <a className="hover:underline" href={`tel:${profile.phone}`}>
                {profile.phone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Linkedin className="h-4 w-4 text-primary" />
              <a
                className="hover:underline"
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Github className="h-4 w-4 text-primary" />
              <a
                className="hover:underline"
                href={profile.githubUrl}
                target="_blank"
                rel="noreferrer"
              >
                github.com/{profile.github}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-primary" />
              <span>{profile.location}</span>
            </li>
          </ul>
        </div>

        <form onSubmit={submit} className="rounded-xl border border-border bg-card p-6">
          <label className="block text-xs font-mono uppercase tracking-wider text-muted-foreground">
            name
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
            />
          </label>
          <label className="mt-4 block text-xs font-mono uppercase tracking-wider text-muted-foreground">
            email
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
            />
          </label>
          <label className="mt-4 block text-xs font-mono uppercase tracking-wider text-muted-foreground">
            message
            <textarea
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
            />
          </label>
          <button
            type="submit"
            className="mt-5 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            <Send className="h-4 w-4" /> Send message
          </button>
          {sent && (
            <p className="mt-3 text-xs text-primary">
              Opening your email client… if nothing opens, email me directly.
            </p>
          )}
        </form>
      </div>
    </EditorFrame>
  );
}
