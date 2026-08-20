import { useEffect, useMemo, useRef, useState } from "react";
import {
  ChevronRight,
  ChevronDown,
  FileCode2,
  FileText,
  Folder,
  FolderOpen,
  Github,
  Linkedin,
  Mail,
  Terminal as TerminalIcon,
  X,
  Files,
  Search,
  GitBranch,
  Bot,
  Circle,
  Sun,
  Moon,
  PanelLeftClose,
  PanelLeftOpen,
  ExternalLink,
} from "lucide-react";
import { profile } from "@/data/portfolio";
import {
  AboutPanel,
  ProjectsPanel,
  ExperiencePanel,
  SkillsPanel,
  LeadershipPanel,
  HackathonsPanel,
  AchievementsPanel,
  CertificationsPanel,
  GitHubPanel,
  ResumePanel,
  BlogPanel,
  TestimonialsPanel,
  AssistantPanel,
  ContactPanel,
} from "@/components/panels/Panels";

export type FileKey =
  | "about"
  | "projects"
  | "experience"
  | "skills"
  | "leadership"
  | "hackathons"
  | "achievements"
  | "certifications"
  | "github"
  | "resume"
  | "blog"
  | "testimonials"
  | "assistant"
  | "contact";

type FileMeta = {
  key: FileKey;
  name: string;
  icon: typeof FileCode2;
  language: string;
  soon?: boolean;
};

const FILES: FileMeta[] = [
  { key: "about", name: "about.md", icon: FileText, language: "markdown" },
  { key: "projects", name: "projects.tsx", icon: FileCode2, language: "tsx" },
  { key: "experience", name: "experience.md", icon: FileText, language: "markdown" },
  { key: "skills", name: "skills.json", icon: FileCode2, language: "json" },
  { key: "leadership", name: "leadership.md", icon: FileText, language: "markdown" },
  { key: "hackathons", name: "hackathons.md", icon: FileText, language: "markdown" },
  { key: "achievements", name: "achievements.md", icon: FileText, language: "markdown" },
  { key: "certifications", name: "certifications.md", icon: FileText, language: "markdown" },
  { key: "github", name: "github.ts", icon: FileCode2, language: "ts" },
  { key: "resume", name: "resume.pdf", icon: FileText, language: "pdf" },
  { key: "blog", name: "blog.md", icon: FileText, language: "markdown", soon: true },
  { key: "testimonials", name: "testimonials.md", icon: FileText, language: "markdown", soon: true },
  { key: "assistant", name: "assistant.ai", icon: Bot, language: "ai" },
  { key: "contact", name: "contact.tsx", icon: FileCode2, language: "tsx" },
];

const FILE_MAP: Record<FileKey, FileMeta> = Object.fromEntries(
  FILES.map((f) => [f.key, f]),
) as Record<FileKey, FileMeta>;

function useTheme() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("light", theme === "light");
    root.classList.toggle("dark", theme === "dark");
  }, [theme]);
  return { theme, setTheme };
}

