import type { ReactNode } from "react";
import { BookOpen, Layers, LayoutDashboard, MousePointer2, Palette, ShieldCheck, ShoppingBag, Store } from "lucide-react";
import type { ProjectArtwork as ProjectArtworkType } from "@/lib/types";

function VexOSPreview() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#17191d] p-4 sm:p-6">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_18%_10%,rgba(249,115,22,0.25),transparent_38%),radial-gradient(ellipse_at_90%_90%,rgba(120,53,15,0.25),transparent_38%)]" />
      <div className="absolute inset-x-4 top-4 bottom-4 overflow-hidden rounded-xl border border-white/10 bg-[#111318]/95 shadow-[0_20px_70px_rgba(0,0,0,0.55)] sm:inset-x-8 sm:top-6 sm:bottom-6">
        <div className="flex h-8 items-center justify-between border-b border-white/10 bg-[#1d2026] px-3 sm:h-9 sm:px-4">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-1.5 w-1.5 rounded-full bg-[#f97316]" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
          </div>
          <span className="font-mono text-[8px] tracking-[0.2em] text-white/45 sm:text-[9px]">
            VEXOS DEVSTUDIO
          </span>
          <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-1.5 py-0.5 text-[7px] text-emerald-300 sm:text-[8px]">
            LIVE
          </span>
        </div>
        <div className="grid h-[calc(100%-2rem)] grid-cols-[25%_1fr] sm:h-[calc(100%-2.25rem)] sm:grid-cols-[20%_1fr]">
          <div className="border-r border-white/8 bg-[#15171c] p-2 sm:p-3">
            <div className="mb-3 flex items-center gap-1.5 text-[8px] font-semibold text-white/70 sm:text-[9px]">
              <span className="grid h-4 w-4 place-items-center rounded bg-orange-500 text-[8px] font-bold text-[#17130f]">V</span>
              WORKSPACE
            </div>
            <div className="space-y-2 font-mono text-[7px] text-white/40 sm:text-[8px]">
              <div className="rounded bg-orange-400/10 px-1.5 py-1 text-orange-200">⌄ project</div>
              <div className="pl-2">◇ main.py</div>
              <div className="pl-2">◇ index.html</div>
              <div className="pl-2">◇ README.md</div>
              <div className="mt-4 border-t border-white/8 pt-2 text-white/30">TOOLS</div>
              <div>▸ Terminal</div>
              <div>▸ Preview</div>
            </div>
          </div>
          <div className="flex min-w-0 flex-col bg-[#101217]">
            <div className="flex h-7 items-center justify-between border-b border-white/8 px-2 sm:px-3">
              <span className="font-mono text-[8px] text-white/55 sm:text-[9px]">main.py</span>
              <span className="rounded bg-orange-500 px-2 py-1 text-[7px] font-semibold text-[#1a120d] sm:text-[8px]">▶ Run</span>
            </div>
            <div className="flex min-h-0 flex-1">
              <div className="min-w-0 flex-1 space-y-2 p-2.5 sm:space-y-2.5 sm:p-4">
                <div className="flex gap-2 font-mono text-[8px] sm:text-[9px]"><span className="text-white/20">01</span><span><i className="text-purple-300">from</i> flask <i className="text-purple-300">import</i> Flask</span></div>
                <div className="flex gap-2 font-mono text-[8px] sm:text-[9px]"><span className="text-white/20">02</span><span className="text-white/30"> </span></div>
                <div className="flex gap-2 font-mono text-[8px] sm:text-[9px]"><span className="text-white/20">03</span><span>app <span className="text-white/40">=</span> Flask<span className="text-white/60">(__name__)</span></span></div>
                <div className="flex gap-2 font-mono text-[8px] sm:text-[9px]"><span className="text-white/20">04</span><span><i className="text-purple-300">@app</i><span className="text-white/60">.route</span><span className="text-orange-200">(&quot;/&quot;)</span></span></div>
                <div className="flex gap-2 font-mono text-[8px] sm:text-[9px]"><span className="text-white/20">05</span><span><i className="text-purple-300">def</i> <span className="text-sky-300">home</span><span className="text-white/60">():</span></span></div>
                <div className="flex gap-2 font-mono text-[8px] sm:text-[9px]"><span className="text-white/20">06</span><span className="pl-2"><i className="text-purple-300">return</i> <span className="text-emerald-200">&quot;Hello, VexOS!&quot;</span></span></div>
                <div className="mt-3 h-px w-full bg-white/8" />
                <div className="flex items-center gap-1.5 text-[7px] text-emerald-300/80 sm:text-[8px]"><span className="h-1 w-1 rounded-full bg-emerald-300" /> Preview running on localhost</div>
              </div>
              <div className="hidden w-[32%] border-l border-white/8 bg-[#14161b] p-3 sm:block">
                <div className="mb-2 text-[8px] font-semibold text-white/60">DEV ASSISTANT</div>
                <div className="rounded-lg border border-orange-400/15 bg-orange-400/5 p-2 text-[8px] leading-relaxed text-white/55">
                  Ready when you are. Add your Groq key to start chatting.
                </div>
                <div className="mt-2 rounded-md border border-white/10 px-2 py-1.5 text-[7px] text-white/25">Ask about your code…</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-3 left-4 rounded-full border border-white/10 bg-black/40 px-2.5 py-1 font-mono text-[7px] tracking-[0.14em] text-orange-100/80 backdrop-blur sm:bottom-4 sm:left-8 sm:text-[8px]">
        LINUX DISTRO · DEBIAN TRIXIE
      </div>
    </div>
  );
}

