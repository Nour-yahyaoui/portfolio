import Image from "next/image";
import type { Project } from "@/lib/types";

export default function ProjectScreenshot({ project, compact = false }: { project: Project; compact?: boolean }) {
  const screenshot = project.screenshot;
  if (!screenshot) return null;
  return (
    <figure className={compact ? "my-5 min-w-0" : "mt-8 min-w-0"}>
      <a href={screenshot.src} target="_blank" rel="noopener noreferrer" className="group block overflow-hidden rounded-sm border border-line bg-subtle" aria-label={`Open full-size screenshot: ${project.title} (new tab)`}>
        <Image src={screenshot.src} alt={screenshot.alt} width={screenshot.width} height={screenshot.height}
          sizes={compact ? "(max-width: 1023px) 100vw, 540px" : "(max-width: 1152px) 100vw, 1100px"}
          className="h-auto w-full transition-transform duration-500 motion-safe:group-hover:scale-[1.015]" />
      </a>
      <figcaption className="mt-2 flex flex-wrap justify-between gap-2 font-mono text-[10px] leading-5 tracking-wide text-mute">
        <span>{screenshot.caption}</span><span>Open image ↗</span>
      </figcaption>
    </figure>
  );
}