export function Workspace() {
  const [openTabs, setOpenTabs] = useState<FileKey[]>(["about"]);
  const [activeTab, setActiveTab] = useState<FileKey>("about");
  const [explorerOpen, setExplorerOpen] = useState(true);
  const [terminalOpen, setTerminalOpen] = useState(true);
  const [portfolioOpen, setPortfolioOpen] = useState(true);
  const [comingSoonOpen, setComingSoonOpen] = useState(true);
  const { theme, setTheme } = useTheme();

  const openFile = (key: FileKey) => {
    setOpenTabs((tabs) => (tabs.includes(key) ? tabs : [...tabs, key]));
    setActiveTab(key);
  };

  const closeTab = (key: FileKey) => {
    setOpenTabs((tabs) => {
      const idx = tabs.indexOf(key);
      const next = tabs.filter((t) => t !== key);
      if (key === activeTab) {
        const fallback = next[idx] ?? next[idx - 1] ?? next[0];
        if (fallback) setActiveTab(fallback);
      }
      return next;
    });
  };

  return (
    <div className="flex h-dvh w-full flex-col overflow-hidden bg-background text-foreground">
      <TopBar
        theme={theme}
        onToggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")}
        explorerOpen={explorerOpen}
        onToggleExplorer={() => setExplorerOpen((v) => !v)}
        terminalOpen={terminalOpen}
        onToggleTerminal={() => setTerminalOpen((v) => !v)}
      />

      <div className="flex min-h-0 flex-1">
        <ActivityBar
          explorerOpen={explorerOpen}
          onToggleExplorer={() => setExplorerOpen((v) => !v)}
          onOpenAssistant={() => openFile("assistant")}
          onOpenGithub={() => openFile("github")}
        />
        {explorerOpen && (
          <Explorer
            active={activeTab}
            openTabs={openTabs}
            onOpen={openFile}
            portfolioOpen={portfolioOpen}
            comingSoonOpen={comingSoonOpen}
            onTogglePortfolio={() => setPortfolioOpen((v) => !v)}
            onToggleComingSoon={() => setComingSoonOpen((v) => !v)}
          />
        )}
        <main className="flex min-w-0 flex-1 flex-col">
          <TabBar
            openTabs={openTabs}
            active={activeTab}
            onSelect={setActiveTab}
            onClose={closeTab}
          />
          <Breadcrumbs active={activeTab} />
          <div className="min-h-0 flex-1 overflow-auto bg-editor scrollbar-thin">
            <EditorSurface activeTab={activeTab} onOpen={openFile} />
          </div>
          {terminalOpen && <Terminal onClose={() => setTerminalOpen(false)} onOpen={openFile} />}
        </main>
      </div>
      <StatusBar
        activeTab={activeTab}
        onToggleTerminal={() => setTerminalOpen((v) => !v)}
        terminalOpen={terminalOpen}
      />
    </div>
  );
}

const MENUS: { label: string; items: { label: string; shortcut?: string; disabled?: boolean }[] }[] = [
  {
    label: "File",
    items: [
      { label: "New File", shortcut: "⌘N", disabled: true },
      { label: "Open Folder…", shortcut: "⌘O", disabled: true },
      { label: "Save", shortcut: "⌘S", disabled: true },
      { label: "Close Editor", shortcut: "⌘W", disabled: true },
      { label: "Exit", disabled: true },
    ],
  },
  {
    label: "Edit",
    items: [
      { label: "Undo", shortcut: "⌘Z", disabled: true },
      { label: "Redo", shortcut: "⇧⌘Z", disabled: true },
      { label: "Cut", shortcut: "⌘X", disabled: true },
      { label: "Copy", shortcut: "⌘C", disabled: true },
      { label: "Paste", shortcut: "⌘V", disabled: true },
      { label: "Find", shortcut: "⌘F", disabled: true },
    ],
  },
  {
    label: "Selection",
    items: [
      { label: "Select All", shortcut: "⌘A", disabled: true },
      { label: "Expand Selection", disabled: true },
      { label: "Add Cursor Above", disabled: true },
    ],
  },
  {
    label: "View",
    items: [
      { label: "Command Palette…", shortcut: "⇧⌘P", disabled: true },
      { label: "Explorer", shortcut: "⇧⌘E", disabled: true },
      { label: "Search", shortcut: "⇧⌘F", disabled: true },
      { label: "Source Control", shortcut: "⌃⇧G", disabled: true },
      { label: "Toggle Word Wrap", shortcut: "⌥Z", disabled: true },
    ],
  },
  {
    label: "Go",
    items: [
      { label: "Go to File…", shortcut: "⌘P", disabled: true },
      { label: "Go to Symbol…", shortcut: "⇧⌘O", disabled: true },
      { label: "Back", disabled: true },
      { label: "Forward", disabled: true },
    ],
  },
  {
    label: "Run",
    items: [
      { label: "Start Debugging", shortcut: "F5", disabled: true },
      { label: "Run Without Debugging", shortcut: "⌃F5", disabled: true },
      { label: "Stop", shortcut: "⇧F5", disabled: true },
    ],
  },
  {
    label: "Terminal",
    items: [
      { label: "New Terminal", shortcut: "⌃`", disabled: true },
      { label: "Split Terminal", disabled: true },
      { label: "Kill Terminal", disabled: true },
    ],
  },
  {
    label: "Help",
    items: [
      { label: "Welcome", disabled: true },
      { label: "Documentation", disabled: true },
      { label: "About Portfolio", disabled: true },
    ],
  },
];

