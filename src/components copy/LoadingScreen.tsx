import { useEffect, useState } from "react";

const loadingSteps = [
  {
    threshold: 0,
    message: "$ booting tushVS development environment...",
  },
  {
    threshold: 20,
    message: "$ loading workspace...",
  },
  {
    threshold: 42,
    message: "$ loading projects...",
  },
  {
    threshold: 64,
    message: "$ loading skills & experience...",
  },
  {
    threshold: 82,
    message: "$ compiling portfolio...",
  },
  {
    threshold: 96,
    message: "$ portfolio.ready()",
  },
];

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const duration = 2800;
    const startTime = performance.now();

    let animationFrame: number;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const rawProgress = Math.min(elapsed / duration, 1);

      // Smooth ease-out progression
      const easedProgress = 1 - Math.pow(1 - rawProgress, 2.5);

      const nextProgress = Math.min(Math.round(easedProgress * 100), 100);

      setProgress(nextProgress);

      if (rawProgress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        // Give the user a moment to see 100%
        window.setTimeout(() => {
          setIsExiting(true);

          window.setTimeout(() => {
            setProgress(100);
          }, 500);
        }, 250);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  const currentStep =
    [...loadingSteps].reverse().find((step) => progress >= step.threshold) ?? loadingSteps[0];

  return (
    <div
      className={`loading-screen ${isExiting ? "loading-screen-exit" : ""}`}
      aria-label="Loading portfolio"
      role="status"
    >
      {/* Ambient background */}
      <div className="loading-grid" />
      <div className="loading-glow loading-glow-one" />
      <div className="loading-glow loading-glow-two" />

      {/* Scanline */}
      <div className="loading-scanline" />

      <main className="loading-content">
        {/* Brand */}
        <div className="loading-brand">
          <div className="loading-logo-container">
            <div className="loading-logo-ring loading-logo-ring-one" />
            <div className="loading-logo-ring loading-logo-ring-two" />

            <div className="loading-logo-glow" />

            <img src="/tushvs-logo.png" alt="tushVS" className="loading-logo" />
          </div>

          <div className="loading-brand-name">
            <span>tush</span>
            <span className="loading-brand-accent">VS</span>
          </div>

          <div className="loading-subtitle">DEVELOPMENT ENVIRONMENT</div>
        </div>

        {/* Terminal */}
        <section className="loading-terminal">
          <div className="loading-terminal-header">
            <div className="loading-terminal-dots">
              <span />
              <span />
              <span />
            </div>

            <span className="loading-terminal-title">tushVS — portfolio</span>

            <span className="loading-terminal-status">SYSTEM</span>
          </div>

          <div className="loading-terminal-body">
            <div className="loading-terminal-line">
              <span className="loading-terminal-prompt">$</span>

              <span>boot --portfolio</span>
            </div>

            <div className="loading-terminal-line loading-terminal-muted">
              <span className="loading-terminal-prompt">$</span>

              <span>{currentStep.message.replace("$ ", "")}</span>
            </div>

            <div className="loading-terminal-line loading-terminal-ready">
              <span className="loading-terminal-check">✓</span>

              <span>{progress >= 100 ? "system ready" : "system initializing"}</span>
            </div>
          </div>
        </section>

        {/* Progress */}
        <section className="loading-progress-section">
          <div className="loading-progress-header">
            <span className="loading-progress-label">
              {progress >= 100 ? "READY" : "INITIALIZING"}
            </span>

            <span className="loading-progress-number">{progress}%</span>
          </div>

          <div className="loading-progress-track">
            <div
              className="loading-progress-fill"
              style={{
                width: `${progress}%`,
              }}
            />

            <div
              className="loading-progress-glow"
              style={{
                left: `${progress}%`,
              }}
            />
          </div>

          <div className="loading-progress-meta">
            <span>tushVS core</span>

            <span>{progress >= 100 ? "ONLINE" : "LOADING"}</span>
          </div>
        </section>

        {/* Bottom status */}
        <div className="loading-footer">
          <div className="loading-status-indicator">
            <span className="loading-status-dot" />

            <span>{progress >= 100 ? "Portfolio ready" : "Preparing workspace"}</span>
          </div>

          <div className="loading-version">v1.0.0</div>
        </div>
      </main>
    </div>
  );
}