function NourCodePreview() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#111621] p-4 sm:p-6">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_10%,rgba(59,130,246,0.26),transparent_40%),radial-gradient(ellipse_at_10%_100%,rgba(14,165,233,0.15),transparent_40%)]" />
      <div className="absolute inset-x-4 top-4 bottom-4 overflow-hidden rounded-xl border border-white/10 bg-[#0b0e14]/95 shadow-[0_20px_70px_rgba(0,0,0,0.55)] sm:inset-x-8 sm:top-6 sm:bottom-6">
        <div className="flex h-8 items-center justify-between border-b border-white/10 bg-[#151a23] px-3 sm:h-9 sm:px-4">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-1.5 w-1.5 rounded-full bg-[#f87171]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#fbbf24]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#34d399]" />
          </div>
          <span className="font-mono text-[8px] tracking-[0.18em] text-white/45 sm:text-[9px]">NOUR-CODE · LOCAL AGENT</span>
          <span className="flex items-center gap-1 font-mono text-[7px] text-emerald-300 sm:text-[8px]"><span className="h-1 w-1 rounded-full bg-emerald-300" /> LOCAL</span>
        </div>
        <div className="grid h-[calc(100%-2rem)] grid-cols-[1fr_34%] sm:h-[calc(100%-2.25rem)] sm:grid-cols-[1fr_30%]">
          <div className="flex min-w-0 flex-col">
            <div className="flex h-7 items-center gap-2 border-b border-white/8 px-3 font-mono text-[8px] text-white/40 sm:text-[9px]">
              <span className="text-sky-300">~/workspace</span><span>/</span><span>agent_session</span>
            </div>
            <div className="flex-1 space-y-2.5 overflow-hidden p-3 sm:space-y-3 sm:p-4">
              <div className="flex gap-2 text-[8px] leading-relaxed sm:text-[9px]">
                <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded bg-sky-400/15 font-mono text-[8px] text-sky-300">N</span>
                <span className="text-white/75">Review the auth flow and flag anything risky.</span>
              </div>
              <div className="ml-6 rounded-lg border border-white/8 bg-white/[0.035] p-2.5 sm:p-3">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-mono text-[7px] text-sky-300 sm:text-[8px]">QWEN3 8B · OLLAMA</span>
                  <span className="font-mono text-[7px] text-white/25">TOOL CALLS: 03</span>
                </div>
                <div className="space-y-1.5 font-mono text-[7px] sm:text-[8px]">
                  <div className="flex items-center gap-2 text-white/55"><span className="text-emerald-300">✓</span> search_files <span className="text-white/25">auth/</span></div>
                  <div className="flex items-center gap-2 text-white/55"><span className="text-emerald-300">✓</span> read_file <span className="text-white/25">jwt.py</span></div>
                  <div className="flex items-center gap-2 text-white/55"><span className="text-emerald-300">✓</span> security_skill <span className="text-white/25">scan()</span></div>
                </div>
                <div className="mt-2.5 border-t border-white/8 pt-2 text-[7px] leading-relaxed text-white/55 sm:text-[8px]">
                  Token expiry is not validated. I can prepare a patch for review before applying it.
                </div>
              </div>
              <div className="ml-6 flex items-center gap-2 font-mono text-[7px] text-white/25 sm:text-[8px]">
                <span className="h-1 w-1 rounded-full bg-sky-300" /> Streaming response · session saved
              </div>
            </div>
            <div className="m-2.5 flex items-center justify-between rounded-md border border-white/10 bg-white/[0.025] px-2.5 py-2 sm:m-3 sm:px-3">
              <span className="text-[7px] text-white/30 sm:text-[8px]">Message your local coding agent…</span>
              <span className="rounded bg-sky-400/15 px-2 py-1 text-[7px] text-sky-200 sm:text-[8px]">Send ↗</span>
            </div>
          </div>
          <div className="border-l border-white/8 bg-[#11151d] p-2.5 sm:p-3">
            <div className="mb-2 flex items-center justify-between text-[7px] font-semibold text-white/55 sm:text-[8px]"><span>GUARDRAILS</span><span className="text-emerald-300">ACTIVE</span></div>
            <div className="space-y-2 text-[7px] text-white/40 sm:text-[8px]">
              <div className="rounded-md border border-emerald-400/10 bg-emerald-400/[0.04] p-2"><span className="mb-1 block text-emerald-300/80">PATHS</span>permissions.yaml</div>
              <div className="rounded-md border border-sky-400/10 bg-sky-400/[0.04] p-2"><span className="mb-1 block text-sky-300/80">SHELL</span>allow / deny list</div>
              <div className="rounded-md border border-white/8 bg-white/[0.025] p-2"><span className="mb-1 block text-white/60">AUDIT</span>JSONL · every call</div>
            </div>
            <div className="mt-3 border-t border-white/8 pt-2 font-mono text-[7px] text-white/25">265 TESTS <span className="text-emerald-300">PASS</span></div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-3 left-4 rounded-full border border-white/10 bg-black/40 px-2.5 py-1 font-mono text-[7px] tracking-[0.14em] text-sky-100/80 backdrop-blur sm:bottom-4 sm:left-8 sm:text-[8px]">
        LOCAL INFERENCE · GUARDED TOOL ACCESS
      </div>
    </div>
  );
}

