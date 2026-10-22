"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

type Theme = "light" | "dark";

const ThemeContext = createContext<{ theme: Theme; setTheme: (t: Theme) => void }>({
  theme: "light",
  setTheme: () => {},
});

/**
 * System-first theme (global-ui-reformat):
 * - The blocking inline script in app/layout.tsx sets [data-theme] before
 *   first paint (stored choice, else system preference) — no FOUC.
 * - This provider syncs React state from that attribute, persists manual
 *   choices to localStorage, and follows live system changes only while the
 *   visitor has never made a manual choice.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeRaw] = useState<Theme>("light");

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    if (current === "dark" || current === "light") setThemeRaw(current);

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onSystemChange = (event: MediaQueryListEvent) => {
      try {
        if (localStorage.getItem("theme")) return; // manual choice wins forever
      } catch {
        /* storage unavailable — still follow the system */
      }
      const next: Theme = event.matches ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", next);
      setThemeRaw(next);
    };
    media.addEventListener("change", onSystemChange);
    return () => media.removeEventListener("change", onSystemChange);
  }, []);

  const setTheme = (next: Theme) => {
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* private mode etc. — theme still applies for this visit */
    }
    setThemeRaw(next);
  };

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
