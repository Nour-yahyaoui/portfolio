"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

/** Accessible theme toggle — a real <button>, named for screen readers. */
export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const next = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      aria-label={`Switch to ${next} theme`}
      aria-pressed={theme === "dark"}
      title={`Switch to ${next} theme`}
      onClick={() => setTheme(next)}
      className="grid h-11 w-11 place-items-center rounded-[2px] border border-line bg-transparent text-mute transition-colors hover:border-linestrong hover:text-ink"
    >
      {theme === "dark" ? <Sun size={17} aria-hidden="true" /> : <Moon size={17} aria-hidden="true" />}
    </button>
  );
}
