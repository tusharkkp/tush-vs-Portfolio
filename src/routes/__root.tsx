import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LoadingScreen } from "@/components/LoadingScreen";

import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 font-mono">
      <div className="max-w-md text-center">
        <p className="text-syntax-comment text-sm">// 404</p>
        <h1 className="mt-2 text-4xl font-bold text-foreground">File not found</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          This route isn't part of the workspace.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90"
          >
            Return to workspace
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">Something crashed</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Try again or head back to the workspace.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            Workspace
          </a>
        </div>
      </div>
    </div>
  );
}

const TITLE = "Tushar Kaldate — AI & Software Engineer";
const DESCRIPTION =
  "Portfolio of Tushar Kaldate, a Computer Engineering student building production-grade AI products. Projects, experience, skills, and an interactive workspace.";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "author", content: "Tushar Kaldate" },
      { name: "theme-color", content: "#0f1720" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Tushar Kaldate" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { title: "Tushar's Portfolio" },
      { property: "og:title", content: "Tushar's Portfolio" },
      { name: "twitter:title", content: "Tushar's Portfolio" },
      {
        name: "description",
        content:
          "Tushar's Dev Studio is an interactive portfolio showcasing AI product development expertise.",
      },
      {
        property: "og:description",
        content:
          "Tushar's Dev Studio is an interactive portfolio showcasing AI product development expertise.",
      },
      {
        name: "twitter:description",
        content:
          "Tushar's Dev Studio is an interactive portfolio showcasing AI product development expertise.",
      },
      {
        property: "og:image",
        content:
          "https://storage.googleapis.com/gpt-engineer-file-uploads/cq5cRCMG5th1Ye79LJE6qOLaJ4r1/social-images/social-1783579394406-tushar.webp",
      },
      {
        name: "twitter:image",
        content:
          "https://storage.googleapis.com/gpt-engineer-file-uploads/cq5cRCMG5th1Ye79LJE6qOLaJ4r1/social-images/social-1783579394406-tushar.webp",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Tushar Kaldate",
          jobTitle: "AI & Software Engineer",
          url: "/",
          sameAs: [
            "https://github.com/tusharkkp/",
            "https://www.linkedin.com/in/tushar-kaldate-2b5276262/",
            "https://www.codechef.com/users/fine_droplet",
          ],
          alumniOf: "MIT Academy of Engineering, Pune",
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* <LoadingScreen /> */}
      <Outlet />
    </QueryClientProvider>
  );
}
