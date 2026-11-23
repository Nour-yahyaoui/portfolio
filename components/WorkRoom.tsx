import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/projects";
import { projectDetails } from "@/lib/projectDetails";
import { skillGroups } from "@/lib/skills";
import { RoomFrame, roomStyles as styles } from "@/components/RoomShell";

export function WorkRoom() {
  return (
    <RoomFrame>
      <div className={styles.roomMain}>
        <Link className={styles.roomBack} href="/"><ArrowLeft size={13} aria-hidden="true" /> All rooms</Link>
        <header className={styles.roomHero}>
          <p className={styles.roomIndex}>01 / 05 · The workshop</p>
          <h1>Work, in progress.<br /><em>Work, shipped.</em></h1>
          <p>
            A compact index of the things I’ve built. Open any project for the full story: its goal, how it works, the decisions behind it, and the skills used.
          </p>
        </header>

        <div className={styles.roomSubheading}>
          <h2>The project wall</h2>
          <p>{projects.length} CASE FILES · OPEN ONE TO GO DEEPER</p>
        </div>
        <div className={styles.projectGrid}>
          {projects.map((project, index) => {
            const detail = projectDetails.find((entry) => entry.slug === project.slug);
            return (
              <Link className={styles.projectCard} href={`/work/${project.slug}`} key={project.slug}>
                <div className={styles.projectMeta}>
                  <span>{String(index + 1).padStart(2, "0")} / {project.mainTag}</span>
                  <span>{project.status ?? "PROJECT"}</span>
                </div>
                <h3>{project.title}</h3>
                <p>{detail?.tagline ?? project.description}</p>
                <ul className={styles.projectTags} aria-label={`${project.title} skills`}>
                  {project.tags.slice(0, 3).map((tag) => <li key={tag}>{tag}</li>)}
                  {project.tags.length > 3 ? <li>+{project.tags.length - 3}</li> : null}
                </ul>
                <div className={styles.projectCardFoot}>
                  <span>OPEN CASE FILE</span><ArrowUpRight size={15} aria-hidden="true" />
                </div>
              </Link>
            );
          })}
        </div>

        <div className={styles.roomSubheading}>
          <h2>Skills across the workshop</h2>
          <p>A SHORT INDEX, NOT A WALL OF BADGES</p>
        </div>
        <div className={styles.skillOverview}>
          {skillGroups.map((group) => <span className={styles.skillPill} key={group.name}>{group.name}</span>)}
        </div>
      </div>
    </RoomFrame>
  );
}

export function WorkCaseStudy({ slug }: { slug: string }) {
  const projectIndex = projects.findIndex((entry) => entry.slug === slug);
  const project = projects[projectIndex];
  const detail = projectDetails.find((entry) => entry.slug === slug);
  if (!project || !detail) return null;

  const links = project.links ?? [
    ...(project.liveDemo ? [{ label: "Live preview", href: project.liveDemo }] : []),
    ...(project.code && !project.privateCode ? [{ label: "Source code", href: project.code }] : []),
  ];
  const previous = projectIndex > 0 ? projects[projectIndex - 1] : null;
  const next = projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;

  return (
    <RoomFrame>
      <div className={styles.roomMain}>
        <Link className={styles.roomBack} href="/work"><ArrowLeft size={13} aria-hidden="true" /> Back to the project wall</Link>
        <header className={styles.caseHeader}>
          <p className={styles.roomIndex}>CASE FILE {String(projectIndex + 1).padStart(2, "0")} / {project.mainTag}</p>
          <h1>{project.title}</h1>
          <p className={styles.caseTagline}>{detail.tagline}</p>
          <div className={styles.caseLinks}>
            {links.map((link) => (
              <a href={link.href} target="_blank" rel="noreferrer" key={`${link.label}-${link.href}`}>
                {link.label} <ArrowUpRight size={13} aria-hidden="true" />
              </a>
            ))}
          </div>
        </header>

        <div className={styles.caseGrid}>
          <aside className={styles.goalCard}>
            <p className={styles.sectionLabel}>THE GOAL</p>
            <p>{detail.goal ?? detail.tagline}</p>
            <dl className={styles.specList}>
              <div className={styles.specItem}><dt className={styles.specLabel}>FIELD</dt><dd className={styles.specValue}>{project.mainTag}</dd></div>
              {project.status ? <div className={styles.specItem}><dt className={styles.specLabel}>STATUS</dt><dd className={styles.specValue}>{project.status}</dd></div> : null}
              {project.version ? <div className={styles.specItem}><dt className={styles.specLabel}>VERSION</dt><dd className={styles.specValue}>{project.version}</dd></div> : null}
            </dl>
          </aside>

          <section className={styles.caseOverview} aria-labelledby="project-description">
            <p className={styles.sectionLabel}>THE PROJECT</p>
            <h2 id="project-description">What it is</h2>
            {detail.overview.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            {project.highlights?.length ? (
              <ul className={styles.foldBody}>
                {project.highlights.map((highlight) => <li key={highlight}><span>{highlight}</span></li>)}
              </ul>
            ) : null}
          </section>
        </div>

        <section className={styles.caseDetails} aria-labelledby="case-details-title">
          <h2 id="case-details-title">Open the details you want</h2>
          <details className={styles.detailFold}>
            <summary>How it works <span>({detail.howItWorks.length} parts)</span></summary>
            <div className={styles.foldBody}>
              <ul>{detail.howItWorks.map((step) => <li key={step.title}><strong>{step.title}</strong><span>{step.body}</span></li>)}</ul>
            </div>
          </details>
          <details className={styles.detailFold}>
            <summary>Decisions I made <span>({detail.engineering.length} notes)</span></summary>
            <div className={styles.foldBody}>
              <ul>{detail.engineering.map((decision, index) => <li key={`${slug}-decision-${index}`}><strong>Decision {String(index + 1).padStart(2, "0")}</strong><span>{decision}</span></li>)}</ul>
            </div>
          </details>
          <details className={styles.detailFold}>
            <summary>Skills and tools <span>({detail.stack.reduce((count, group) => count + group.items.length, 0)} items)</span></summary>
            <div className={styles.foldBody}>
              <ul>{detail.stack.map((group) => <li key={group.group}><strong>{group.group}</strong><span>{group.items.join(" · ")}</span></li>)}</ul>
            </div>
          </details>
          <details className={styles.detailFold}>
            <summary>Facts & project notes <span>({detail.facts.length} facts)</span></summary>
            <div className={styles.foldBody}>
              <ul>{detail.facts.map((fact) => <li key={fact.label}><strong>{fact.label}</strong><span>{fact.value}</span></li>)}</ul>
              {project.loginInstructions ? <p><strong>Demo access:</strong> {project.loginInstructions}</p> : null}
              {project.note ? <p><strong>Note:</strong> {project.note}</p> : null}
            </div>
          </details>
        </section>

        <nav className={styles.caseNav} aria-label="Adjacent project case files">
          {previous ? <Link href={`/work/${previous.slug}`}><ArrowLeft size={13} aria-hidden="true" /> {previous.title}</Link> : <span />}
          {next ? <Link href={`/work/${next.slug}`}>{next.title} <ArrowRight size={13} aria-hidden="true" /></Link> : <Link href="/work">Back to all work</Link>}
        </nav>
      </div>
    </RoomFrame>
  );
}
