"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import type { HistoryPortrait } from "@/lib/showroom-content";
import { roomStyles as styles } from "@/components/RoomShell";

export function ArtGallery({ items }: { items: HistoryPortrait[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeItem = activeIndex === null ? null : items[activeIndex];

  useEffect(() => {
    if (activeIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowRight") setActiveIndex((index) => index === null ? 0 : (index + 1) % items.length);
      if (event.key === "ArrowLeft") setActiveIndex((index) => index === null ? 0 : (index - 1 + items.length) % items.length);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, items.length]);

  return (
    <>
      <div className={styles.historyGrid}>
        {items.map((item, index) => (
          <figure className={`${styles.historyCard} ${styles.artFigure}`} key={item.image}>
            <button className={styles.artImageButton} type="button" onClick={() => setActiveIndex(index)} aria-label={`Open ${item.name} in the gallery`}>
              <span className={styles.historyImageFrame}>
                <Image src={item.image} alt={item.alt} fill sizes="(max-width: 640px) 46vw, (max-width: 920px) 30vw, 24vw" className={styles.historyImage} style={{ objectPosition: item.imagePosition ?? "center" }} />
                <span className={styles.imageNo}>{String(index + 1).padStart(2, "0")}</span>
                <span className={styles.artViewHint}>VIEW DETAIL ↗</span>
              </span>
            </button>
            <figcaption className={styles.historyCaption}>
              <h3>{item.name}</h3>
              <small>{item.era}</small>
            </figcaption>
          </figure>
        ))}
      </div>

      {activeItem && activeIndex !== null ? (
        <div className={styles.lightboxOverlay} role="dialog" aria-modal="true" aria-label={`${activeItem.name}, gallery image`} onClick={() => setActiveIndex(null)}>
          <div className={styles.lightboxPanel} onClick={(event) => event.stopPropagation()}>
            <div className={styles.lightboxHeader}>
              <span>ARCHIVE IMAGE {String(activeIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</span>
              <button type="button" onClick={() => setActiveIndex(null)} aria-label="Close image detail"><X size={18} /></button>
            </div>
            <div className={styles.lightboxImage}>
              <Image src={activeItem.image} alt={activeItem.alt} fill sizes="(max-width: 800px) 94vw, 82vw" style={{ objectFit: "contain", objectPosition: activeItem.imagePosition ?? "center" }} priority />
            </div>
            <div className={styles.lightboxCaption}>
              <div><h2>{activeItem.name}</h2><p>{activeItem.era}</p></div>
              <div className={styles.lightboxControls}>
                <button type="button" onClick={() => setActiveIndex((activeIndex - 1 + items.length) % items.length)} aria-label="Previous image"><ArrowLeft size={16} /></button>
                <button type="button" onClick={() => setActiveIndex((activeIndex + 1) % items.length)} aria-label="Next image"><ArrowRight size={16} /></button>
              </div>
            </div>
            <p className={styles.lightboxTip}>Use ← → to move through the archive · Esc to close</p>
          </div>
        </div>
      ) : null}
    </>
  );
}