type GenericArtwork = Exclude<ProjectArtworkType, "vexos" | "nour-code">;

const genericPreviews: Record<
  GenericArtwork,
  { label: string; headline: string; icon: ReactNode; accent: string; glow: string; panel: string; bar: string }
> = {
  learning: {
    label: "LEARNING PLATFORM",
    headline: "Learn together.",
    icon: <BookOpen size={17} />,
    accent: "text-violet-200 border-violet-300/20 bg-violet-300/10",
    glow: "bg-[radial-gradient(ellipse_at_82%_20%,rgba(167,139,250,0.22),transparent_48%)]",
    panel: "border-violet-200/10",
    bar: "bg-violet-300",
  },
  commerce: {
    label: "RETAIL OPERATIONS",
    headline: "A clearer view of every shop.",
    icon: <ShoppingBag size={17} />,
    accent: "text-emerald-200 border-emerald-300/20 bg-emerald-300/10",
    glow: "bg-[radial-gradient(ellipse_at_82%_20%,rgba(52,211,153,0.19),transparent_48%)]",
    panel: "border-emerald-200/10",
    bar: "bg-emerald-300",
  },
  storefront: {
    label: "ONLINE STOREFRONT",
    headline: "From browse to checkout.",
    icon: <Store size={17} />,
    accent: "text-amber-100 border-amber-300/20 bg-amber-300/10",
    glow: "bg-[radial-gradient(ellipse_at_82%_20%,rgba(251,191,36,0.19),transparent_48%)]",
    panel: "border-amber-200/10",
    bar: "bg-amber-300",
  },
  components: {
    label: "COMPONENT SYSTEM",
    headline: "Small pieces. Better UIs.",
    icon: <Layers size={17} />,
    accent: "text-sky-200 border-sky-300/20 bg-sky-300/10",
    glow: "bg-[radial-gradient(ellipse_at_82%_20%,rgba(56,189,248,0.2),transparent_48%)]",
    panel: "border-sky-200/10",
    bar: "bg-sky-300",
  },
  security: {
    label: "DEVELOPER SECURITY",
    headline: "Catch it before it ships.",
    icon: <ShieldCheck size={17} />,
    accent: "text-emerald-200 border-emerald-300/20 bg-emerald-300/10",
    glow: "bg-[radial-gradient(ellipse_at_82%_20%,rgba(16,185,129,0.2),transparent_48%)]",
    panel: "border-emerald-200/10",
    bar: "bg-emerald-300",
  },
  dashboard: {
    label: "DEVELOPER WORKSPACE",
    headline: "A home for useful tools.",
    icon: <LayoutDashboard size={17} />,
    accent: "text-indigo-200 border-indigo-300/20 bg-indigo-300/10",
    glow: "bg-[radial-gradient(ellipse_at_82%_20%,rgba(129,140,248,0.2),transparent_48%)]",
    panel: "border-indigo-200/10",
    bar: "bg-indigo-300",
  },
  buttons: {
    label: "UI COMPONENTS",
    headline: "Good buttons, ready to use.",
    icon: <MousePointer2 size={17} />,
    accent: "text-cyan-200 border-cyan-300/20 bg-cyan-300/10",
    glow: "bg-[radial-gradient(ellipse_at_82%_20%,rgba(34,211,238,0.2),transparent_48%)]",
    panel: "border-cyan-200/10",
    bar: "bg-cyan-300",
  },
  studio: {
    label: "CREATIVE PORTFOLIO",
    headline: "Make the work the focus.",
    icon: <Palette size={17} />,
    accent: "text-rose-200 border-rose-300/20 bg-rose-300/10",
    glow: "bg-[radial-gradient(ellipse_at_82%_20%,rgba(251,113,133,0.2),transparent_48%)]",
    panel: "border-rose-200/10",
    bar: "bg-rose-300",
  },
};

