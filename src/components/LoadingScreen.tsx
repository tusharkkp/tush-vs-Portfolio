import { useEffect, useState } from "react";
import DotGrid from "./DotGrid";
import "./LoadingScreen.css";
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

      /*
       * Smooth ease-out progression.
       *
       * Starts quickly and slows down near 100%.
       */
      const easedProgress = 1 - Math.pow(1 - rawProgress, 2.5);

      const nextProgress = Math.min(Math.round(easedProgress * 100), 100);

      setProgress(nextProgress);

      if (rawProgress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        /*
         * Keep 100% visible for a moment
         * before starting the fade-out.
         */
        window.setTimeout(() => {
          setIsExiting(true);
        }, 400);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  /*
   * Determine which terminal message
   * should currently be displayed.
   */
  const currentStep =
    [...loadingSteps].reverse().find((step) => progress >= step.threshold) ?? loadingSteps[0];

  return (
    <div
      className={`loading-screen ${isExiting ? "loading-screen-exit" : ""}`}
      aria-label="Loading tushVS portfolio"
      role="status"
    >
      {/* =====================================================
          REACT BITS DOT GRID
          ===================================================== */}

      <div className="loading-dot-grid">
        <DotGrid
          dotSize={2}
          gap={28}
          baseColor="#111827"
          activeColor="#38bdf8"
          proximity={100}
          speedTrigger={100}
          shockRadius={250}
          shockStrength={5}
          maxSpeed={5000}
          resistance={750}
          returnDuration={1.5}
        />
      </div>

      {/* =====================================================
          AMBIENT BACKGROUND GLOWS
          ===================================================== */}

      <div
        className="
          loading-glow
          loading-glow-one
        "
      />

      <div
        className="
          loading-glow
          loading-glow-two
        "
      />

      {/* =====================================================
          SCANLINE
          ===================================================== */}

      <div className="loading-scanline" />

      {/* =====================================================
          MAIN CONTENT
          ===================================================== */}

      <main className="loading-content">
        {/* ===================================================
            tushVS BRAND
            =================================================== */}

        <div className="loading-brand">
          {/* Logo container */}

          <div className="loading-logo-container">
            {/* Outer rotating ring */}

            <div
              className="
                loading-logo-ring
                loading-logo-ring-one
              "
            />

            {/* Inner rotating ring */}

            <div
              className="
                loading-logo-ring
                loading-logo-ring-two
              "
            />

            {/* Logo glow */}

            <div className="loading-logo-glow" />

            {/* Logo */}

            <img src="/tushvs-logo.png" alt="tushVS" className="loading-logo" />
          </div>

          {/* Brand name */}

          <div className="loading-brand-name">
            <span>tush</span>

            <span className="loading-brand-accent">VS</span>
          </div>

          {/* Subtitle */}

          <div className="loading-subtitle">DEVELOPMENT ENVIRONMENT</div>
        </div>

        {/* ===================================================
            TERMINAL
            =================================================== */}

        <section className="loading-terminal">
          {/* Terminal header */}

          <div className="loading-terminal-header">
            {/* Traffic-light buttons */}

            <div className="loading-terminal-dots">
              <span />

              <span />

              <span />
            </div>

            {/* Terminal title */}

            <span className="loading-terminal-title">tushVS — portfolio</span>

            {/* System status */}

            <span className="loading-terminal-status">SYSTEM</span>
          </div>

          {/* Terminal body */}

          <div className="loading-terminal-body">
            {/* Command 1 */}

            <div className="loading-terminal-line">
              <span className="loading-terminal-prompt">$</span>

              <span>boot --portfolio</span>
            </div>

            {/* Dynamic command */}

            <div
              key={currentStep.message}
              className="
                loading-terminal-line
                loading-terminal-muted
              "
            >
              <span className="loading-terminal-prompt">$</span>

              <span>{currentStep.message.replace("$ ", "")}</span>
            </div>

            {/* System state */}

            <div
              className="
                loading-terminal-line
                loading-terminal-ready
              "
            >
              <span className="loading-terminal-check">✓</span>

              <span>{progress >= 100 ? "system ready" : "system initializing"}</span>
            </div>
          </div>
        </section>

        {/* ===================================================
            PROGRESS BAR
            =================================================== */}

        <section className="loading-progress-section">
          {/* Progress header */}

          <div className="loading-progress-header">
            <span className="loading-progress-label">
              {progress >= 100 ? "READY" : "INITIALIZING"}
            </span>

            <span className="loading-progress-number">{progress}%</span>
          </div>

          {/* Progress track */}

          <div className="loading-progress-track">
            {/* Filled section */}

            <div
              className="loading-progress-fill"
              style={{
                width: `${progress}%`,
              }}
            />

            {/* Glowing indicator */}

            <div
              className="loading-progress-glow"
              style={{
                left: `${progress}%`,
              }}
            />
          </div>

          {/* Progress metadata */}

          <div className="loading-progress-meta">
            <span>tushVS core</span>

            <span>{progress >= 100 ? "ONLINE" : "LOADING"}</span>
          </div>
        </section>

        {/* ===================================================
            FOOTER
            =================================================== */}

        <div className="loading-footer">
          {/* Status */}

          <div className="loading-status-indicator">
            <span className="loading-status-dot" />

            <span>{progress >= 100 ? "Portfolio ready" : "Preparing workspace"}</span>
          </div>

          {/* Version */}

          <div className="loading-version">v1.0.0</div>
        </div>
      </main>
    </div>
  );
}
