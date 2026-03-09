"use client";

import { useEffect } from "react";

const ACCENT_VARS = [
  "--neon-accent",
  // Theme source variables
  "--primary",
  "--ring",
  "--chart-1",
  "--sidebar-primary",
  "--sidebar-ring",
  // Tailwind v4 compiled color variables (used by utility classes)
  "--color-primary",
  "--color-ring",
  "--color-chart-1",
  "--color-sidebar-primary",
  "--color-sidebar-ring",
];

export function applyAccentColor(color: string) {
  const el = document.documentElement;
  for (const v of ACCENT_VARS) {
    el.style.setProperty(v, color);
  }
}

export function removeAccentColor() {
  const el = document.documentElement;
  for (const v of ACCENT_VARS) {
    el.style.removeProperty(v);
  }
}

export function AccentColorInitializer() {
  useEffect(() => {
    try {
      const saved = localStorage.getItem("graph-style");
      if (saved) {
        const s = JSON.parse(saved);
        if (s.nodeColor) {
          applyAccentColor(s.nodeColor);
        }
      }
    } catch { /* ignore */ }
  }, []);

  return null;
}