function GenericProjectPreview({
  artwork,
  title,
  mainTag,
  tags,
}: {
  artwork: GenericArtwork;
  title: string;
  mainTag: string;
  tags: string[];
}) {
  const preview = genericPreviews[artwork];

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#141821]">
      <div className={`absolute inset-0 ${preview.glow}`} />
      <div className="hero-grid absolute inset-0 opacity-30" />
      <div className="absolute inset-y-0 left-0 w-[48%] bg-gradient-to-r from-[#141821] via-[#141821]/90 to-transparent" />
      <div className="absolute left-5 top-1/2 z-10 w-[46%] -translate-y-1/2 sm:left-8">
        <p className="font-mono text-[7px] tracking-[0.2em] text-white/35 sm:text-[8px]">{preview.label}</p>
        <h4 className="mt-3 max-w-56 text-base font-semibold leading-tight tracking-[-0.04em] text-white sm:mt-4 sm:text-2xl">
          {preview.headline}
        </h4>
        <p className="mt-2 line-clamp-1 text-[8px] text-white/40 sm:mt-3 sm:text-[10px]">{title}</p>
        <div className={`mt-4 inline-flex items-center gap-1.5 rounded-full border px-2 py-1 text-[7px] font-medium sm:mt-5 sm:px-2.5 sm:text-[8px] ${preview.accent}`}>
          {preview.icon}
          {mainTag}
        </div>
      </div>
      <div className="absolute bottom-[12%] right-[6%] top-[12%] w-[43%] overflow-hidden rounded-xl border border-white/10 bg-[#0b0e13]/90 shadow-[0_18px_55px_rgba(0,0,0,0.48)] backdrop-blur-sm sm:right-[7%] sm:w-[42%]">
        <div className="flex h-7 items-center justify-between border-b border-white/[0.08] px-2.5 sm:h-8 sm:px-3">
          <div className="flex items-center gap-1" aria-hidden="true"><span className="h-1 w-1 rounded-full bg-white/25" /><span className="h-1 w-1 rounded-full bg-white/15" /><span className="h-1 w-1 rounded-full bg-white/15" /></div>
          <span className="font-mono text-[6px] tracking-[0.12em] text-white/35 sm:text-[7px]">NOUR / WORK</span>
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-300/70" />
        </div>
        <div className="p-2.5 sm:p-3.5">
          <div className="flex items-center gap-2">
            <div className={`grid h-7 w-7 place-items-center rounded-lg border sm:h-8 sm:w-8 ${preview.accent}`}>{preview.icon}</div>
            <div className="min-w-0">
              <p className="truncate text-[7px] font-medium text-white/85 sm:text-[8px]">{title}</p>
              <p className="mt-0.5 text-[6px] text-white/35 sm:text-[7px]">{mainTag} · ready</p>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-1.5 sm:mt-4 sm:gap-2">
            <div className={`rounded-md border bg-white/[0.025] p-1.5 sm:p-2 ${preview.panel}`}>
              <div className="h-1 w-7 rounded-full bg-white/15 sm:w-9" />
              <div className="mt-2 h-2 w-10 rounded-sm bg-white/10 sm:w-12" />
            </div>
            <div className="rounded-md border border-white/[0.07] bg-white/[0.025] p-1.5 sm:p-2">
              <div className="h-1 w-6 rounded-full bg-white/15 sm:w-8" />
              <div className="mt-2 h-2 w-8 rounded-sm bg-white/10 sm:w-10" />
            </div>
          </div>
          <div className="mt-2.5 rounded-md border border-white/[0.07] bg-white/[0.025] p-2 sm:mt-3 sm:p-2.5">
            <div className="flex items-center justify-between text-[6px] text-white/35 sm:text-[7px]"><span>OVERVIEW</span><span>•••</span></div>
            <div className="mt-2 flex h-7 items-end gap-1 sm:h-9 sm:gap-1.5">
              {[38, 72, 49, 85, 58, 92, 66, 76, 48].map((height, index) => (
                <span key={index} className={`flex-1 rounded-t-[2px] ${preview.bar}`} style={{ height: `${height}%`, opacity: 0.3 + index * 0.055 }} />
              ))}
            </div>
          </div>
          <div className="mt-2.5 space-y-1.5 sm:mt-3">
            {tags.slice(0, 2).map((tag, index) => (
              <div key={tag} className="flex items-center gap-1.5 text-[6px] text-white/40 sm:text-[7px]">
                <span className={`h-1 w-1 rounded-full ${index === 0 ? "bg-emerald-300/65" : "bg-white/25"}`} />
                <span className="truncate">{tag}</span>
                <span className="ml-auto text-white/20">{index === 0 ? "ready" : "+"}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute bottom-3 left-5 font-mono text-[7px] tracking-[0.17em] text-white/25 sm:bottom-4 sm:left-8 sm:text-[8px]">SELECTED PROJECT · 2026</div>
    </div>
  );
}

export default function ProjectArtwork({
  artwork,
  title,
  mainTag,
  tags,
}: {
  artwork: ProjectArtworkType;
  title: string;
  mainTag: string;
  tags: string[];
}) {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      {artwork === "vexos" ? (
        <VexOSPreview />
      ) : artwork === "nour-code" ? (
        <NourCodePreview />
      ) : (
        <GenericProjectPreview artwork={artwork} title={title} mainTag={mainTag} tags={tags} />
      )}
    </div>
  );
}