function TopBar({
  theme,
  onToggleTheme,
  explorerOpen,
  onToggleExplorer,
  terminalOpen,
  onToggleTerminal,
}: {
  theme: "dark" | "light";
  onToggleTheme: () => void;
  explorerOpen: boolean;
  onToggleExplorer: () => void;
  terminalOpen: boolean;
  onToggleTerminal: () => void;
}) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  useEffect(() => {
    if (!openMenu) return;
    const close = () => setOpenMenu(null);
    window.addEventListener("click", close);
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setOpenMenu(null);
    });
    return () => window.removeEventListener("click", close);
  }, [openMenu]);

  const toggleBtn =
    "flex h-6 w-7 items-center justify-center rounded text-muted-foreground hover:bg-muted hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring";

  return (
    <header className="relative flex h-9 shrink-0 items-center justify-between border-b border-border bg-activitybar px-3 text-xs">
      {/* Left: traffic lights + menu bar */}
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-destructive/80" aria-hidden />
          <span className="h-2.5 w-2.5 rounded-full bg-syntax-number/80" aria-hidden />
          <span className="h-2.5 w-2.5 rounded-full bg-syntax-type/80" aria-hidden />
        </div>
        <nav aria-label="Menu bar" className="hidden items-center md:flex">
          {MENUS.map((m) => {
            const active = openMenu === m.label;
            return (
              <div key={m.label} className="relative">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenMenu(active ? null : m.label);
                  }}
                  onMouseEnter={() => openMenu && setOpenMenu(m.label)}
                  className={`px-2 py-1 font-sans text-[12px] transition-colors ${
                    active
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                  aria-haspopup="menu"
                  aria-expanded={active}
                >
                  {m.label}
                </button>
                {active && (
                  <div
                    role="menu"
                    onClick={(e) => e.stopPropagation()}
                    className="absolute left-0 top-full z-50 mt-0.5 w-64 rounded-md border border-border bg-popover py-1 text-popover-foreground shadow-xl"
                  >
                    {m.items.map((it) => (
                      <div
                        key={it.label}
                        role="menuitem"
                        aria-disabled={it.disabled}
                        className={`flex items-center justify-between px-3 py-1 text-[12px] ${
                          it.disabled
                            ? "text-muted-foreground/60"
                            : "text-foreground hover:bg-muted"
                        }`}
                      >
                        <span>{it.label}</span>
                        {it.shortcut && (
                          <span className="font-mono text-[10px] text-muted-foreground">
                            {it.shortcut}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
        <span className="ml-2 hidden truncate font-mono text-muted-foreground lg:inline">
          tushar-kaldate — workspace
        </span>
      </div>

      {/* Right: layout toggles + theme */}
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={onToggleExplorer}
          className={`${toggleBtn} ${explorerOpen ? "text-foreground" : ""}`}
          aria-label={explorerOpen ? "Hide sidebar" : "Show sidebar"}
          title="Toggle Primary Side Bar"
        >
          {explorerOpen ? (
            <PanelLeftClose className="h-3.5 w-3.5" />
          ) : (
            <PanelLeftOpen className="h-3.5 w-3.5" />
          )}
        </button>
        <button
          type="button"
          onClick={onToggleTerminal}
          className={`${toggleBtn} ${terminalOpen ? "text-foreground" : ""}`}
          aria-label={terminalOpen ? "Hide panel" : "Show panel"}
          title="Toggle Panel"
        >
          <TerminalIcon className="h-3.5 w-3.5" />
        </button>
        <span className="mx-1 h-4 w-px bg-border" aria-hidden />
        <button
          type="button"
          onClick={onToggleTheme}
          className="flex items-center gap-1.5 rounded px-2 py-1 text-muted-foreground hover:bg-muted hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
        >
          {theme === "dark" ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
          <span className="hidden sm:inline">{theme === "dark" ? "Light" : "Dark"}</span>
        </button>
      </div>
    </header>
  );
}

function ActivityBar({
  explorerOpen,
  onToggleExplorer,
  onOpenAssistant,
  onOpenGithub,
}: {
  explorerOpen: boolean;
  onToggleExplorer: () => void;
  onOpenAssistant: () => void;
  onOpenGithub: () => void;
}) {
  const btn =
    "flex h-11 w-11 items-center justify-center text-muted-foreground hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring";
  return (
    <nav
      aria-label="Activity bar"
      className="flex w-12 shrink-0 flex-col items-center justify-between border-r border-border bg-activitybar py-2"
    >
      <div className="flex flex-col">
        <button
          className={`${btn} ${explorerOpen ? "text-foreground" : ""}`}
          onClick={onToggleExplorer}
          aria-label="Toggle explorer"
          title="Explorer"
        >
          <Files className="h-5 w-5" />
        </button>
        <button className={btn} aria-label="Search (not enabled)" title="Search" disabled>
          <Search className="h-5 w-5 opacity-50" />
        </button>
        <button
          className={btn}
          onClick={onOpenGithub}
          aria-label="Open GitHub tab"
          title="Source control"
        >
          <GitBranch className="h-5 w-5" />
        </button>
        <button className={btn} onClick={onOpenAssistant} aria-label="Open AI assistant" title="AI Assistant">
          <Bot className="h-5 w-5" />
        </button>
      </div>
      <div className="flex flex-col">
        <a
          className={btn}
          href={profile.githubUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub profile"
        >
          <Github className="h-5 w-5" />
        </a>
        <a
          className={btn}
          href={profile.linkedin}
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn profile"
        >
          <Linkedin className="h-5 w-5" />
        </a>
      </div>
    </nav>
  );
}

function Explorer({
  active,
  onOpen,
  portfolioOpen,
  comingSoonOpen,
  onTogglePortfolio,
  onToggleComingSoon,
}: {
  active: FileKey;
  openTabs: FileKey[];
  onOpen: (k: FileKey) => void;
  portfolioOpen: boolean;
  comingSoonOpen: boolean;
  onTogglePortfolio: () => void;
  onToggleComingSoon: () => void;
}) {
  const primary: FileKey[] = [
    "about",
    "projects",
    "experience",
    "skills",
    "leadership",
    "hackathons",
    "achievements",
    "certifications",
    "github",
    "resume",
    "assistant",
    "contact",
  ];
  const soon: FileKey[] = ["blog", "testimonials"];
  return (
    <aside
      aria-label="Explorer"
      className="hidden w-64 shrink-0 flex-col border-r border-border bg-sidebar md:flex"
    >
      <div className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        Explorer
      </div>
      <div className="flex-1 overflow-auto scrollbar-thin pb-4 text-sm">
        <FolderRow open={portfolioOpen} onToggle={onTogglePortfolio} label="tushar-portfolio" />
        {portfolioOpen && (
          <ul className="pb-2">
            {primary.map((key) => (
              <FileRow key={key} meta={FILE_MAP[key]} active={active === key} onOpen={() => onOpen(key)} />
            ))}
          </ul>
        )}
        <FolderRow open={comingSoonOpen} onToggle={onToggleComingSoon} label="coming-soon" />
        {comingSoonOpen && (
          <ul>
            {soon.map((key) => (
              <FileRow key={key} meta={FILE_MAP[key]} active={active === key} onOpen={() => onOpen(key)} />
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
}

function FolderRow({ open, onToggle, label }: { open: boolean; onToggle: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex w-full items-center gap-1 px-2 py-1 text-left text-xs font-medium text-foreground/90 hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {open ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
      {open ? <FolderOpen className="h-4 w-4 text-primary" /> : <Folder className="h-4 w-4 text-primary" />}
      <span className="font-mono">{label}</span>
    </button>
  );
}

function FileRow({
  meta,
  active,
  onOpen,
}: {
  meta: FileMeta;
  active: boolean;
  onOpen: () => void;
}) {
  const Icon = meta.icon;
  return (
    <li>
      <button
        type="button"
        onClick={onOpen}
        aria-current={active ? "page" : undefined}
        className={`flex w-full items-center gap-2 px-6 py-1 text-left font-mono text-[13px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
          active ? "bg-tab-active text-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
        }`}
      >
        <Icon className="h-3.5 w-3.5 shrink-0 text-primary/80" />
        <span className="truncate">{meta.name}</span>
        {meta.soon && (
          <span className="ml-auto rounded bg-accent/20 px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-accent">
            soon
          </span>
        )}
      </button>
    </li>
  );
}

function TabBar({
  openTabs,
  active,
  onSelect,
  onClose,
}: {
  openTabs: FileKey[];
  active: FileKey;
  onSelect: (k: FileKey) => void;
  onClose: (k: FileKey) => void;
}) {
  return (
    <div className="flex h-9 shrink-0 items-stretch overflow-x-auto border-b border-border bg-tabbar scrollbar-thin">
      {openTabs.map((key) => {
        const meta = FILE_MAP[key];
        const Icon = meta.icon;
        const isActive = key === active;
        return (
          <div
            key={key}
            className={`group flex items-center gap-2 border-r border-border px-3 font-mono text-xs ${
              isActive ? "bg-tab-active text-foreground" : "text-muted-foreground hover:bg-muted"
            }`}
          >
            <button
              onClick={() => onSelect(key)}
              className="flex items-center gap-2 focus:outline-none"
              aria-label={`Focus ${meta.name}`}
            >
              <Icon className="h-3.5 w-3.5 text-primary/80" />
              <span>{meta.name}</span>
            </button>
            <button
              onClick={() => onClose(key)}
              aria-label={`Close ${meta.name}`}
              className="rounded p-0.5 opacity-0 hover:bg-muted-foreground/10 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        );
      })}
    </div>
  );
}

function Breadcrumbs({ active }: { active: FileKey }) {
  const meta = FILE_MAP[active];
  return (
    <div className="flex h-7 shrink-0 items-center gap-1 border-b border-border bg-editor px-4 font-mono text-[11px] text-muted-foreground">
      <span>tushar-portfolio</span>
      <ChevronRight className="h-3 w-3" />
      <span className="text-foreground/80">{meta.name}</span>
    </div>
  );
}

function EditorSurface({ activeTab, onOpen }: { activeTab: FileKey; onOpen: (k: FileKey) => void }) {
  switch (activeTab) {
    case "about":
      return <AboutPanel onOpen={onOpen} />;
    case "projects":
      return <ProjectsPanel />;
    case "experience":
      return <ExperiencePanel />;
    case "skills":
      return <SkillsPanel />;
    case "leadership":
      return <LeadershipPanel />;
    case "hackathons":
      return <HackathonsPanel />;
    case "achievements":
      return <AchievementsPanel />;
    case "certifications":
      return <CertificationsPanel />;
    case "github":
      return <GitHubPanel />;
    case "resume":
      return <ResumePanel />;
    case "blog":
      return <BlogPanel />;
    case "testimonials":
      return <TestimonialsPanel />;
    case "assistant":
      return <AssistantPanel />;
    case "contact":
      return <ContactPanel />;
  }
}

function Terminal({ onClose, onOpen }: { onClose: () => void; onOpen: (k: FileKey) => void }) {
  const [history, setHistory] = useState<{ cmd: string; out: string }[]>([
    {
      cmd: "whoami",
      out: `${profile.fullName} — ${profile.role} · ${profile.location}`,
    },
  ]);
  const [value, setValue] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [history]);

  const run = (raw: string) => {
    const cmd = raw.trim();
    if (!cmd) return;
    let out = "";
    const [head, ...rest] = cmd.split(/\s+/);
    switch (head) {
      case "help":
        out = "commands: help, whoami, ls, open <file>, contact, clear";
        break;
      case "whoami":
        out = `${profile.fullName} — ${profile.role}`;
        break;
      case "ls":
        out = FILES.map((f) => f.name).join("  ");
        break;
      case "contact":
        out = `${profile.email}  |  ${profile.linkedin}`;
        break;
      case "clear":
        setHistory([]);
        setValue("");
        return;
      case "open": {
        const target = rest.join(" ").replace(/\.[a-z]+$/, "");
        const match = FILES.find((f) => f.key === target || f.name === rest.join(" "));
        if (match) {
          onOpen(match.key);
          out = `opened ${match.name}`;
        } else {
          out = `not found: ${rest.join(" ")}`;
        }
        break;
      }
      default:
        out = `zsh: command not found: ${head}`;
    }
    setHistory((h) => [...h, { cmd, out }]);
    setValue("");
  };

  return (
    <section
      aria-label="Terminal"
      className="flex h-48 shrink-0 flex-col border-t border-border bg-terminal"
    >
      <header className="flex h-8 items-center justify-between border-b border-border px-3 text-xs">
        <div className="flex items-center gap-2 text-muted-foreground">
          <TerminalIcon className="h-3.5 w-3.5" />
          <span className="font-mono uppercase tracking-wider">terminal</span>
        </div>
        <button
          onClick={onClose}
          aria-label="Hide terminal"
          className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </header>
      <div ref={listRef} className="flex-1 overflow-auto p-3 font-mono text-xs leading-relaxed scrollbar-thin">
        {history.map((h, i) => (
          <div key={i} className="mb-2">
            <div>
              <span className="text-syntax-fn">tushar@portfolio</span>
              <span className="text-muted-foreground">:</span>
              <span className="text-syntax-type">~</span>
              <span className="text-muted-foreground">$ </span>
              <span>{h.cmd}</span>
            </div>
            <div className="whitespace-pre-wrap text-foreground/80">{h.out}</div>
          </div>
        ))}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            run(value);
          }}
          className="flex items-center gap-1"
        >
          <span className="text-syntax-fn">tushar@portfolio</span>
          <span className="text-muted-foreground">:</span>
          <span className="text-syntax-type">~</span>
          <span className="text-muted-foreground">$</span>
          <input
            aria-label="Terminal input"
            className="flex-1 bg-transparent outline-none"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="type 'help'"
            autoComplete="off"
            spellCheck={false}
          />
        </form>
      </div>
    </section>
  );
}

function StatusBar({
  activeTab,
  onToggleTerminal,
  terminalOpen,
}: {
  activeTab: FileKey;
  onToggleTerminal: () => void;
  terminalOpen: boolean;
}) {
  const meta = FILE_MAP[activeTab];
  return (
    <footer className="flex h-6 shrink-0 items-center justify-between bg-statusbar px-3 font-mono text-[11px] text-statusbar-foreground">
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1">
          <GitBranch className="h-3 w-3" /> main
        </span>
        <span className="flex items-center gap-1">
          <Circle className="h-2 w-2 fill-current" /> 0 issues
        </span>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleTerminal}
          className="flex items-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label={terminalOpen ? "Hide terminal" : "Show terminal"}
        >
          <TerminalIcon className="h-3 w-3" /> {terminalOpen ? "hide" : "terminal"}
        </button>
        <span>Ln 1, Col 1</span>
        <span className="hidden sm:inline">UTF-8</span>
        <span className="hidden sm:inline uppercase">{meta.language}</span>
      </div>
    </footer>
  );
}
